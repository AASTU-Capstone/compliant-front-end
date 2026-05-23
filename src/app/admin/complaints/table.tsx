"use client";
import DataTable from "@/shared/table";
import {
  Button,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconEye,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Data } from "./page";
import { UpdateComplaintStatusInputForAdmin } from "@/types";
import { useUpdateComplaintStatusForAdminMutation } from "@/lib/redux/features/admin";
import ViewComplaintById from "./viewmodal";

const getStatusStyle = (status: string) => {
  const statusLower = status?.toLowerCase() || "";
  if (statusLower === "resolved") {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (statusLower === "inprogress" || statusLower === "received") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }
  if (statusLower === "rejected") {
    return "bg-red-100 text-red-700 border-red-200";
  }
  return "bg-gray-100 text-gray-700 border-gray-200";
};

const Complaints = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchComplaints,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchComplaints: () => void;
}) => {
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [opened, { open: openReject, close: closeReject }] =
    useDisclosure(false);
  const [useUpdateComplaintStatus, { isLoading: isRejecting }] =
    useUpdateComplaintStatusForAdminMutation();
  const [viewId, setViewId] = useState("");
  const [rejectId, setRejectId] = useState("");
  const [reason, setReason] = useState("");
  const [isRejectDisabled, setIsRejectDisabled] = useState(true);

  const prepareHandleReject = (id: string) => {
    openReject();
    setRejectId(id);
  };

  const prepareViewModel = (id: string) => {
    setViewId(id);
    openViewModal();
  };

  const handleAccept = (id: string) => {
    modals.openConfirmModal({
      title: "Accept Complaint",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to Accept this complaint?</Text>
      ),
      labels: { confirm: "Accept Complaint", cancel: "Cancel" },
      confirmProps: { color: "green" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const input: UpdateComplaintStatusInputForAdmin = {
          complaintId: id,
          status: "accepted",
          feedback: null,
        };
        await useUpdateComplaintStatus(input).unwrap();
        refetchComplaints();
      },
    });
  };

  const handleReject = async () => {
    const input: UpdateComplaintStatusInputForAdmin = {
      complaintId: rejectId,
      status: "rejected",
      feedback: reason,
    };

    try {
      await useUpdateComplaintStatus(input).unwrap();
      closeReject();
      refetchComplaints();
      setReason("");
      setRejectId("");
    } catch (error) {
      console.error("Failed to reject complaint: ", error);
    }
  };

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value }) => (
          <div className="font-medium text-foreground">{value}</div>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ value }) => (
          <span className="px-3 py-1 text-xs font-medium rounded-full border bg-primary/10 text-primary border-primary/20">
            {value}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(value)}`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
        Cell: ({ value }) => (
          <span className="text-muted-foreground">
            {value
              ? new Date(value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "-"}
          </span>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => prepareViewModel(row.original.id)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
              title="View"
            >
              <IconEye size={18} />
            </button>
            <button
              onClick={() => handleAccept(row.original.id)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
              title="Accept"
            >
              <IconCircleCheck size={18} />
            </button>
            <button
              onClick={() => prepareHandleReject(row.original.id)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200"
              title="Reject"
            >
              <IconCircleX size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={closeReject}
        title="Reject Complaint"
        styles={{
          header: {
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
          },
          body: {
            backgroundColor: "var(--color-background)",
          },
          title: {
            fontWeight: 600,
          },
        }}
      >
        <Flex className="flex-col my-5 gap-7">
          <div>
            <Text size="sm" className="text-muted-foreground">
              Are you sure you want to reject this complaint? Please provide a
              reason.
            </Text>
          </div>
          <div>
            <TextInput
              label="Reason"
              placeholder="Enter reason for rejection"
              value={reason}
              onChange={(event) => {
                setReason(event.currentTarget.value);
                setIsRejectDisabled(event.currentTarget.value.trim() === "");
              }}
              classNames={{
                input:
                  "border-border focus:border-primary focus:ring-primary/20",
              }}
            />
          </div>
        </Flex>
        <Group justify="end" gap="sm">
          <Button
            variant="light"
            onClick={closeReject}
            className="bg-muted text-foreground hover:bg-muted/80"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            loading={isRejecting}
            disabled={isRejectDisabled}
            className={
              isRejectDisabled
                ? "bg-muted text-muted-foreground"
                : "bg-red-500 hover:bg-red-600 text-white"
            }
          >
            Reject Complaint
          </Button>
        </Group>
      </Modal>

      <DataTable
        columns={columns}
        data={data}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
      <ViewComplaintById
        id={viewId}
        openViewModal={openViewModal}
        closeViewModal={closeViewModal}
        isViewModalOpened={isViewModalOpened}
      />
    </>
  );
};

export default Complaints;

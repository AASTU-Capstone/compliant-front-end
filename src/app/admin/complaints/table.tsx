"use client";
import DataTable from "@/shared/table";
import ViewComplaint from "@/shared/view-complaint";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Input,
  Group,
  Menu,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconAdjustmentsHorizontal, IconChevronDown, IconEye, IconSearch, IconSquareCheck, IconSquareX } from "@tabler/icons-react";
import { use, useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import { Data } from "./page";
import { UpdateComplaintStatusInputForAdmin } from "@/types";
import { useUpdateComplaintStatusForAdminMutation,useSearchComplaintsQuery } from "@/lib/redux/features/admin";
import ViewComplaintById from "./viewmodal";

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
      // console.log("are you closing");
      // console.log("yes i did!!");
    } catch (error) {
      console.error("Failed to reject complaint: ", error);
    }
  };

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: "Complaints Title",
        accessor: "title",
        Cell: ({ value }) => (
          <div className="text-sm font-medium text-gray-900">{value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          const statusClass =
            value === "Resolved"
              ? "bg-green-200 text-green-800"
              : value === "Inprogress"
                ? "bg-blue-200 text-blue-800"
                : value === "Rejected"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800";
          return (
            <span
              className={`py-1 px-5 text-center text-xs leading-5 font-semibold rounded-full ${statusClass}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <ActionIcon
              variant="light"
              onClick={() => prepareViewModel(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconEye className="w-5 h-5" />
            </ActionIcon>

            <ActionIcon
              variant="light"
              onClick={() => handleAccept(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconSquareCheck color="green" className="w-5 h-5" />
            </ActionIcon>
            <ActionIcon
              variant="light"
              onClick={() => prepareHandleReject(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconSquareX color="red" className="w-5 h-5" />
            </ActionIcon>
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
      >
        <Flex className="flex-col my-5 gap-7">
          <div>
            <Text size="sm">
              Are you sure you want to Reject this complaint?
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
            />
          </div>
        </Flex>
        <Group justify="end">
          <Button
            onClick={handleReject}
            loading={isRejecting}
            disabled={isRejectDisabled}
            style={{
              backgroundColor: isRejectDisabled ? "white" : "red",
              color: isRejectDisabled ? "black" : "white",
              border: isRejectDisabled ? "1px solid black" : "1px solid red",
            }}
          >
            Reject Complaint
          </Button>
          <Button variant="light" onClick={closeReject}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">Complaints</Text>
        </Box>

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
      </Box>
    </>
  );
};

export default Complaints;

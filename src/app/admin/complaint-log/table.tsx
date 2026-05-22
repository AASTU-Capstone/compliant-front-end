"use client";
import DataTable from "@/shared/table";
import ViewComplaintResponse from "@/shared/view-complaint-reponse";
import { ActionIcon, Box, Button, Flex, Input, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconEye,
  IconSearch,
  IconSquareCheck,
  IconSquareX,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Data } from "./page";
import { useUpdateComplaintLogStatusForAdminMutation } from "@/lib/redux/features/admin";
import { UpdateComplaintLogStatusInputForAdmin } from "@/types";
import ViewComplaintLogById from "./viewmodal";

const ComplaintsLogBody = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchComplaintLogs,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchComplaintLogs: () => void;
}) => {
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  const [UpdateComplaintLogForAdmin] = useUpdateComplaintLogStatusForAdminMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item: Data) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  const handleAccept = (id: string) => {
    modals.openConfirmModal({
      title: "Accept Complaint",
      centered: true,
      children: <Text size="sm">Are you sure you want to Accept this complaint?</Text>,
      labels: { confirm: "Accept Complaint", cancel: "Cancel" },
      confirmProps: { color: "green" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const input: UpdateComplaintLogStatusInputForAdmin = {
          complaintLogId: id,
          status: "resolved",
        };
        await UpdateComplaintLogForAdmin(input).unwrap();
        refetchComplaintLogs();
      },
    });
  };

  const handleReject = (id: string) => {
    modals.openConfirmModal({
      title: "Reject Complaint",
      centered: true,
      children: <Text size="sm">Are you sure you want to Reject this complaint?</Text>,
      labels: { confirm: "Reject Complaint", cancel: "Cancel" },
      confirmProps: { color: "red" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const input: UpdateComplaintLogStatusInputForAdmin = {
          complaintLogId: id,
          status: "processing",
        };
        await UpdateComplaintLogForAdmin(input).unwrap();
        refetchComplaintLogs();
      },
    });
  };

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value }) => (
          <div className="text-sm font-medium text-gray-900">{value}</div>
        ),
      },
      {
        Header: "Priority",
        accessor: "priority",
        Cell: ({ value }) => {
          const statusClass =
            value === "high"
              ? "bg-red-200 text-red-800"
              : value === "medium"
              ? "bg-blue-200 text-blue-800"
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
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <ActionIcon
              variant="light"
              onClick={() => {
                setId(row.original.id);
                openViewModal();
              }}
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
              onClick={() => handleReject(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconSquareX color="red" className="w-5 h-5" />
            </ActionIcon>
          </div>
        ),
      },
    ],
    [openViewModal, handleAccept, handleReject]
  );

  return (
    <>
      
      <Box className="w-full mt-7">
        <Box>
          <Text className="text-xl px-5 py-4 bg-primary-body">
            Complaints Log
          </Text>
        </Box>

        <DataTable
          columns={columns}
          data={filteredData}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
        <ViewComplaintLogById
          id={id}
          openViewModal={openViewModal}
          closeViewModal={closeViewModal}
          isViewModalOpened={isViewModalOpened}
        />
      </Box>
    </>
  );
};

export default ComplaintsLogBody;

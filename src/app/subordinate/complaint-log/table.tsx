"use client";
import DataTable from "@/shared/table";
import ViewComplaint from "@/shared/view-complaint";
import { ActionIcon, Box, Button, Flex, Input, Menu, Modal, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconEdit,
  IconEye,
  IconSearch,
  IconSquareCheck,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Data } from "./page";
import Link from "next/link";
import {
  useUpdateComplaintLogStatusForSubordinateMutation,
} from "@/lib/redux/features/subordinate"
import { UpdateComplaintLogStatusForSubordinate } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import ViewComplaintLogById from "./viewmodal";

const RecentComplaints = ({
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
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [id, setId] = useState("");
  console.log(data);
  const [updateComplaintLogStatus, isLoading] =
    useUpdateComplaintLogStatusForSubordinateMutation({});

  const handleAccept = async (id: string) => {
    modals.openConfirmModal({
      title: "Submit Complaint Log",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to submit this complaint log?</Text>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      confirmProps: { color: "green" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const complaintLogStatus: UpdateComplaintLogStatusForSubordinate = {
          complaintLogId: id,
          status: "overviewing",
        };
        await updateComplaintLogStatus(complaintLogStatus);
        refetchComplaintLogs();
        return;
      },
    });
  };

  const columns: Array<Column<Data>> = [
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
          value.toLocaleLowerCase() === "high"
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
      accessor: "id",
      Cell: ({ value }) => {
        console.log(value);

        return (
          <div className="flex space-x-4">
            <ActionIcon
              variant="light"
              onClick={() => {
                setId(value);
                openViewModal();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconEye className="w-5 h-5" />
            </ActionIcon>
            <ActionIcon variant="light">
              <Link
                href={`/subordinate/complaint-log/${value}`}
                className="text-gray-500 hover:text-gray-700"
              >
                <IconEdit className="w-5 h-5" />
              </Link>
            </ActionIcon>
            <ActionIcon variant="light" onClick={() => handleAccept(value)}>
              <IconSquareCheck color="green" className="w-5 h-5" />
            </ActionIcon>
          </div>
        );
      },
    },
  ];

  return (
    <>

      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">Complaint Logs</Text>
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

export default RecentComplaints;

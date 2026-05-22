"use client";
import DataTable from "@/shared/table";
import { ActionIcon, Box } from "@mantine/core";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { GetComplaintsForUserResponse } from "@/types";
import { IconEye } from "@tabler/icons-react";
import ViewComplaintById from "./viewmodal";
import { useDisclosure } from "@mantine/hooks";

const MyComplaints = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
}: {
  data: GetComplaintsForUserResponse[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [viewId, setViewId] = useState("");

  const prepareViewModel = (id: string) => {
    setViewId(id);
    openViewModal();
  };

  const columns: Array<Column<GetComplaintsForUserResponse>> = useMemo(
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
            value === "resolved"
              ? "bg-green-200 text-green-800"
              : value === "pending"
                ? "bg-blue-200 text-blue-800"
                : value === "rejected"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800";
          return (
            <span
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
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
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Box className="w-full bg-primarykey-body">
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
  );
};

export default MyComplaints;

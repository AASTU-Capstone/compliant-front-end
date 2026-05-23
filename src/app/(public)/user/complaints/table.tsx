"use client";
import DataTable from "@/shared/table";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { GetComplaintsForUserResponse } from "@/types";
import { IconEye } from "@tabler/icons-react";
import ViewComplaintById from "./viewmodal";
import { useDisclosure } from "@mantine/hooks";

const getStatusStyle = (status: string) => {
  const statusLower = status?.toLowerCase() || "";
  if (statusLower === "resolved") {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (statusLower === "pending") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  if (statusLower === "rejected") {
    return "bg-red-100 text-red-700 border-red-200";
  }
  return "bg-blue-100 text-blue-700 border-blue-200";
};

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
        Header: "Action",
        Cell: ({ row }) => (
          <button
            onClick={() => prepareViewModel(row.original.id)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
          >
            <IconEye size={18} />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div>
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
    </div>
  );
};

export default MyComplaints;

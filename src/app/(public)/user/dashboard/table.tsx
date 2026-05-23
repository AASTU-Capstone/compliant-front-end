"use client";
import DataTable from "@/shared/table";
import { useMemo } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const getStatusStyle = (status: string) => {
  const statusLower = status?.toLowerCase() || "";
  if (statusLower.includes("resolved") || statusLower.includes("completed")) {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (statusLower.includes("pending") || statusLower.includes("review")) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  if (statusLower.includes("rejected") || statusLower.includes("closed")) {
    return "bg-red-100 text-red-700 border-red-200";
  }
  return "bg-blue-100 text-blue-700 border-blue-200";
};

const getCategoryStyle = (category: string) => {
  const categoryLower = category?.toLowerCase() || "";
  if (categoryLower.includes("urgent") || categoryLower.includes("high")) {
    return "bg-red-50 text-red-600 border-red-200";
  }
  if (categoryLower.includes("medium")) {
    return "bg-amber-50 text-amber-600 border-amber-200";
  }
  return "bg-primary/10 text-primary border-primary/20";
};

const RecentComplaints = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  isLoading,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
}) => {
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
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryStyle(value)}`}
          >
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
    ],
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Recent Complaints
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest complaint submissions
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
};

export default RecentComplaints;

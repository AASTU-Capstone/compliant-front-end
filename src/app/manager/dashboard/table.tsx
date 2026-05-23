"use client";
import DataTable from "@/shared/table";
import { useMemo } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const getPriorityStyle = (priority: string) => {
  const priorityLower = priority?.toLowerCase() || "";
  if (priorityLower === "high") {
    return "bg-red-100 text-red-700 border-red-200";
  }
  if (priorityLower === "medium") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  return "bg-green-100 text-green-700 border-green-200";
};

const RecentComplaintLogs = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchComplaintLogs,
  isLoading,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchComplaintLogs: () => void;
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
        Header: "Priority",
        accessor: "priority",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityStyle(value)}`}
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
            Recent Complaint Logs
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest complaint logs requiring attention
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

export default RecentComplaintLogs;

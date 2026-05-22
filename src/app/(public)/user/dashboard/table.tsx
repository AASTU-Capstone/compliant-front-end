"use client";
import DataTable from "@/shared/table";
import { Box, Text } from "@mantine/core";
import { useMemo } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const RecentComplaints = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
        Header: "Category",
        accessor: "category",
        Cell: ({ value }) => (
          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
            {value}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
            {value}
          </span>
        ),
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
      },
    ],
    []
  );

  return (
    <Box className="w-full mt-7">
      <Box>
        <Text className="text-xl px-5 py-4 bg-primarykey-body">Recent Complaints</Text>
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
    </Box>
  );
};

export default RecentComplaints;

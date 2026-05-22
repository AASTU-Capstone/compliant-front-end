"use client";
import { IconEye } from "@tabler/icons-react";
import { Data } from "./page";
import Link from "next/link";
import { Column } from "react-table";
import DataTable from "@/shared/table";
import { ActionIcon, Box, Text } from "@mantine/core";
import { useMemo } from "react";

const Resources = ({
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
        Header: "Action",
        accessor: "id",
        Cell: ({ value }) => {
          console.log(value);
          return (
            <div className="flex space-x-4">
              <ActionIcon variant="light">
                <Link href={`/user/resources/${value}`} className="text-gray-500 hover:text-gray-700">
                  <IconEye className="w-5 h-5" />
                </Link>
              </ActionIcon>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Text className="text-primary-default font-bold text-2xl mb-5">Resources</Text>
      <DataTable
        columns={columns}
        data={data}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default Resources;

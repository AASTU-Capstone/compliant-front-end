"use client";
import { Box } from "@mantine/core";
import AssignSubordinateTable from "./table";
import { useGetComplaintLogToAssignForManagerQuery } from "@/lib/redux/features/manager";
import { useMemo, useState, useEffect } from "react";
import { GetComplaintLogToAssignForManagerResponse } from "@/types";

const AssignSubordinate = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetComplaintLogToAssignForManagerQuery({
    pageNumber,
    pageSize
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const [searchQuery, setSearchQuery] = useState("");

  const data =
    res?.data?.map((item: GetComplaintLogToAssignForManagerResponse) => {
      return {
        ...item,
      };
    }) || [];

  const totalCount = res?.totalCount || 0;

  const filteredData = useMemo(() => {
    return data.filter((item: GetComplaintLogToAssignForManagerResponse) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  return (
    <Box className="w-full bg-primary-background">
      <AssignSubordinateTable
        data={filteredData}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        refetchComplaintLog={refetch}
      />
    </Box>
  );
};

export default AssignSubordinate;

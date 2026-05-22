"use client";
import { Box } from "@mantine/core";
import Resources from "./table";
import { useGetAllResourcesQuery } from "@/lib/redux/features/resource";
import React, { useState, useEffect } from "react";

export interface Data {
  id: string;
  title: string;
  createdAt: string;
}

const ResourceData = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllResourcesQuery({pageNumber, pageSize});
  console.log(res);

  useEffect(() => {
      refetch();
    }, [pageNumber, pageSize, refetch]);
  
  const data =
    res?.data?.map((item: any) => {
      return {
        ...item,
      };
    }) || [];

  
  const totalCount = res?.totalCount || 0;

  return (
    <Box className="w-full bg-primary-background">
      <Resources
        data={data}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
    </Box>
  );
};

export default ResourceData;

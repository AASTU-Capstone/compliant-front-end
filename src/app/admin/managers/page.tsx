"use client";
import { Box } from "@mantine/core";
import ManagersList from "./table";
import { useGetManagersForAdminQuery } from "@/lib/redux/features/admin";
import { ManagerResponse } from "@/types";
import { useState, useEffect } from "react";

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res, isLoading, isSuccess, refetch } = useGetManagersForAdminQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const type1 = res?.data?.type1;
  const type2 = res?.data?.type2;
  const added = [type1, type2];

  const data =
    added.map((item: ManagerResponse) => {
      return {
        ...item,
      };
    }) || [];

  return (
    <Box className="w-full bg-primary-background">
      <ManagersList
        data={data}
        refetchManagers={refetch}
        totalCount={res?.totalCount || 2}
        pageSize={pageSize || 2}
        currentPage={pageNumber || 1}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
    </Box>
  );
};

export default Page;

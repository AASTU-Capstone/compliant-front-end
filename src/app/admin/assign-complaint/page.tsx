"use client";
import React, { useState, useEffect } from "react";
import AssignComplaintTable from "./table";
import { useGetAcceptedComplaintsForAdminQuery } from "@/lib/redux/features/admin";

export interface Data {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  category: string;
}

const Page: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res, isLoading, isSuccess, refetch } = useGetAcceptedComplaintsForAdminQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const data =
    res?.data?.map((item: any) => ({
      ...item,
      status: "accepted",
    })) || [];
  const totalCount = res?.totalCount || 0;

  return (
    <AssignComplaintTable
      data={data}
      totalCount={totalCount}
      pageSize={pageSize}
      currentPage={pageNumber}
      setPageSize={setPageSize}
      setPageNumber={setPageNumber}
      refetchComplaints={refetch}
    />
  );
};

export default Page;

"use client";
import ManagersList from "./table";
import { useGetManagersForAdminQuery } from "@/lib/redux/features/admin";
import { ManagerResponse } from "@/types";
import { useState, useEffect } from "react";
import { IconUsers } from "@tabler/icons-react";

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    refetch,
  } = useGetManagersForAdminQuery({
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Managers</h1>
          <p className="text-muted-foreground mt-1">
            View and manage department managers
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
          <IconUsers className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            {data.filter(Boolean).length} Managers
          </span>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading managers...</span>
          </div>
        </div>
      ) : (
        <ManagersList
          data={data}
          refetchManagers={refetch}
          totalCount={res?.totalCount || 2}
          pageSize={pageSize || 2}
          currentPage={pageNumber || 1}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
};

export default Page;

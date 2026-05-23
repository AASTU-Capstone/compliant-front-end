"use client";
import React, { useState, useEffect } from "react";
import {
  useGetComplaintsQuery,
  useSearchComplaintsQuery,
} from "@/lib/redux/features/user";
import MyComplaints from "./table";
import { IconSearch, IconFilter } from "@tabler/icons-react";

const Page: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetComplaintsQuery({
    pageNumber,
    pageSize,
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: searchResponse, isSuccess: searchSuccess, refetch: searchRefetch } =
    useSearchComplaintsQuery(
      { keyword: searchKeyword, category: "", dateOrder: "asc", pageNumber, pageSize },
      { skip: !searchKeyword }
    );

  useEffect(() => {
    if (searchKeyword) {
      searchRefetch();
    }
  }, [searchKeyword, searchRefetch]);

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  let totalCount = 0;
  let data = [];
  if (searchKeyword && searchSuccess) {
    data = searchResponse?.data?.map((item: unknown) => ({ ...item as object })) || [];
    totalCount = searchResponse?.totalCount || 0;
  } else {
    data = res?.data?.map((item: unknown) => ({ ...item as object })) || [];
    totalCount = res?.totalCount || 0;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Complaints</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your submitted complaints
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <IconSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <IconFilter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading complaints...</span>
          </div>
        </div>
      ) : isSuccess ? (
        <MyComplaints
          data={data}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={pageNumber}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 flex items-center justify-center">
          <p className="text-muted-foreground">
            Failed to load complaints. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;

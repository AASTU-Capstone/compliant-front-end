"use client";
import Complaints from "./table";
import {
  useGetRecievedComplaintsForAdminQuery,
  useSearchComplaintsQuery,
} from "@/lib/redux/features/admin";
import { useState, useEffect } from "react";
import { IconSearch, IconFilter } from "@tabler/icons-react";

export interface Data {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
}

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetRecievedComplaintsForAdminQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  let totalCount = 0;
  let data = [];
  if (searchKeyword && searchSuccess) {
    data = searchResponse?.data?.map((item: Data) => ({ ...item, status: "received" })) || [];
    totalCount = searchResponse?.totalCount || 0;
  } else {
    data = res?.data?.map((item: Data) => ({ ...item, status: "received" })) || [];
    totalCount = res?.totalCount || 0;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Complaints</h1>
        <p className="text-muted-foreground mt-1">
          Manage and review all received complaints
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
      ) : (
        <Complaints
          data={data}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={pageNumber}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
          refetchComplaints={refetch}
        />
      )}
    </div>
  );
};

export default Page;

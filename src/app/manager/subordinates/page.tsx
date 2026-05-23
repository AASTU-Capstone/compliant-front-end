"use client";
import SubordinatesList from "./table";
import { useGetSubordinatesQuery, useSearchSubordinatesQuery } from "@/lib/redux/features/manager";
import { useState, useEffect } from "react";
import { useWebSocket } from "@/providers/WebSocketContext";
import { IconSearch, IconFilter, IconUsers } from "@tabler/icons-react";

interface SubordinateData {
  id: string;
  name: string;
  email: string;
  status: string;
}

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    refetch,
  } = useGetSubordinatesQuery({ pageNumber, pageSize });

  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: searchResponse, isSuccess: searchSuccess, refetch: searchRefetch } =
    useSearchSubordinatesQuery(
      { keyword: searchKeyword, pageNumber, pageSize },
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
  let data: SubordinateData[] = [];
  if (searchKeyword && searchSuccess) {
    data = searchResponse?.data?.map((item: SubordinateData) => ({
      ...item,
      status: "received",
    })) || [];
    totalCount = searchResponse?.totalCount || 0;
  } else {
    data = res?.data?.map((item: SubordinateData) => ({
      ...item,
      status: "received",
    })) || [];
    totalCount = res?.totalCount || 0;
  }

  const webSocketContext = useWebSocket();

  if (!webSocketContext) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subordinates</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your team members
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
          <IconUsers className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            {totalCount} Members
          </span>
        </div>
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
            placeholder="Search subordinates..."
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
            <span className="text-muted-foreground">
              Loading subordinates...
            </span>
          </div>
        </div>
      ) : (
        <SubordinatesList
          data={data}
          totalCount={res?.totalCount || 0}
          pageSize={pageSize}
          currentPage={pageNumber}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
          refetchSubordinate={refetch}
        />
      )}
    </div>
  );
};

export default Page;

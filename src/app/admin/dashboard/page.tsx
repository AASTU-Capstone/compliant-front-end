"use client";
import RecentComplaints from "./table";
import {
  useGetComplaintStatitisticsQuery,
  useGetCorruptionTrendStatisticsQuery,
} from "@/lib/redux/features/statistics";
import { useGetAllComplaintsForAdminQuery } from "@/lib/redux/features/admin";
import BarGraph from "@/shared/bargraph";
import { useState, useEffect } from "react";
import {
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconCircleX,
  IconChartBar,
} from "@tabler/icons-react";

export interface Data {
  id: string;
  title: string;
  category: string;
  status: string;
  tags: string;
  createdAt: string;
}

const statCards = [
  {
    key: "totalComplaints",
    label: "Total Complaints",
    icon: IconFileText,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    key: "resolvedComplaints",
    label: "Resolved",
    icon: IconCircleCheck,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    key: "pendingComplaints",
    label: "In Review",
    icon: IconClock,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    key: "rejectedComplaints",
    label: "Rejected",
    icon: IconCircleX,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-600",
  },
];

const Dashboard = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res } = useGetComplaintStatitisticsQuery("");

  const {
    data: complaintResponse,
    isLoading,
    refetch,
  } = useGetAllComplaintsForAdminQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const complaintData = res?.data;
  const complaintList =
    complaintResponse?.data?.map((item: Data) => ({
      ...item,
    })) || [];

  const totalCount = complaintResponse?.totalCount || 5;

  const { data: corruptionResponse } = useGetCorruptionTrendStatisticsQuery({});

  const corruptionData = corruptionResponse?.data;
  const bardata = corruptionData?.map(
    (item: { name: string; mitigatedCount: number; totalCount: number }) => ({
      name: item.name,
      mitigatedCount: item.mitigatedCount,
      totalCount: item.totalCount,
    })
  );

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value =
            complaintData?.[stat.key as keyof typeof complaintData] || 0;
          return (
            <div
              key={stat.key}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {value}
                  </p>
                </div>
                <div className={`${stat.lightColor} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corruption Statistics Chart */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconChartBar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Corruption Statistics
            </h2>
            <p className="text-sm text-muted-foreground">
              Overview of reported vs mitigated cases
            </p>
          </div>
        </div>
        <div className="p-6">
          <BarGraph data={bardata || []} />
        </div>
      </div>

      {/* Recent Complaints */}
      <RecentComplaints
        data={complaintList}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;

"use client";
import RecentComplaints from "./table";
import { useGetComplaintStatitisticsQuery } from "@/lib/redux/features/statistics";
import { useGetComplaintsQuery } from "@/lib/redux/features/user";
import jwt from "jsonwebtoken";
import { useState } from "react";
import {
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconCircleX,
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
  const token = decodeURIComponent(
    typeof window !== "undefined" ? document.cookie : ""
  )
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];
  const decodedToken: { userid?: string } | null = jwt.decode(token || "") as { userid?: string } | null;
  const userId = decodedToken?.userid || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res } = useGetComplaintStatitisticsQuery(userId);
  const { data: complaintResponse, isLoading, isSuccess } = useGetComplaintsQuery({
    pageNumber,
    pageSize,
  });

  const complaintData = res?.data;

  const complaintList =
    complaintResponse?.data?.map((item: Data) => {
      return {
        ...item,
      };
    }) || [];

  const totalCount = complaintResponse?.totalCount || 5;

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
                <div
                  className={`${stat.lightColor} p-3 rounded-xl`}
                >
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Complaints Table */}
      <div>
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
    </div>
  );
};

export default Dashboard;

"use client";
import {
  useGetComplaintLogStatisticsQuery,
  useGetCorruptionTrendStatisticsQuery,
} from "@/lib/redux/features/statistics";
import jwt from "jsonwebtoken";
import BarGraph from "@/shared/bargraph";
import {
  IconFileText,
  IconCircleCheck,
  IconClock,
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
    key: "totalComplaintLogs",
    label: "Total Complaint Logs",
    icon: IconFileText,
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    key: "resolvedComplaintLogs",
    label: "Resolved",
    icon: IconCircleCheck,
    lightColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    key: "pendingComplaintLogs",
    label: "In Review",
    icon: IconClock,
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
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
  const subordinateId = decodedToken?.userid;

  const { data: res } = useGetComplaintLogStatisticsQuery({
    subordinateId: subordinateId,
    managerId: "",
  });
  const complaintData = res?.data;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Corruption Trends Chart */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconChartBar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Corruption Trends
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
    </div>
  );
};

export default Dashboard;

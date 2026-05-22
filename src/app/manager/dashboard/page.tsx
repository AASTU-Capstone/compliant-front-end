"use client";
import { Box, Paper, SimpleGrid, Text } from "@mantine/core";
import RecentComplaintsLogBody from "./table";
import { useGetComplaintLogStatisticsQuery,useGetCorruptionTrendStatisticsQuery } from "@/lib/redux/features/statistics";
import { useGetComplaintLogToUpdateForManagerQuery } from "@/lib/redux/features/manager";
import { GetComplaintLogToUpdateForManagerResponse } from "@/types";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken"
import BarGraph from "@/shared/bargraph";
export interface Data {
  id: string;
  title: string;
  category: string;
  status: string;
  priority:string;
  tags: string;
  createdAt: string;
}



const Dashboard = () => {
  
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = decodeURIComponent(typeof window !== "undefined" ? document.cookie : "")
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];
  const decodedToken: any = jwt.decode(token || "");
  const managerId = decodedToken?.userid
  const {
    data: res,
    isLoading,
    isSuccess,
  } = useGetComplaintLogStatisticsQuery({subordinateId:"", managerId:managerId});

  const {
    data: complaintLogResponse,
    isLoading: complaintLogLoading,
    isSuccess: complaintLogSuccess,
    refetch,
  } = useGetComplaintLogToUpdateForManagerQuery({
    pageNumber,
    pageSize
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const complaintLogs =
  complaintLogResponse?.data?.map((item: GetComplaintLogToUpdateForManagerResponse) => {
      return {
        ...item,
      };
    }) || [];
  const totalCount = 5;

  const {data:corruptionResponse, isLoading:corruptionLoading, isSuccess:corruptionSuccess} = useGetCorruptionTrendStatisticsQuery({})
  const complaintData = res?.data;
  const corruptionData = corruptionResponse?.data
  const bardata = corruptionData?.map((item:any) => ({
    name: item.name,
    mitigatedCount: item.mitigatedCount,
    totalCount: item.totalCount,
  }));
  return (
    <Box className="py-6 w-full bg-primarykey-background">
      <SimpleGrid
        className="w-full"
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 8, sm: "lg" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Complaint Logs</Text>
          <Text className="font-bold mt-1 text-xl">
            {complaintData?.totalComplaintLogs || 0}
          </Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Resolved</Text>
          <Text className="font-bold mt-1 text-xl">
            {complaintData?.resolvedComplaintLogs || 0}
          </Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">In-Review ComplaintLogs</Text>
          <Text className="font-bold mt-1 text-xl">
            {complaintData?.pendingComplaintLogs || 0}
          </Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Assigned ComplaintLogs</Text>
          <Text className="font-bold mt-1 text-xl">
            {complaintData?.assignedComplaintLogs || 0}
          </Text>
        </Paper>
        
      </SimpleGrid>

      <Box className="h-32 w-full flex justify-center items-center mt-6 bg-gray-200">
        <h1 className="text-2xl">Corruption Trend</h1>
      </Box>
      <BarGraph data={bardata}></BarGraph>
      <RecentComplaintsLogBody
        data={complaintLogs}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        refetchComplaintLogs={refetch}
      />
    </Box>
  );
};

export default Dashboard;
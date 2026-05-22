"use client";
import { Box, SimpleGrid, Paper, Text } from "@mantine/core";
import RecentComplaints from "./table";
import { useGetComplaintStatitisticsQuery } from "@/lib/redux/features/statistics";
import { useGetComplaintsQuery } from "@/lib/redux/features/user";
import jwt from "jsonwebtoken";
import { useState } from "react";

export interface Data {
  id: string;
  title: string;
  category: string;
  status: string;
  tags: string;
  createdAt: string;
}

const Dashboard = () => {
  const token = decodeURIComponent(typeof window !== "undefined" ? document.cookie : "")
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];
  const decodedToken: any = jwt.decode(token || "");
  const userId = decodedToken.userid;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res, isLoading, isSuccess } = useGetComplaintStatitisticsQuery(userId);
  const { data: complaintResponse, isLoading: loading, isSuccess: success } = useGetComplaintsQuery({pageNumber, pageSize});

  const complaintData = res?.data;

  
  const complaintList = complaintResponse?.data?.map((item: any) => {
    return {
      ...item,
    };
  }) || [];

  const totalCount = 5;

  return (
    <Box className="py-6 w-full bg-primarykey-background">
      <SimpleGrid
        className="w-full"
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 8, sm: "lg" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Complaints</Text>
          <Text className="font-bold mt-1 text-xl">{complaintData?.totalComplaints || 0}</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Resolved</Text>
          <Text className="font-bold mt-1 text-xl">{complaintData?.resolvedComplaints || 0}</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">In-Review Complaints</Text>
          <Text className="font-bold mt-1 text-xl">{complaintData?.pendingComplaints || 0}</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Rejected Complaints</Text>
          <Text className="font-bold mt-1 text-xl">{complaintData?.rejectedComplaints || 0}</Text>
        </Paper>
      </SimpleGrid>

      <RecentComplaints
        data={complaintList}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
    </Box>
  );
};

export default Dashboard;

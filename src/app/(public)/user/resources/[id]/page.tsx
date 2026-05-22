"use client";
import { Badge, Box, Button, Flex, Textarea,Input } from "@mantine/core";
import React, { useState } from "react";
import { 
  useUpdateComplaintLogReportForSubordinateMutation} 
from "@/lib/redux/features/subordinate"
import {useGetResourceByIdQuery} from "@/lib/redux/features/resource"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const {data:response, isLoading, isSuccess,refetch} = useGetResourceByIdQuery(id)
  const resource = response?.data;
  return (
    <Box className="bg-white min-h-screen p-7 rounded-lg">
      <Flex className="mb-4 justify-between">
        <h1 className="text-3xl font-bold text-blue-600">{resource?.title || "Title"} </h1>
      </Flex>
      <Box className="mb-6">
        <h3 className="text-lg font-medium text-blue-400">Description</h3>
      </Box>
      <Box className="bg-white-100 rounded-lg p-2 mb-4">
      <Textarea
          className="w-full bg-transparent outline-none text-lg"
          value={resource?.description || ""}
          maxLength={80}
          autosize
          minRows={3}
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
        />
      </Box>
    </Box>
  );
};

export default Page;
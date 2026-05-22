"use client";
import { Badge, Box, Button, Flex, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { 
  useUpdateComplaintLogReportForSubordinateMutation} 
from "@/lib/redux/features/subordinate"
import {useGetComplaintLogByIdQuery} from "@/lib/redux/features/complaintLog"
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [assignComplaintLog,{ isLoading: isComplaintLogAssigning }] = useUpdateComplaintLogReportForSubordinateMutation({})
  const router = useRouter()
  
  const handleReportSubmit = async ()=>{
    if(selectedReport){
      const complaintReport = {
        id:id,
        report: selectedReport
      };
      await assignComplaintLog(complaintReport)
      refetch()
      close();
    }
  }
  const handleRouter = async ()=>{
    router.push("/subordinate/complaint-log")
  }

  //fetch complaint log with the given id 
  const {data:response, isLoading, isSuccess,refetch} = useGetComplaintLogByIdQuery(id)
  const complaintLog = response?.data;
  return (
    <Box className="bg-white min-h-screen p-7 rounded-lg">
      <Flex className="mb-4 justify-between">
        <h1 className="text-3xl font-bold text-blue-600">{complaintLog?.title || "Title"} </h1>
        <Box className="flex px-7 items-center font-semibold rounded-full bg-red-200 text-red-800">
        {complaintLog?.priority || "Priority"}
        </Box>
      </Flex>
      <Box className="mb-4">
        <h2 className="text-xl font-semibold text-blue-500">{complaintLog?.complaints?.category || "Category"}</h2>
      </Box>
      <Box className="mb-6">
        <h3 className="text-lg font-medium text-blue-400">Report</h3>
      </Box>
      <Box className="mb-4bg-slate-400">
        <Textarea minRows={15} autosize onChange={(event) => setSelectedReport(event.currentTarget.value)} defaultValue={complaintLog?.report}/>
      </Box>
      <Box className="flex justify-end mt-16 space-x-4">
        <Button onClick={handleReportSubmit}> <div className="flex items-center justify-center gap-x-3 bg-transparent">
          { isComplaintLogAssigning?(
                <div className="spinner">
                <span>saving . . .</span>
                </div>) 
              :(
              <span>Save</span>
            )}
            </div>
        </Button>
        <Button variant="outline" onClick={handleRouter} >Cancel</Button>
        
      </Box>
    </Box>
  );
};

export default page;

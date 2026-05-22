"use client";
import { Box, Button, Flex, Input, Menu, Text } from "@mantine/core";
import ComplaintsLogBody from "./table";
import { useGetComplaintLogToUpdateForManagerQuery } from "@/lib/redux/features/manager";
import { GetComplaintLogToUpdateForManagerResponse } from "@/types";
import { useState, useEffect } from "react";
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useSearchComplaintLogQuery } from "@/lib/redux/features/complaintLog";

const ComplaintsLog = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetComplaintLogToUpdateForManagerQuery({
    pageNumber,
    pageSize
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  //search handler
  const [searchKeyword, setSearchKeyword] = useState("")
  const { data: searchResponse,isSuccess:searchSuccess, refetch:searchRefetch } = 
  useSearchComplaintLogQuery({keyword:searchKeyword,status:"overviewing",pageNumber,pageSize}, {
    skip: !searchKeyword,
  });
  useEffect(() => {
    if (searchKeyword) {
      searchRefetch();
    }
  }, [searchKeyword, searchRefetch]);

  var totalCount = 0;
  var data = []
  if(searchKeyword && searchSuccess){
    data = searchResponse?.data.map((item: any) => ({ ...item, status: "received" })) || [];
    totalCount = searchResponse?.totalCount || 0;
    console.log(totalCount)
  }else{
    data = res?.data.map((item: any) => ({ ...item, status: "received" })) || [];
    totalCount = res?.totalCount || 0;
  }

  return (
    <Box className="w-full bg-primary-background">
      <Text className="text-primary-default font-bold text-2xl mb-5">
        Complaint Logs
      </Text>
      <Flex className="gap-3 items-center">
        <Input
          placeholder="Search"
          radius="md"
          w={350}
          leftSection={<IconSearch />}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <Button>Search</Button>
      </Flex>
      <ComplaintsLogBody
        data={data}
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

export default ComplaintsLog;

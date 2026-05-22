"use client";
import { Box, Button, Flex, Input, Menu } from "@mantine/core";
import ComplaintsLogBody from "./table";
import { useGetComplaintLogsToUpdateForAdminQuery } from "@/lib/redux/features/admin";
import { useState, useEffect } from "react";
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useSearchComplaintLogQuery } from "@/lib/redux/features/complaintLog";

export interface Data {
  id: string;
  title: string;
  priority: string;
  createdAt: string;
}

const ComplaintsLog = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetComplaintLogsToUpdateForAdminQuery({ pageNumber, pageSize });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);


  //search handler
  const [searchKeyword, setSearchKeyword] = useState("")
  const { data: searchResponse,isSuccess:searchSuccess, refetch:searchRefetch } = 
  useSearchComplaintLogQuery({keyword:searchKeyword,status:"submitted",pageNumber,pageSize}, {
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

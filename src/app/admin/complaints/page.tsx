"use client";
import Complaints from "./table";
import { useGetRecievedComplaintsForAdminQuery, useSearchComplaintsQuery } from "@/lib/redux/features/admin";
import { useState, useEffect } from "react";
import { ActionIcon, Box, Button, Flex, Input, Menu, Modal, Text } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch } from "@tabler/icons-react";
export interface Data {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
}

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //search area
  const [searchKeyword, setSearchKeyword] = useState("")
  const { data: searchResponse,isSuccess:searchSuccess, refetch:searchRefetch } = 
  useSearchComplaintsQuery({keyword:searchKeyword,category:"",dateOrder:"asc",pageNumber,pageSize}, {
    skip: !searchKeyword,
  });

  useEffect(() => {
    if (searchKeyword) {
      searchRefetch();
    }
  }, [searchKeyword, searchRefetch]);

  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetRecievedComplaintsForAdminQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);
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

        <Button >Search</Button>
      </Flex>
      <Complaints
        data={data}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        refetchComplaints={refetch}
      />
    </Box>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from "react";
import { useGetComplaintsQuery,useSearchComplaintsQuery } from "@/lib/redux/features/user";
import MyComplaints from "./table";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Page: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: res, isLoading, isSuccess, refetch } = useGetComplaintsQuery({
    pageNumber,
    pageSize,
  });

  //search keyword
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

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  useEffect(() => {
    
  }, [res, isSuccess]);

  var totalCount = 0;
  var data = []
  if(searchKeyword && searchSuccess){
    data = searchResponse?.data.map((item: any) => ({ ...item })) || [];
    totalCount = searchResponse?.totalCount || 0;
    console.log(totalCount)
  }else{
    data = res?.data.map((item: any) => ({ ...item })) || [];
    totalCount = res?.totalCount || 0;
  }

  return (
    <Box className="w-full bg-primarykey-body">
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
      <Box className="px-2 py-5">
        <Text className="text-xl font-bold">My Complaints</Text>
      </Box>

      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <MyComplaints
          data={data}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={pageNumber}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      )}
      {!isLoading && !isSuccess && <Text>Failed to load data.</Text>}
    </Box>
  );
};

export default Page;

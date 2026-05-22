"use client";
import { ActionIcon, Box, Button, Flex, Input, Menu, Modal, Text } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconChevronDown, IconSearch } from "@tabler/icons-react";
import SubordinatesList from "./table";
import { useGetSubordinatesQuery } from "@/lib/redux/features/manager";
import { useSearchSubordinatesQuery } from "@/lib/redux/features/manager";
import { GetSubordinatesResponse } from "@/types";
import { useState, useEffect } from "react";
import { useWebSocket } from "@/providers/WebSocketContext";


const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetSubordinatesQuery({ pageNumber, pageSize });

  //search area
  const [searchKeyword, setSearchKeyword] = useState("")
  const { data: searchResponse,isSuccess:searchSuccess, refetch:searchRefetch } = 
  useSearchSubordinatesQuery({keyword:searchKeyword,pageNumber,pageSize}, {
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

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, refetch]);

  const webSocketContext = useWebSocket();

  // Check if webSocketContext is available
  if (!webSocketContext) {
    return <div>Loading...</div>;
  }

  const { messages, sendMessage, logout } = webSocketContext;

  useEffect(() => {
    // console.log("WebSocket Messages: ", messages);
    console.log("here we go: ", messages);
  }, [messages]);

  // add subordinate handlers
  

  return (
    <Box className="w-full bg-primary-background">
      <Text className="text-primary-default font-bold text-2xl mb-5">
        Subordinate Dashboard
      </Text>
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
      <SubordinatesList
        data={data}
        totalCount={res?.totalCount || 0}
        pageSize={pageSize}
        currentPage={pageNumber}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        refetchSubordinate={refetch}
      />
    </Box>
  );
};

export default Page;

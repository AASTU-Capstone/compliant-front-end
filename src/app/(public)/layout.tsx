import { Box, Flex } from "@mantine/core";
import React from "react";
import Sidebar from "./user/_components/sidebar";
import Header from "@/shared/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar />
      <Box className="gap-10 flex flex-col px-10 py-5 w-full bg-primarykey-background">
        <Header role="User" />
        {children}
      </Box>
    </Flex>
  );
}

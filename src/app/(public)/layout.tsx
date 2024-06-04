import Header from "@/shared/header";
import Sidebar from "@/shared/sidebar";
import { Box, Flex } from "@mantine/core";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar role="user" />
      <Box className="gap-10 flex flex-col px-10 py-5 w-full bg-primary-background">
        <Header role="User" />
        {children}
      </Box>
    </Flex>
  );
}

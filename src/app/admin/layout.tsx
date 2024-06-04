import Header from "@/shared/header";
import Sidebar from "@/shared/sidebar";
import { Box, Flex } from "@mantine/core";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar role="admin" />
      <Box className="gap-10 flex flex-col px-10 py-5 w-full bg-primary-background">
        <Header role="Admin" />
        {children}
      </Box>
    </Flex>
  );
}

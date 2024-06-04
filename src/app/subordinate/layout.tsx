import Sidebar from "@/shared/sidebar";
import { Box, Flex } from "@mantine/core";
import React from "react";
import Header from "../../shared/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar role="subordinate" />
      <Box className="gap-10 flex flex-col px-10 py-5 w-full bg-primary-background">
        <Header role="Subordinate" />
        {children}
      </Box>
    </Flex>
  );
}

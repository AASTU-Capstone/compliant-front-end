import { Box, Flex, Image } from "@mantine/core";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="h-screen min-h-[600px]  p-4">
      <Flex className="h-full flex-col items-center justify-between px-1 md:flex-row md:px-32">
        <Image src="/assets/welcome-image.jpg" w={600} h={600} alt="welcome" />
        <Box className="w-full items-center justify-center">{children}</Box>
      </Flex>
    </Box>
  );
}

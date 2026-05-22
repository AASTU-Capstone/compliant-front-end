"use client";

import Carousel from "@/components/auth/Slider";
import { Box, Flex, Image } from "@mantine/core";
// import NextNProgress from "nextjs-progressbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-full">
        
          {/* <Carousel /> */}
          <Box className="h-screen min-h-[600px]  bg-background hidden lg:block p-4">
      <Flex className="h-full flex-col items-center justify-between px-1 md:flex-row md:px-32">
        <Image src="/assets/welcome-image-removebg.png" w={600} h={600} alt="welcome" />
      </Flex>
    </Box>
        
        <div className="overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}

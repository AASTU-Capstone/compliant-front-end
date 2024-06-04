"use client";
import CreateComplaint from "@/app/(public)/_components/create-complaint";
import { Box, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { linksData } from "./links";

function Sidebar({ role }: { role: string }) {
  const path = usePathname().split("/").pop();
  const [opened, { open, close }] = useDisclosure(false);

  const links = linksData.map(
    (item) =>
      item.role === role && (
        <Link href={item.link} key={item.label}>
          <Text
            className={`flex min-h-11 w-full items-center gap-4 ${path === item.link.split("/").pop() ? "text-primary-default border-r-4 border-primary-default" : "opacity-55"} `}
          >
            <item.icon className="" stroke={1.5} />
            {item.label}
          </Text>
        </Link>
      )
  );

  return (
    <>
      <Modal
        opened={opened}
        size="70%"
        onClose={close}
        title="Create Complaint"
      >
        <CreateComplaint closeModal={close} />
      </Modal>
      <Box>
        <Link
          href="/dashboard"
          className="flex justify-center items-center pt-5 pb-2"
        >
          <Image src="/assets/logo.jpg" alt="logo" width={150} height={50} />
        </Link>

        <div className="border-t-2 mb-7 border-gray-200 w-full"></div>
        <Flex className="gap-7 ml-10 h-screen w-72 flex-col">
          {role === "user" && (
            <Button
              onClick={open}
              size="lg"
              radius="xl"
              w="80%"
              leftSection={<IconPlus />}
            >
              Create
            </Button>
          )}
          <Flex className="w-full flex-col gap-2">{links}</Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Sidebar;

"use client";
import { Button, Flex, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlignBoxLeftTop,
  IconFiles,
  IconLayoutDashboard,
  IconPlus,
} from "@tabler/icons-react";
import { GoHubot } from "react-icons/go";
import { RiRobot2Line } from "react-icons/ri";
import { SiChatbot } from "react-icons/si";
import Link from "next/link";
import { useState } from "react";
import CreateComplaint from "./create-complaint";

const data = [
  { link: "/user/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/user/complaints", label: "Complaints", icon: IconAlignBoxLeftTop },
  { link: "/user/resources", label: "Resources", icon: IconFiles },
  {link: "/user/chats",label: "ChatBot", icon: SiChatbot },
];

function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [opened, { open, close }] = useDisclosure(false);

  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <Text
        onClick={(event) => {
          setActive(item.label);
        }}
        className={`flex min-h-11 w-full items-center gap-4 ${active === item.label ? "text-primary-default border-r-4 border-primary-default" : "opacity-55"} `}
      >
        <item.icon stroke={String(1.5)} />
        {item.label}
      </Text>
    </Link>
  ));

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
      <Flex className="my-9 ml-10 h-screen w-72 flex-col">
        <Group className="mb-8" justify="space-between">
          <Button
            onClick={open}
            size="lg"
            radius="xl"
            leftSection={<IconPlus />}
          >
            Create
          </Button>
        </Group>
        <Flex className="w-full flex-col gap-2">{links}</Flex>
      </Flex>
    </>
  );
}

export default Sidebar;

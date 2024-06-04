"use client";
import { Avatar, Box, Button, Divider, Flex, Menu, Text } from "@mantine/core";
import { IconBell, IconBellPlus, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

const Header = ({ role }: { role: string }) => {
  const notification = true;

  return (
    <header>
      <Flex className="justify-between w-full">
        <Box>
          <Text className="font-bold">Hello, John</Text>
          <Text c="dimmed" className="text-sm">
            Have a nice day
          </Text>
        </Box>
        <Flex className="items-center gap-3 justify-center">
          <Box className="relative">
            {notification ? <IconBellPlus /> : <IconBell />}
          </Box>
          <Divider orientation="vertical" />
          <Flex className="items-center gap-3 justify-center">
            <Avatar />
            <Box>
              <Text>John deo</Text>
              <Text c="dimmed" className="text-sm">
                {role}
              </Text>
            </Box>
          </Flex>
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button variant="transparent" className="p-0">
                <IconChevronDown className="cursor-pointer" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component={Link} href="/admin/dashboard">
                Admin
              </Menu.Item>
              <Menu.Item component={Link} href="/manager/dashboard">
                Manage
              </Menu.Item>
              <Menu.Item component={Link} href="/subordinate/dashboard">
                Subordinate
              </Menu.Item>
              <Menu.Item component={Link} href="/auth/sign-up">
                <Text className="text-primary-default py-2 font-bold">
                  Log out
                </Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;

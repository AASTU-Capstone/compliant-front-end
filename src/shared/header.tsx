"use client";
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Menu,
  Text,
} from "@mantine/core";
import Badge from "@mui/material/Badge";
import { IconBell, IconChevronDown } from "@tabler/icons-react";
import { useGetAdminProfileQuery } from "@/lib/redux/features/admin";
import { useGetManagerProfileQuery } from "@/lib/redux/features/manager";
import { useGetSubordinateProfileQuery } from "@/lib/redux/features/subordinate";
import React, { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useWebSocket } from "@/providers/WebSocketContext";
import NotificationArea from "@/shared/notificationArea";
import {
  useMarkNotificationsMutation,
  useGetUnreadNotificationsQuery,
} from "@/lib/redux/features/notification";

interface Notification {
  id: string;
  sender: string;
  message: string;
  isRead: boolean;
  recieverId: string;
  createdAt: Date;
}

const notify = () => {
  toast.success("Logout Successful", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      color: "#fff",
      backgroundColor: "#3563E9",
      padding: "0px",
    },
  });
};

const addThreeHours = (date: any) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 3);
  return newDate;
};

const Header = ({ role }: { role: string }) => {
  const { logoutHandler } = useAuth();
  const { messages, logout, clear } = useWebSocket();
  const [markNotifications] = useMarkNotificationsMutation();
  const [unreadNotificationIds, setUnreadNotificationIds] = useState<string[]>(
    []
  );

  const handleSignOut = () => {
    logoutHandler();
    // setNotifications([]);
    // refetch();
    logout();
    notify();
  };

  const notification = true;
  const token = decodeURIComponent(
    typeof window !== "undefined" ? document.cookie : ""
  )
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  const decodedToken: any = jwt.decode(token || "");
  const usernameFromEmail = decodedToken?.useremail?.split("@")[0];
  const usertype = decodedToken?.typ;

  const { data: subData } = useGetSubordinateProfileQuery({});
  const { data: managerData } = useGetManagerProfileQuery({});
  const { data: adminData } = useGetAdminProfileQuery({});

  let username = usernameFromEmail;
  let firstName = username;

  if (usertype === "subordinate" && subData) {
    username = subData?.data?.name;
    firstName = username?.split(" ")[0];
  } else if (usertype === "manager" && managerData) {
    username = managerData?.data?.name;
    firstName = username?.split(" ")[0];
  } else if (usertype === "admin" && adminData) {
    username = adminData?.data?.name;
    firstName = username?.split(" ")[0];
  }

  // notification setup
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const {
    data: res,
    isLoading,
    isSuccess,
    refetch,
  } = useGetUnreadNotificationsQuery({});

  useEffect(() => {
    const UnreadNotification =
      res?.data?.map((item: Notification) => ({
        ...item,
        createdAt: addThreeHours(item.createdAt),
      })) || [];
    if (UnreadNotification.length > 0) {
      setNotifications([]);
      setNotifications(UnreadNotification);
    }
  }, [res]);

  useEffect(() => {
    if (messages.length > 0) {
      console.log("Received", messages);
      const sortedMessages = messages.map((item: Notification) => ({
        ...item,
      }));
      setNotifications(() =>
        [...sortedMessages].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      clear();
    }
  }, [messages]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleNotificationRead = (ids: string[]) => {
    setUnreadNotificationIds((prev) => [...prev, ...ids]);
  };

  const notificationRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      if (unreadNotificationIds.length > 0) {
        markNotifications({ notificationIds: unreadNotificationIds }).unwrap();
        setUnreadNotificationIds([]);
        // refetch();
      }
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, unreadNotificationIds]);

  return (
    <header>
      <Flex className="justify-between w-full">
        <Box>
          <Text className="font-bold">Hello, {firstName || "John"}</Text>
          <Text c="dimmed" className="text-sm">
            Have a nice day
          </Text>
        </Box>
        <Flex
          className="items-center gap-3 justify-center relative"
          ref={notificationRef}
        >
          <ActionIcon
            onClick={toggleNotifications}
            size="lg"
            style={{
              color: "#757575",
              backgroundColor: "#fff",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <IconBell />
          </ActionIcon>
          {!showNotifications &&
            notifications.some((notification) => !notification.isRead) && (
              <Badge
                badgeContent={
                  notifications.filter((notification) => !notification.isRead)
                    .length
                }
                color="primary"
                style={{ position: "relative", top: -12, right: 12 }}
              ></Badge>
            )}
          {showNotifications && (
            <NotificationArea
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
            />
          )}
          <Divider orientation="vertical" />
          <Flex className="items-center gap-3 justify-center">
            <Avatar />
            <Box>
              <Text>{username || "John Doe"}</Text>
              <Text c="dimmed" className="text-sm">
                {role}
              </Text>
            </Box>
            <Menu width={200} shadow="md">
              <Menu.Target>
                <IconChevronDown className="cursor-pointer icon-hover" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component={Link}
                  href="/reset-password/change"
                  className="text-inherit hover:text-white hover:bg-blue-400"
                >
                  <Text className="">Reset Password</Text>
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  href="/login"
                  className="text-inherit hover:text-white hover:bg-red-500"
                  onClick={handleSignOut}
                >
                  <Text className="">Log out</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;

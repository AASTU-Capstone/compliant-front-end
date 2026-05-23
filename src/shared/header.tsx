"use client";
import {
  Avatar,
  Divider,
  Menu,
} from "@mantine/core";
import {
  IconBell,
  IconChevronDown,
  IconLogout,
  IconKey,
  IconSearch,
} from "@tabler/icons-react";
import { useGetAdminProfileQuery } from "@/lib/redux/features/admin";
import { useGetManagerProfileQuery } from "@/lib/redux/features/manager";
import { useGetSubordinateProfileQuery } from "@/lib/redux/features/subordinate";
import React, { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
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

const addThreeHours = (date: Date) => {
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
    logout();
    notify();
  };

  const token = decodeURIComponent(
    typeof window !== "undefined" ? document.cookie : ""
  )
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  const decodedToken: { useremail?: string; typ?: string } | null = jwt.decode(token || "") as { useremail?: string; typ?: string } | null;
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
  const { data: res } = useGetUnreadNotificationsQuery({});

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
  }, [messages, clear]);

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
      }
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, unreadNotificationIds, markNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="flex items-center justify-between w-full py-2">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()}, {firstName || "User"}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Welcome to your {role.toLowerCase()} dashboard
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3" ref={notificationRef}>
        {/* Search Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200">
          <IconSearch size={18} />
        </button>

        {/* Notification Button */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <IconBell size={18} />
          </button>
          {!showNotifications && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          {showNotifications && (
            <NotificationArea
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
            />
          )}
        </div>

        {/* Divider */}
        <Divider orientation="vertical" className="h-8 mx-1" />

        {/* User Profile Menu */}
        <Menu width={200} shadow="lg" position="bottom-end" offset={8}>
          <Menu.Target>
            <button className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-200 cursor-pointer">
              <Avatar
                size="sm"
                radius="md"
                color="blue"
                className="ring-2 ring-primary/20"
              >
                {firstName?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {username || "User"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {role}
                </p>
              </div>
              <IconChevronDown
                size={16}
                className="text-muted-foreground ml-1"
              />
            </button>
          </Menu.Target>

          <Menu.Dropdown className="border border-border bg-card">
            <Menu.Item
              component={Link}
              href="/reset-password/change"
              leftSection={<IconKey size={16} />}
              className="text-foreground hover:bg-muted"
            >
              Reset Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              component={Link}
              href="/login"
              onClick={handleSignOut}
              leftSection={<IconLogout size={16} />}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
};

export default Header;

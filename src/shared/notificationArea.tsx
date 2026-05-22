import {
  Box,
  Text,
  Divider,
  ScrollArea,
  Flex,
  Avatar,
  Indicator,
} from "@mantine/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  sender: string;
  message: string;
  isRead: boolean;
  recieverId: string;
  createdAt: any;
}

interface NotificationAreaProps {
  notifications: Notification[];
  onNotificationRead: (ids: string[]) => void;
}

const NotificationArea = ({
  notifications,
  onNotificationRead,
}: NotificationAreaProps) => {
  const [displayedNotifications, setDisplayedNotifications] =
    useState(notifications);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);

  // const formatDate = (date: any) => {
  //   const EATOffset = 60;
  //   const millisecondsInMinute = 60 * 1000;
  //   if (typeof date === "string") date = new Date(date);

  //   // Validate that date is now a Date object and check for invalid dates
  //   if (!(date instanceof Date) || isNaN(date.getTime())) {
  //     return "Invalid date";
  //   }

  //   return formatDistanceToNow(Math.floor((Date.now() - date.getTime()) % millisecondsInMinute), {
  //     addSuffix: true,
  //   });
  // };
  const getRelativeTime = (datestr: any) => {
    const date = new Date(datestr);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleNotificationClick = (index: any) => {
    const updatedNotifications = [...displayedNotifications];
    if (!updatedNotifications[index].isRead) {
      updatedNotifications[index].isRead = true;
      setReadNotificationIds((prev) => [
        ...prev,
        updatedNotifications[index].id,
      ]);
    }
    setDisplayedNotifications(updatedNotifications);
  };

  // Notify parent component of read notifications when the notification area is closed
  const handleNotificationAreaClose = () => {
    onNotificationRead(readNotificationIds);
    setReadNotificationIds([]);
  };

  return (
    <Box
      className="absolute right-0 top-12 z-50 bg-white shadow-lg rounded-lg p-4 transform transition-transform duration-300"
      style={{
        width: "450px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      onMouseLeave={handleNotificationAreaClose}
    >
      <Flex align="center" justify="space-between" mb="sm">
        <Text size="lg">Notifications</Text>
      </Flex>
      <Divider my="sm" />
      <ScrollArea style={{ height: "250px" }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Box
              key={index}
              my="sm"
              onClick={() => handleNotificationClick(index)}
              style={{
                cursor: "pointer",
                backgroundColor: !notification.isRead
                  ? "#f5f6f7"
                  : "transparent",
                padding: "11px",
                borderRadius: "4px",
              }}
            >
              <Flex align="center" justify="space-between">
                <Avatar alt={notification.sender} size="sm" />
                <Box ml="sm" style={{ flex: 1 }}>
                  <Text size="sm">{notification.sender}</Text>
                  <Text size="xs" c="dimmed">
                    {getRelativeTime(notification.createdAt)}
                  </Text>
                  <Text size="md" c="dark">
                    {notification.message}
                  </Text>
                </Box>
                {!notification.isRead && (
                  <Indicator
                    size={8}
                    style={{
                      backgroundColor: "#2196f3",
                      marginRight: "10px",
                    }}
                  />
                )}
              </Flex>
            </Box>
          ))
        ) : (
          <Flex align="center" justify="center" style={{ height: "100%" }}>
            <Text size="sm" c="dimmed">
              No new notifications
            </Text>
          </Flex>
        )}
        {notifications.length > 0 && <Divider my="sm" />}
      </ScrollArea>
    </Box>
  );
};

export default NotificationArea;

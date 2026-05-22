"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext<{
  messages: any[];
  sendMessage: (message: string) => void;
  logout: () => void;
  connectWebSocket: (userId: string) => void;
  clear: () => void;
} | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const connectWebSocket = (userId: string) => {
    const ws = new WebSocket(
      `wss://anonymous-whisper.onrender.com/notification?userId=${userId}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected successfully!");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const messageWithUnread = { ...message };
        setMessages(messageWithUnread);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    const sendMessage = (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    };

    const logout = () => {
      if (socket) {
        socket.close();
      }
      localStorage.removeItem("userId");
    };

    const clear = () => {
      setMessages([]);
    };
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const ws = new WebSocket(
        `wss://anonymous-whisper.onrender.com/notification?userId=${userId}`
      );

      ws.onopen = () => {
        console.log("WebSocket connected successfully!");
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const messageWithUnread = { ...message };
          setMessages([]);
          setMessages(() => [messageWithUnread]);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(ws);
    }
  }, []);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  const logout = () => {
    if (socket) {
      socket.close();
    }
    localStorage.removeItem("userId");
  };

  const clear = () => {
    setMessages([]);
  };

  return (
    <WebSocketContext.Provider
      value={{ messages, sendMessage, logout, clear, connectWebSocket }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

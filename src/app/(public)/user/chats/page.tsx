"use client";
import { useGetChatQuery } from "@/lib/redux/features/chat";
import { Box, Button, Flex, Textarea, Text } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [queryMessage, setQueryMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: res,isSuccess, refetch } = useGetChatQuery(queryMessage, {
    skip: !queryMessage,
  });

  useEffect(() => {
    if (queryMessage) {
      refetch();
    }
  }, [queryMessage, refetch]);

  useEffect(() => {
    if (isSuccess && queryMessage) {
      console.log(res.data)

      const botResponse = res.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Bot", text: botResponse },
      ]);
      setQueryMessage(""); // Reset query message to avoid duplicate queries
    }
  }, [res, queryMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "You", text: newMessage.trim() },
      ]);
      setQueryMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="bg-white min-h-screen p-7 rounded-lg">
      <Flex className="mb-4 justify-between">
        <h1 className="text-3xl font-bold text-blue-600">WhisperBot</h1>
      </Flex>
      <Box className="mb-6">
        <h3 className="text-lg font-medium text-blue-400">Ask me anything</h3>
      </Box>
      <Box
        className="bg-white-100 rounded-lg p-4 mb-4 overflow-y-auto"
        style={{ height: "60vh" }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            mb={2}
            className={`flex ${
              message.user === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <Box
              className={`p-2 rounded ${
                message.user === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <Text>{message.text}</Text>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Flex mt={4} align={"justify-bottom"}>
        <Textarea
          className="flex-grow bg-transparent outline-none text-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          autosize
          minRows={2}
          maxRows={4}
          placeholder="Type your message here..."
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        />
        <Button ml={2} onClick={handleSendMessage} style={{ alignSelf: "center" }}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default Page;

"use client";
import { useGetChatQuery } from "@/lib/redux/features/chat";
import { ActionIcon, Avatar, Box, Button, Flex, Paper, Text, Textarea, Title } from "@mantine/core";
import { IconDots, IconRobot, IconSend, IconSparkles, IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ user: string; text: string; timestamp: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [queryMessage, setQueryMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: res, isSuccess, refetch, isFetching } = useGetChatQuery(queryMessage, {
    skip: !queryMessage,
  });

  useEffect(() => {
    if (queryMessage) {
      refetch();
    }
  }, [queryMessage, refetch]);

  useEffect(() => {
    if (isSuccess && queryMessage) {
      const botResponse = res.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          user: "Bot", 
          text: botResponse, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
      ]);
      setQueryMessage("");
    }
  }, [res, isSuccess, queryMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        user: "You",
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setQueryMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="relative min-h-[calc(100vh-120px)] flex flex-col overflow-hidden bg-background/50 backdrop-blur-xl rounded-2xl border border-border shadow-2xl">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <Box className="relative z-10 px-8 py-6 border-b border-border bg-background/40 backdrop-blur-md">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="md">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center p-2.5 shadow-lg shadow-primary/20">
              <IconRobot className="w-full h-full text-white" />
            </div>
            <div>
              <Title order={3} className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold">
                WhisperBot
              </Title>
              <Flex align="center" gap="xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Text size="xs" c="dimmed" className="font-medium">AI Assistant • Online</Text>
              </Flex>
            </div>
          </Flex>
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
            <IconDots size={20} />
          </ActionIcon>
        </Flex>
      </Box>

      {/* Chat Area */}
      <Box className="relative z-10 flex-1 overflow-y-auto px-8 py-8 space-y-6">
        <AnimatePresence initial={false}>
          {messages.length === 0 && !isFetching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-20"
            >
              <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center">
                <IconSparkles size={40} className="text-primary" />
              </div>
              <div>
                <Title order={2}>Welcome to WhisperBot</Title>
                <Text c="dimmed" className="max-w-md mx-auto">
                  I'm here to help you with your complaints, system information, or any questions you might have. How can I assist you today?
                </Text>
              </div>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex w-full ${message.user === "You" ? "justify-end" : "justify-start"}`}
            >
              <Flex gap="md" align="flex-end" className={message.user === "You" ? "flex-row-reverse" : "flex-row"}>
                <Avatar
                  radius="xl"
                  size="md"
                  className={message.user === "You" ? "bg-primary/10" : "bg-muted"}
                >
                  {message.user === "You" ? <IconUser size={20} className="text-primary" /> : <IconRobot size={20} className="text-primary" />}
                </Avatar>
                
                <div className={`flex flex-col space-y-1 ${message.user === "You" ? "items-end" : "items-start"}`}>
                  <Paper
                    px="lg"
                    py="md"
                    style={{
                      backgroundColor: message.user === "You" ? "var(--primary)" : undefined,
                      maxWidth: "450px",
                      borderRadius: message.user === "You" ? "16px 16px 4px 16px" : "16px 16px 16px 4px"
                    }}
                    className={`shadow-sm ${message.user === "You" ? "" : "bg-muted/70 backdrop-blur-md border border-border"}`}
                  >
                    <Text 
                      size="sm" 
                      className="leading-relaxed whitespace-pre-wrap"
                      style={{ color: "#000" }}
                    >
                      {message.text}
                    </Text>
                  </Paper>
                  <Text size="xs" c="dimmed" className="px-1">
                    {message.timestamp}
                  </Text>
                </div>
              </Flex>
            </motion.div>
          ))}

          {isFetching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <Flex gap="md" align="flex-end">
                <Avatar radius="xl" size="md" className="bg-muted">
                  <IconRobot size={20} className="text-primary" />
                </Avatar>
                <Paper px="md" py="xs" className="bg-muted/70 backdrop-blur-md rounded-2xl rounded-bl-none border border-border">
                  <Flex gap="4px" className="py-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full" 
                    />
                  </Flex>
                </Paper>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box className="relative z-10 px-8 py-6 bg-background/40 backdrop-blur-md border-t border-border">
        <Flex gap="md" align="flex-end">
          <Box className="flex-1 relative">
            <Textarea
              className="w-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.currentTarget.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              autosize
              minRows={1}
              maxRows={4}
              placeholder="Ask me something about your complaints..."
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-muted-light)",
                  border: "1px solid var(--mantine-color-border)",
                  borderRadius: "16px",
                  padding: "16px",
                  paddingRight: "50px",
                  fontSize: "15px",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: "var(--mantine-color-primary-filled)",
                    backgroundColor: "var(--mantine-color-body)",
                  }
                }
              }}
            />
            <div className="absolute right-4 bottom-4">
               <Text size="xs" c="dimmed" className="font-medium">Shift + Enter for new line</Text>
            </div>
          </Box>
          <Button 
            onClick={handleSendMessage} 
            size="lg"
            radius="xl"
            disabled={!newMessage.trim()}
            className="h-[54px] w-[54px] p-0 shadow-lg shadow-primary/25 transition-transform active:scale-95 bg-primary hover:bg-primary/90 flex items-center justify-center"
          >
            <IconSend size={24} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ChatPage;

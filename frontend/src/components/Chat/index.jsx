"use client";
import React, { useState, useEffect, useRef } from "react";
import { HfInference } from "@huggingface/inference";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
  Avatar,
} from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import { Send, X } from "lucide-react";

const client = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

const ChatApp = ({ setIsChatOpen, isChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null); // Reference for chat container

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    let botMessage = { role: "bot", content: "" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    
    const stream = client.chatCompletionStream({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [userMessage],
      temperature: 0.5,
      max_tokens: 512,
      top_p: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        botMessage.content += newContent;
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { ...botMessage },
        ]);
      }
    }
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! 👋 I'm your real estate assistant. Feel free to ask me any questions about real estate in India.",
      },
    ]);
  }, []);

  return (
    <Card
      className={`fixed bottom-28 right-4 w-fit sm:w-96 h-[480px] sm:h-[550px] shadow-xl z-20 dark:bg-black ease-in-out transition-all transform ${
        isChatOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <CardHeader className="flex flex-row items-center">
        {/* <CardTitle>Chat with us</CardTitle> */}
        <Tooltip content="If you close, you will lose the chat" delay={500}>
        <Button variant="light" className="ml-auto" onClick={toggleChat}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        </Tooltip>
      </CardHeader>
      <CardBody className="h-64 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start ${
            msg.role === "user" ? "justify-end" : ""
          } m-1`}
        >
          {msg.role !== "user" && (
            <Avatar
              size='sm'
              className="mr-1 bg-gradient-to-r from-blue-800 to-teal-400 hover:from-blue-900 hover:to-teal-500 dark:from-blue-500 dark:to-teal-300 dark:hover:from-blue-600 dark:hover:to-teal-400 duration-300 ease-in-out"
            />
          )}
          <div
            className={`rounded-xl p-3 ${
              msg.role === "user"
                ? "ml-auto w-fit self-end bg-blue-500 text-right text-white"
                : "mr-auto max-w-[70%] self-start bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
            }`}
            style={{
              borderRadius:
                msg.role === "user"
                  ? "20px 0px 20px 20px"
                  : "0px 20px 20px 20px",
            }}
            ref={msg.role !== "user" ? chatContainerRef : null} // Use the ref only for bot messages
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex w-full">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            onChange={handleInputChange}
            className="mr-2 flex-grow"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatApp;

'use client'
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import ChatApp from '.';
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle the chat widget
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div>
      <Button
        className={`fixed bottom-8 right-4 rounded-full w-4 h-16 bg-primary shadow-lg z-20 transition-all ease-in-out transform ${
          !isChatOpen ? "bg-gradient-to-r from-blue-800 to-teal-400 hover:from-blue-900 hover:to-teal-500 dark:from-blue-500 dark:to-teal-300 dark:hover:from-blue-600 dark:hover:to-teal-400 duration-300 ease-in-out" : 'rotate-180 bg-black dark:bg-white'
        }`}
        onClick={toggleChat}
      >
        {/* Conditional rendering for icons */}
        {isChatOpen ? (
          <X className="w-4 h-4 dark:text-black text-white" />
        ) : (
          <MessageCircle className="w-4 h-4 dark:text-black text-white " />
        )}
        <span className="sr-only">{isChatOpen ? 'Close chat' : 'Open chat'}</span>
      </Button>

      {/* Chat Interface */}
      {isChatOpen && (
        <ChatApp setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      )}
    </div>
  );
}

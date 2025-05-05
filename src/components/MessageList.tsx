
import { useEffect, useRef } from "react";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface MessageListProps {
  messages: MessageType[];
  loading?: boolean;
}

const MessageList = ({ messages, loading = false }: MessageListProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0 && !loading) return null;

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] px-4 py-3 rounded-lg ${
              message.role === "user"
                ? "bg-[#1EAEDB] text-white rounded-tr-none"
                : "bg-[#F2FCE2] text-gray-800 rounded-tl-none"
            }`}
          >
            <p className="whitespace-pre-line">{message.content}</p>
            <div className={`text-xs mt-1 ${message.role === "user" ? "text-blue-200/80" : "text-gray-500"}`}>
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[85%] px-4 py-3 rounded-lg bg-[#F2FCE2] text-gray-800 rounded-tl-none">
            <div className="flex space-x-2 items-center">
              <div className="bg-gray-300 rounded-full h-2 w-2 animate-pulse-opacity"></div>
              <div className="bg-gray-300 rounded-full h-2 w-2 animate-pulse-opacity delay-150"></div>
              <div className="bg-gray-300 rounded-full h-2 w-2 animate-pulse-opacity delay-300"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;

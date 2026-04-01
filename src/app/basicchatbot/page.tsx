"use client";
import { useEffect, useRef, useState } from "react";

interface IMessageData {
  message: string;
  role: "BOT" | "ME";
}

const BasicChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleMessage = (mes: string) => {
    if (!mes.trim() || loading) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { message: mes, role: "ME" },
    ]);

    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { message: "I am Robot 🤖", role: "BOT" },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-3xl h-[95%] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
          
          {/* Push messages to bottom */}
          <div className="flex-1" />

          {messages.map(({ message, role }, index) => (
            <div
              key={index}
              className={`flex ${
                role === "BOT" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow ${
                  role === "BOT"
                    ? "bg-gray-200 text-black rounded-bl-none"
                    : "bg-blue-500 text-white rounded-br-none"
                }`}
              >
                {message}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-gray-200 rounded-2xl rounded-bl-none text-sm animate-pulse">
                Typing...
              </div>
            </div>
          )}

          {/* Scroll target */}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t flex gap-2 bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleMessage(message)}
          />

          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            onClick={() => handleMessage(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicChatBot;
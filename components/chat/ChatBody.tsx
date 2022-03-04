import { useState } from "react";
import { ChatMessage, ChatMessageInput } from "./";

const messages = [
  {
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    name: "Jane Doe",
    message: "Doing good, how about you?",
  },
  {
    name: "John Doe",
    message: "I am doing great, thank you!",
  },
];

export const ChatBody = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  return (
    <div className="h-full rounded mx-4">
      <div className="p-4 bg-backgroundLight text-secondary">
        Chat ({activeUsers.length})
      </div>

      <div className="my-4 p-4 bg-backgroundLight">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>

      <div className="my-4 p-4 bg-backgroundLight">
        <ChatMessageInput />
      </div>
    </div>
  );
};

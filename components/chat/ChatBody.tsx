import { useEffect, useReducer, useRef, useState } from "react";
import { ChatMessage, ChatMessageInput } from "./";
import { v4 as uuidv4 } from "uuid";
import Gun from "gun";
import { useUser } from "hooks";

const gun = Gun({
  peers: ["https://glitch-gun-peer.herokuapp.com/gun"],
});

type Message = {
  id: string;
  userAddress: string;
  value: string;
  createdAt: number;
};

type initialStateType = {
  messages: Message[];
};

const initialState: initialStateType = {
  messages: [],
};

function reducer(state: typeof initialState, message: Message) {
  return {
    messages: [...state.messages, message],
  };
}

type ChatBodyProps = {
  streamId?: string;
};

export const ChatBody = ({ streamId }: ChatBodyProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [messageNumber, setMessageNumber] = useState(0);
  const { address } = useUser();

  const dummy = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (streamId) {
      const gunMessages = gun.get(streamId).get("messages");
      gunMessages.map().once((message) => {
        dispatch(message as any);
      });
    }
  }, [streamId]);

  useEffect(() => {
    if (state.messages) {
      if (messageNumber !== state.messages.length) {
        setMessageNumber(state.messages.length);
        dummy.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [state.messages, messageNumber]);

  const handleNewMessage = (message: string) => {
    if (streamId) {
      const gunMessages = gun.get(streamId).get("messages");
      const newMessage: Message = {
        id: uuidv4(),
        userAddress: address!,
        value: message,
        createdAt: Date.now(),
      };
      gunMessages.set(newMessage);
    }
  };
  return (
    <div className="h-full rounded">
      <div className="p-4 bg-backgroundLight rounded font-bold text-secondary">
        Chat
      </div>

      <div className="my-4 p-4 bg-backgroundLight rounded h-96 overflow-y-auto">
        {state.messages &&
          state.messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        <div ref={dummy} />
      </div>

      <div className="my-4 p-4 bg-backgroundLight rounded">
        <ChatMessageInput onClick={handleNewMessage} />
      </div>
    </div>
  );
};

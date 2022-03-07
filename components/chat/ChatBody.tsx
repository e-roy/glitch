import { useEffect, useReducer, useState } from "react";
import { ChatMessage, ChatMessageInput } from "./";
import { v4 as uuidv4 } from 'uuid';
import Gun from "gun";
import { useAccount } from "wagmi";

const gun = Gun({
  peers: ["https://glitch-gun-peer.herokuapp.com/gun"]
})

type Message = {
  id: string,
  userAddress: string,
  value: string,
  createdAt: number
}

type initialStateType = {
  messages: Message[]
}

const initialState: initialStateType = {
  messages: []
}

function reducer(state: typeof initialState, message: Message) {
  return {
    messages: [...state.messages, message]
  }
}

type ChatBodyProps = {
  streamId?: string
}

export const ChatBody = ({streamId}: ChatBodyProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [{ data: accountData }] = useAccount();

  useEffect(() => {
    if (streamId) {
      const gunMessages = gun.get(streamId).get('messages')
      gunMessages.map().on(message => {
        dispatch(message)
      })
    }
  }, [streamId])

  const handleNewMessage = (message: string) => {
    if (streamId) {
      const gunMessages = gun.get(streamId).get('messages')
      const newMessage: Message = {
        id: uuidv4(),
        userAddress: accountData?.address!,
        value: message,
        createdAt: Date.now()
      }
      gunMessages.set(newMessage)
    }
  }

  return (
    <div className="h-full rounded">
      <div className="p-4 bg-backgroundLight font-bold text-secondary">
        Chat
      </div>

      <div className="my-4 p-4 bg-backgroundLight max-h-96 overflow-y-auto">
        {state.messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>

      <div className="my-4 p-4 bg-backgroundLight">
        <ChatMessageInput onClick={handleNewMessage} />
      </div>
    </div>
  );
};

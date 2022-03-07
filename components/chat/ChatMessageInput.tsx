import { ChangeEvent, useState } from "react";

type ChatMessageInputProps = {
  onClick: (message: string) => void
}

export const ChatMessageInput = ({onClick}: ChatMessageInputProps) => {
  const [message, setMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleClick = () => {
    onClick(message)
    setMessage('')
  }
  return (
    <div className="flex rounded bg-transparent text-backgroundLight">
      <input
        type="text"
        placeholder="message"
        value={message}
        className="bg-backgroundDark/50 rounded text-white border-none focus-none w-full p-2 outline-none focus-visible:outline-secondary"
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick} className="font-black mx-2 p-4 w-20 border border-secondary rounded-lg bg-secondary hover:bg-backgroundLight hover:text-secondary ">
        Send
      </button>
    </div>
  );
};

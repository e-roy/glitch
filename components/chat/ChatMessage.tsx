export type ChatMessageProps = {
  name: string;
  message: string;
};

export const ChatMessage = ({ name, message }: ChatMessageProps) => {
  return (
    <div className="">
      <div className="my-1">{name}</div>
      <div className="rounded p-4 bg-backgroundDark/50 text-secondary">
        {message}
      </div>
    </div>
  );
};

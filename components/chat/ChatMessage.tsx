export type ChatMessageProps = {
  name: string;
  message: string;
};

export const ChatMessage = ({ name, message }: ChatMessageProps) => {
  return (
    <div className="text-sm py-2">
      <div className="my-1">{name}</div>
      <div className="rounded px-4 py-2 bg-backgroundDark/50 text-secondary">
        {message}
      </div>
    </div>
  );
};

import { useEnsLookup } from "wagmi";

type Message = {
  id: string,
  userAddress: string,
  value: string,
  createdAt: number
}

export type ChatMessageProps = {
  message: Message
};

export const ChatMessage = ({message }: ChatMessageProps) => {
  const [{ data: ensData }] = useEnsLookup({
    address: message.userAddress,
  })

  const addressShortener = (address: string) => {
    const displayAddress = `${address.substring(0, 4)}...${address.substring(
      address.length - 4
    )}`.toLowerCase();
    return displayAddress
  };
  return (
    <div className="text-sm py-2">
      <div className="my-1">{ensData ?? addressShortener(message.userAddress)}</div>
      <div className="rounded px-4 py-2 bg-backgroundDark/50 text-secondary">
        {message.value}
      </div>
    </div>
  );
};

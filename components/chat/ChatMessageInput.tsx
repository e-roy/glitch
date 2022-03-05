export const ChatMessageInput = () => {
  return (
    <div className="flex rounded bg-transparent text-backgroundLight hover:text-blue-400">
      <input
        type="text"
        placeholder="message"
        className="bg-backgroundDark/50 rounded text-white border-none focus-none w-full p-2"
      />
      <button className="font-black mx-2 p-4 w-20 border border-secondary rounded-lg bg-secondary hover:bg-backgroundLight ">
        Send
      </button>
    </div>
  );
};

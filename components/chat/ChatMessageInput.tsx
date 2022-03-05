export const ChatMessageInput = () => {
  return (
    <div className="flex rounded bg-transparent text-backgroundLight">
      <input
        type="text"
        placeholder="message"
        className="bg-backgroundDark/50 rounded text-white border-none focus-none w-full p-2 outline-none focus-visible:outline-secondary"
      />
      <button className="font-black mx-2 p-4 w-20 border border-secondary rounded-lg bg-secondary hover:bg-backgroundLight hover:text-secondary ">
        Send
      </button>
    </div>
  );
};

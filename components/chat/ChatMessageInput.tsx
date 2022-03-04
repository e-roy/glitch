export const ChatMessageInput = () => {
  return (
    <div className="flex rounded bg-transparent text-secondary">
      <input
        type="text"
        placeholder="message"
        className="bg-backgroundDark/50 rounded border-none focus-none w-full p-2"
      />
      <button className="mx-2 p-2 w-12 rounded-full bg-backgroundDark/50 hover:bg-backgroundDark/90">
        S
      </button>
    </div>
  );
};

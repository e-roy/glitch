import { Logout } from "../../components/wallet";

export const AppHeader = () => {
  return (
    <header className="w-full p-3 flex justify-between items-center fixed top-0 left-0 z-10 bg-white">
      <h1 className="font-bold text-xl">Glitch App</h1>
      <Logout />
    </header>
  );
};

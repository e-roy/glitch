import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ConnectWallet, SIWE } from "../components/wallet";

const App: NextPage = () => {
  const [{ data: accountData }] = useAccount();

  return (
    <main className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
      <header className="w-full p-3 flex justify-between items-center fixed top-0 left-0 z-10 bg-white">
        <h1 className="font-bold text-xl">Glitch App</h1>
        {accountData ? <SIWE /> : <ConnectWallet />}
      </header>
      <div>landing page</div>
      <footer className="fixed bottom-0 left-0 w-full h-12 flex items-center justify-center"></footer>
    </main>
  );
};

export default App;

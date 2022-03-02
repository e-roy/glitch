import { WebsiteLayout } from "components/layout";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ConnectWallet, SIWE } from "../components/wallet";

const App: NextPage = () => {
  return (
    <WebsiteLayout>
        <div>landing page</div>
        <footer className="fixed bottom-0 left-0 w-full h-12 flex items-center justify-center"></footer>
    </WebsiteLayout>
  );
};

export default App;

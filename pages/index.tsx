import { WebsiteLayout } from "components/layout";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ConnectWallet, SIWE } from "../components/wallet";

const App: NextPage = () => {
  return (
    <WebsiteLayout>
        <div>landing page</div>
    </WebsiteLayout>
  );
};

export default App;

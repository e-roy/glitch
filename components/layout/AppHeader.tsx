import { useAccount } from "wagmi";
import { ConnectWallet, Logout, SIWE } from "../../components/wallet";
import { useUser } from "hooks";
import { useCallback } from "react";

export const AppHeader = () => {
  const [{ data: accountData }] = useAccount();
  const { address: user } = useUser()

  const authButton = useCallback(() => {
    if (user) {
      return (
        <Logout />
      )
    } else {
      return accountData ? <SIWE /> : <ConnectWallet />
    }
  }, [user, accountData])

  return (
    <header className="w-full p-3 flex justify-between items-center fixed top-0 left-0 z-10 bg-white">
      <h1 className="font-bold text-xl">Glitch App</h1>
      
      {authButton()}
    </header>
  );
};
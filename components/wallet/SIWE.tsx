import { useSignMessage, useAccount, useNetwork } from "wagmi";
import { SiweMessage } from "siwe";
import { useRouter } from "next/router";

export const SIWE = () => {
  const router = useRouter();
  const [{}, signMessage] = useSignMessage();

  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();
  const handleSignIn = async () => {
    try {
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;
      const nonceRes = await fetch("/api/wallet/nonce");

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({
        message: message.prepareMessage(),
      });
      if (signRes.error) throw signRes.error;

      // Verify signature
      const verifyRes = await fetch("/api/wallet/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature: signRes.data }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return "";
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  return (
    <button
    className="px-8 py-4 border text-secondary border-secondary rounded bg-backgroundLight hover:bg-secondary hover:text-backgroundDark"
      onClick={() => handleSignIn()}
    >
      Sign In with {formatAddress(accountData?.address)}
    </button>
  );
};

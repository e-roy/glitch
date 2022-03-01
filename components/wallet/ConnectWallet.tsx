import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../elements";
import { useConnect } from "wagmi";
import metamaskLogo from "./metamask-logo.png";
import walletConnectLogo from "./walletconnect-logo.png";

export const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    {
      data: { connector, connectors },
      loading,
    },
    connect,
  ] = useConnect();

  const handleConnectWallet = async (connector: any) => {
    connect(connector);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="p-2 border border-gray-600 rounded bg-sky-300 hover:bg-sky-400"
        onClick={() => setIsModalOpen(true)}
      >
        Connect Wallet
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white">
          {connectors.map((x) => (
            <button
              className={
                "hover:bg-gray-100 text-gray-700 p-4 w-full rounded outline-0"
              }
              disabled={!x.ready}
              key={x.name}
              onClick={() => handleConnectWallet(x)}
            >
              <div>
                {x.name === "MetaMask" && (
                  <Image
                    src={metamaskLogo}
                    width={50}
                    height={50}
                    alt="MetaMask"
                    className="mx-auto"
                  />
                )}
                {x.name === "WalletConnect" && (
                  <Image
                    src={walletConnectLogo}
                    width={50}
                    height={50}
                    alt="Wallet Connect"
                    className="mx-auto"
                  />
                )}
              </div>
              <div className={"text-gray-900 text-3xl font-bold my-4"}>
                {x.name}
              </div>
              <div className={"text-gray-400 font-regular text-xl my-4"}>
                {x.name === "MetaMask" && "Connect to your MetaMask Wallet"}
                {x.name === "WalletConnect" &&
                  "Scan with WalletConnect to connect"}
              </div>
              <div>
                {!x.ready && " (unsupported)"}
                {loading && x.name === connector?.name && "…"}
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

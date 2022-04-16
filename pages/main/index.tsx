import { withIronSessionSsr } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import type { NextPage } from "next";
import { ironOptions } from "@/lib/session";
import { AppLayout } from "@/components/layout";
import { NftCard } from "@/components/cards/NftCard";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

const contracts = ["0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"];

export type MainPageProps = {
  matchedNfts: Array<string>;
};

const MainPage: NextPage<MainPageProps> = ({ matchedNfts }) => {
  return (
    <AppLayout sections={[{ name: "Dashboard" }]}>
      <div className="m-4">
        <div className="flex flex-wrap">
          {matchedNfts.map((nft, index) => (
            <div
              key={index}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 my-4"
            >
              <NftCard nft={nft} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default MainPage;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  if (req.session.siwe === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // get logged in user
  const userAddress = req.session.siwe.address;
  // get user's ethereum NFTs
  const ethNfts = await alchemyETH.alchemy.getNfts({
    owner: userAddress,
  });
  // filter matching NFTs tokens for Contract
  const matchedNfts = ethNfts.ownedNfts.filter((nft: any) => {
    return nft.contract.address === contracts[0];
  });

  return {
    props: { matchedNfts },
  };
},
ironOptions as IronSessionOptions);

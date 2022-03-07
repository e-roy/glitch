import { AppLayout } from "components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import type { NextPage } from "next";
import Link from "next/link";
import { ironOptions, withSession } from "lib/session";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

import Image from "next/image";
import videocam from "./video-cam.png";
import streamimg from "./stream-img.png";

export type DashboardPageProps = {
  contractAddress: string;
};

const DashboardPage: NextPage<DashboardPageProps> = ({ contractAddress }) => {
  return (
    <AppLayout sections={[{ name: "Dashboard" }]}>
      <div className="m-4 flex justify-center">
        <div className="bg-backgroundLight grid place-items-center p-10 rounded-xl">
          <Image
            src={videocam}
            width={150}
            height={150}
            alt="Video Cam"
            className="rounded-lg"
          />
          <Link href={`/videolist/${contractAddress}`}>
            <button className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              View Stream
            </button>
          </Link>
        </div>

        <div className="bg-backgroundLight grid place-items-center ml-20 p-10 rounded-xl">
          <Image
            src={streamimg}
            width={150}
            height={150}
            alt="Stream Img"
            className="rounded-lg"
          />

          <Link href={`/creator/${contractAddress}`}>
            <button className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              Create Stream
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  params,
}) {
  if (req.session.siwe === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // set contract address
  const contractAddress = params?.id;
  // get logged in user
  const userAddress = req.session.siwe.address;
  // get user's ethereum NFTs
  const ethNfts = await alchemyETH.alchemy.getNfts({
    owner: userAddress,
  });
  // filter matching NFTs tokens for Contract
  const matchedNfts = ethNfts.ownedNfts.filter((nft: any) => {
    return nft.contract.address === contractAddress;
  });
  // if user doesn't have an nft in this contract redirect the user
  if (matchedNfts.length === 0) {
    // console.log("no nft found");
    return {
      redirect: {
        destination: "/noaccess",
        permanent: false,
      },
    };
  }

  return {
    props: { contractAddress },
  };
},
ironOptions as IronSessionOptions);

import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { ironOptions } from "lib/session";
import { AppLayout } from "../../components/layout";
import { StreamCard } from "../../components/cards";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

const streams = [
  {
    id: "1",
    title: "Stream 1",
    description: "Stream 1 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "1",
    playbackId: "1",
    type: "recordings",
  },
  {
    id: "2",
    title: "Stream 2",
    description: "Stream 2 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "2",
    playbackId: "2",
    type: "recordings",
  },
  {
    id: "3",
    title: "Stream 3",
    description: "Stream 3 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "3",
    playbackId: "3",
    type: "recordings",
  },
  {
    id: "4",
    title: "Stream 4",
    description: "Stream 4 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "4",
    playbackId: "4",
    type: "hls",
  },
  {
    id: "5",
    title: "Stream 5",
    description: "Stream 5 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "5",
    playbackId: "5",
    type: "hls",
  },
];

export type VideoListPageProps = {};

const VideoListPage: NextPage<VideoListPageProps> = ({}) => {
  return (
    <AppLayout sections={[{ name: "User Feed" }]}>
      <div className="mx-24">
        <div className="m-4 text-secondary text-2xl font-bold">
          Streams to Watch
        </div>
        <div className="flex flex-wrap">
          {streams.map((stream, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 my-4">
              <StreamCard stream={stream} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoListPage;

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
  const contractAddress = params.id;
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
ironOptions);

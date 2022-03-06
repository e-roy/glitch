import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { ironOptions } from "lib/session";
import { AppLayout } from "../../components/layout";
import { StreamCard } from "../../components/cards";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useEffect, useReducer } from "react";
import { useHash } from "hooks";
import Gun from "gun";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

export type VideoListPageProps = {
  contractAddress: string;
};

const gun = Gun({
  peers: ["https://glitch-gun-peer.herokuapp.com/gun"],
});

type Stream = {
  id: string;
  title?: string;
  description?: string;
  playbackId: string;
  record: boolean | null;
  active: boolean | null;
  createdAt: number;
};

type initialStateType = {
  streams: Stream[];
};

const initialState: initialStateType = {
  streams: [],
};

const reducer = (state: typeof initialState, streams: Stream[]) => {
  return {
    streams: streams,
  };
};

const VideoListPage: NextPage<VideoListPageProps> = ({ contractAddress }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { hashedAddress } = useHash({ address: contractAddress });

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log("runs on first load");
    const sub = () => {
      const streams = gun.get("contracts").get(hashedAddress).get("streams");
      const tempStreams: Stream[] = [];
      streams.map().on((data: Stream) => {
        if (
          (data.active || data.record) &&
          !tempStreams.find((s) => s.id === data.id)
        ) {
          tempStreams.push(data);
        }
      });
      dispatch(tempStreams);
    };
    sub();
  }, [hashedAddress]);

  return (
    <AppLayout sections={[{ name: "User Feed" }]}>
      <div className="mx-24">
        <div className="m-4 text-secondary text-2xl font-bold">
          Streams to Watch
        </div>
        <div className="flex flex-wrap">
          {state.streams.map((stream, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 my-4">
              <StreamCard stream={stream} contractAddress={contractAddress} />
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

import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
// import dynamic from "next/dynamic";

import { ironOptions } from "@/lib/session";
import { AppLayout } from "@/components/layout";
import { StreamCard } from "@/components/cards";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useEffect, useReducer } from "react";
import { useHash } from "hooks";
import Gun from "gun";
import { getStreamStatus } from "@/utils/apiFactory";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

// // @ts-ignore
// const Gun = dynamic(
//   // @ts-ignore
//   () => import("gun"),
//   {
//     ssr: false,
//   }
// );

export type VideoListPageProps = {
  contractAddress: string;
};

// const gun = Gun({
//   peers: ["https://glitch-gun-peer.herokuapp.com/gun"],
// });

type Stream = {
  id: string;
  name?: string;
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

const reducer = (state: typeof initialState, stream: Stream) => {
  return {
    streams: [...state.streams, stream],
  };
};

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

const VideoListPage: NextPage<VideoListPageProps> = ({ contractAddress }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { hashedAddress } = useHash({ address: contractAddress });
  // console.log(contractAddress);
  // console.log(hashedAddress);

  const gun = Gun({
    peers: ["https://glitch-gun-peer.herokuapp.com/gun"],
  });

  useEffect(() => {
    if (hashedAddress && gun) fetchStreams();
  }, [hashedAddress]);

  const fetchStreams = async () => {
    // console.log("fetching streams");
    const streams = gun.get("contracts").get(hashedAddress).get("streams");
    // console.log(streams);
    streams
      .once()
      .map()
      .once((data?: Stream | Object) => {
        if (
          data &&
          "active" in data &&
          (data?.active || data?.record) &&
          !state.streams.find((s) => s.id === data.id)
        ) {
          // console.log("adding stream");
          checkActive(data).then((active) => {
            // console.log(data);
            if (active || data.record) {
              dispatch({ ...data, active });
            }
          });
        }
      });
  };

  const checkActive = async (stream: Stream) => {
    try {
      const streamStatusResponse = await getStreamStatus(
        livepeerApi,
        stream.id
      );

      const { isActive } = streamStatusResponse.data;

      if (!isActive) handleEndSession(stream);
      return isActive;
    } catch (e) {
      console.warn(e);
      handleEndSession(stream);
      return false;
    }
  };

  const handleEndSession = (stream: Stream) => {
    gun.get(stream.id).put({
      active: false,
    });
  };

  // console.log(state.streams);

  return (
    <AppLayout sections={[{ name: "User Feed" }]}>
      <div className="mx-24">
        <div className="flex justify-between">
          <div className="m-4 text-secondary text-2xl font-bold">
            Streams to Watch
          </div>
          <button
            className="self-center border border-secondary p-2 h-10 rounded font-semibold text-secondary hover:bg-secondary hover:text-backgroundDark"
            onClick={() => fetchStreams()}
          >
            refresh
          </button>
        </div>
        <div className="flex flex-wrap">
          {state.streams &&
            state.streams
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((stream, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 my-4"
                >
                  <StreamCard
                    stream={stream}
                    contractAddress={contractAddress}
                  />
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
ironOptions);

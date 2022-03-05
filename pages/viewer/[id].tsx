import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
import { AppLayout } from "../../components/layout";
import { VideoPlayer } from "../../components/video";
import { ChatBody } from "../../components/chat";
import { getStreamStatus, getSessionData } from "../../utils/apiFactory";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const testContract = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

const testStreamId = "e37c76ec-fa73-468b-80c9-d34540465144";
const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

export type ViewerPageProps = {
  video: IVideoItem;
};

export interface IVideoItem {
  id: string;
  confirmed: boolean;
}

const ViewerPage: NextPage<ViewerPageProps> = ({ video }) => {
  const [userInput, setUserInput] = useState("");
  const [playbackId, setPlaybackId] = useState<string>("");

  const handleCheckStream = () => {
    console.log("check stream");
    setPlaybackId(userInput);
  };

  // useEffect(() => {
  //   const checkStream = async () => {
  //     const streamStatusResponse = await getStreamStatus(
  //       livepeerApi,
  //       testStreamId
  //     );
  //     console.log("streamStatusResponse", streamStatusResponse);
  //     const sessionResponse = await getSessionData(livepeerApi, testStreamId);
  //     console.log("sessionResponse", sessionResponse);
  //   };
  //   checkStream();
  // }, [testStreamId]);

  return (
    <AppLayout sections={[{ name: "Creator" }]}>
      <div className="m-4">
        {video.confirmed && (
          <div className="md:flex">
            <div className="md:w-3/5">
              <VideoPlayer playbackId={playbackId} streamIsActive={true} />
              <div className="flex my-8">
                <div className="w-full mr-4">
                  <label htmlFor="playback-input" className="text-lg">
                    Playback ID
                  </label>
                  <br />
                  <input
                    id="playback-input"
                    className="border px-2 py-1 w-full rounded-lg text-stone-800"
                    type="text"
                    value={userInput}
                    placeholder="Enter Playback Id"
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </div>
                <button
                  className="font-bold px-10 py-2 mx-auto border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark"
                  onClick={() => handleCheckStream()}
                >
                  check stream
                </button>
              </div>
            </div>
            <div className="md:w-2/5 md:pl-4 lg:pl-16">
              <ChatBody />
            </div>
          </div>
        )}
        {!video.confirmed && (
          <div>sorry you don't have access to this video</div>
        )}
      </div>
    </AppLayout>
  );
};

export default ViewerPage;

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
    return nft.contract.address === testContract;
  });

  let video = {
    id: "",
    confirmed: false,
  };

  if (matchedNfts.length > 0) video.confirmed = true;

  return {
    props: { video },
  };
},
ironOptions);

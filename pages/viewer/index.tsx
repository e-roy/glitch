import type { NextPage } from "next";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
import { AppLayout, WebsiteLayout } from "../../components/layout";
import { VideoPlayback } from "../../components/video";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const testContract = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

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

  return (

    <AppLayout sections={[{name: 'Creator'}]}>
      <div className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
       
     {video.confirmed && (
        <div>
          <h2>Playback Id : {playbackId}</h2>
          <div className="flex my-4">
            <input
              className="border px-2 py-1 rounded-lg"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="border m-2 p-2 rounded bg-sky-200 hover:bg-sky-400"
              onClick={() => handleCheckStream()}
            >
              check stream
            </button>
          </div>

          <VideoPlayback playbackId={playbackId} streamIsActive={true} />
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

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "lib/session";
import { AppLayout } from "components/layout";
import { VideoPlayer } from "components/video";
import { ChatBody } from "components/chat";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getSessionData } from "utils/apiFactory";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

export type ViewerPageProps = {};

const ViewerPage: NextPage<ViewerPageProps> = ({}) => {
  const router = useRouter();
  const { streamId, playbackId, type } = router.query;
  const [sessionId, setSessionId] = useState<string>()
  const [playbackType, setPlaybackType] = useState<string>("");

  const [refreshStream, setRefreshStream] = useState(false);
  const handleToggleStream = () => {
    setRefreshStream(!refreshStream);
  };

  useEffect(() => {
    if (type) {
      if (type === "recordings") {
        getRecordings()
      } else {
        setPlaybackType(type as string);
      }
    }
  }, [type]);

  const getRecordings = async () => {
    try {
      const res = await getSessionData(livepeerApi, streamId as string)
      console.log(res.data?.[0])
      setSessionId(`${type}/${res?.data?.[0]?.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AppLayout sections={[{ name: "Watch" }]}>
      <div className="m-4">
        <div className="md:flex">
          <div className="md:w-3/5">
            {playbackId && playbackType && (
              <div>
                <div className="flex justify-between my-2">
                  <div className="text-secondary font-bold text-lg">
                    STREAMING PREVIEW
                  </div>
                  <button
                    className="border border-secondary p-1 rounded font-semibold text-secondary hover:bg-secondary hover:text-backgroundDark"
                    onClick={() => handleToggleStream()}
                  >
                    refresh video
                  </button>
                </div>

                <VideoPlayer
                  playbackId={sessionId ? sessionId : `${playbackType}/${playbackId}`}
                  streamIsActive={true}
                  refreshStream={refreshStream}
                />
              </div>
            )}
          </div>
          <div className="md:w-2/5 md:pl-4 lg:pl-16">
            <ChatBody streamId={streamId as string}/>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ViewerPage;

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
    props: {},
  };
},
ironOptions);

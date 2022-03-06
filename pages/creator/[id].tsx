import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { useState, useEffect, useReducer } from "react";
import { ironOptions } from "lib/session";
import { AppLayout } from "components/layout";
import { WebCam } from "components/creator";
import { ChatBody } from "components/chat";
import { createStream, getStreamStatus } from "utils/apiFactory";
import { APP_STATES } from "utils/types";
import { VideoPlayer } from "components/video";
import Gun from "gun";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useHash } from "hooks";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

const gun = Gun({
  peers: ["https://glitch-gun-peer.herokuapp.com/gun"],
});

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

const INITIAL_STATE = {
  appState: APP_STATES.CREATE_BUTTON,
  apiKey: livepeerApi,
  name: "",
  streamId: null,
  playbackId: null,
  streamKey: null,
  streamIsActive: false,
  sourceSegments: 0,
  error: null,
  record: false,
  createdAt: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CREATE_CLICKED":
      return {
        ...state,
        appState: APP_STATES.CREATING_STREAM,
      };
    case "STREAM_CREATED":
      return {
        ...state,
        appState: APP_STATES.WAITING_FOR_VIDEO,
        streamId: action.payload.streamId,
        playbackId: action.payload.playbackId,
        streamKey: action.payload.streamKey,
        name: action.payload.name,
        createdAt: action.payload.createdAt,
      };
    case "SET_RECORD":
      return {
        ...state,
        record: action.payload.record,
      };
    case "VIDEO_STARTED":
      return {
        ...state,
        appState: APP_STATES.SHOW_VIDEO,
        streamIsActive: true,
      };
    case "VIDEO_STOPPED":
      return {
        ...state,
        appState: APP_STATES.WAITING_FOR_VIDEO,
        streamIsActive: false,
      };
    case "RESET_DEMO_CLICKED":
      return {
        ...INITIAL_STATE,
      };
    default:
      break;
  }
};

type CreatorPageProps = {
  contractAddress: string;
};

const CreatorPage: NextPage<CreatorPageProps> = ({ contractAddress }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { hashedAddress } = useHash({ address: contractAddress });
  useEffect(() => {
    if (state.appState === APP_STATES.CREATING_STREAM) {
      // console.log("creating stream");
      (async function () {
        try {
          const streamCreateResponse = await createStream(state.apiKey);
          if (streamCreateResponse.data) {
            const {
              id: streamId,
              playbackId,
              streamKey,
              name,
              createdAt,
            } = streamCreateResponse.data;
            dispatch({
              type: "STREAM_CREATED",
              payload: {
                streamId,
                playbackId,
                streamKey,
                name,
                createdAt,
              },
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }

    let interval: any;
    if (state.streamId) {
      // console.log("state streamId", state.streamId);
      interval = setInterval(async () => {
        const streamStatusResponse = await getStreamStatus(
          state.apiKey,
          state.streamId
        );
        if (streamStatusResponse.data) {
          const { isActive, record } = streamStatusResponse.data;
          if (state.appState !== 4 && isActive) {
            dispatch({
              type: "VIDEO_STARTED",
            });
          }
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.appState]);

  const [refreshStream, setRefreshStream] = useState(false);
  const handleToggleStream = () => {
    // console.log("refreshStream", refreshStream);
    setRefreshStream(!refreshStream);
  };

  const handleStartSession = async () => {
    const { streamId: id, record, createdAt, name, playbackId } = state;

    console.log("state", state);

    const stream = gun.get(state.streamId).put({
      id,
      name,
      playbackId,
      record,
      active: true,
      createdAt,
    });

    gun.get("contracts").get(hashedAddress).get("streams").set(stream);
  };

  const handleEndSession = () => {
    gun.get(state.streamId).put({
      active: false,
    });
  };

  const handleRecordState = (record: boolean) => {
    dispatch({
      type: "SET_RECORD",
      payload: {
        record,
      },
    });
  };

  return (
    <AppLayout sections={[{ name: "Creator" }]}>
      <div className="md:flex m-4 mb-12">
        <div className="md:w-3/5 mb-8 md:mb-0 xl:mx-4 2xl:mx-8">
          <div className="my-2 text-secondary font-bold text-lg">
            CASTING PREVIEW
          </div>
          <WebCam
            streamKey={state.streamKey}
            streamId={state.streamId}
            createNewStream={() => dispatch({ type: "CREATE_CLICKED" })}
            closeStream={() => dispatch({ type: "RESET_DEMO_CLICKED" })}
            startSession={() => {
              handleStartSession();
            }}
            endSession={() => {
              handleEndSession();
            }}
            handleRecordState={handleRecordState}
          />
        </div>
        <div className="md:w-2/5 md:pl-4 lg:pl-16 xl:mx-4 2xl:mx-8">
          <ChatBody />
        </div>
      </div>
      {state.appState === APP_STATES.SHOW_VIDEO && (
        <div className="m-4">
          <div className="flex my-2  justify-between">
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
            playbackId={`hls/${state.playbackId}`}
            streamIsActive={state.streamIsActive}
            refreshStream={refreshStream}
          />
        </div>
      )}
    </AppLayout>
  );
};

export default CreatorPage;

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

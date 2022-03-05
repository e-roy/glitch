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

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

const INITIAL_STATE = {
  appState: APP_STATES.CREATE_BUTTON,
  apiKey: livepeerApi,
  streamId: null,
  playbackId: null,
  streamKey: null,
  streamIsActive: false,
  sourceSegments: 0,
  error: null,
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

const CreatorPage: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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
            } = streamCreateResponse.data;
            dispatch({
              type: "STREAM_CREATED",
              payload: {
                streamId,
                playbackId,
                streamKey,
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
          // console.log("streamStatusResponse", streamStatusResponse.data);

          const { isActive } = streamStatusResponse.data;
          if (state.appState !== 4 && isActive)
            dispatch({
              type: "VIDEO_STARTED",
            });
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
            playbackId={state.playbackId}
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
}) {
  if (req.session.siwe === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
},
ironOptions);

import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { useState, useEffect, useReducer } from "react";
import { AppBody } from "../../components/creator";
import { AppLayout } from "../../components/layout";
import { ironOptions } from "../../lib/session";
import { WebCam } from "../../components/video";
import { ChatBody } from "../../components/chat";
import { createStream, getStreamStatus } from "../../utils/apiFactory";
import { APP_STATES } from "../../utils/types";

const INITIAL_STATE = {
  appState: APP_STATES.API_KEY,
  apiKey: null,
  streamId: null,
  playbackId: null,
  streamKey: null,
  streamIsActive: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_API_KEY":
      return {
        ...state,
        appState: APP_STATES.CREATE_BUTTON,
        apiKey: action.payload.apiKey,
      };
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
    case "INVALID_API_KEY":
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      break;
  }
};

const CreatorPage: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [streamKey, setStreamKey] = useState(null);
  // const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API;
  // console.log(livepeerApi);

  // useEffect(() => {
  //   console.log("streamKey", streamKey);
  // }, [streamKey]);

  useEffect(() => {
    if (state.appState === APP_STATES.CREATING_STREAM) {
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

    let interval;
    if (state.streamId) {
      interval = setInterval(async () => {
        const streamStatusResponse = await getStreamStatus(
          state.apiKey,
          state.streamId
        );
        if (streamStatusResponse.data) {
          const { isActive } = streamStatusResponse.data;
          dispatch({
            type: isActive ? "VIDEO_STARTED" : "VIDEO_STOPPED",
          });
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.appState]);

  return (
    <AppLayout sections={[{ name: "Creator" }]}>
      <div className="md:flex m-4 mb-12">
        <div className="md:w-3/5">
          <WebCam streamKey={streamKey} />
        </div>
        <div className="md:w-2/5 md:pl-4 lg:pl-16">
          <ChatBody />
        </div>
      </div>

      <AppBody
        state={state}
        setApiKey={(apiKey) =>
          dispatch({ type: "SUBMIT_API_KEY", payload: { apiKey } })
        }
        createStream={() => dispatch({ type: "CREATE_CLICKED" })}
        setStreamKey={setStreamKey}
      />
      <div className="bottom-0 left-0 w-full h-20 flex items-center justify-center">
        <button
          className="border p-2 h-1/2 rounded border-livepeer hover:bg-livepeer hover:text-white"
          onClick={() => dispatch({ type: "RESET_DEMO_CLICKED" })}
        >
          Reset Demo
        </button>
      </div>
      {state.error && (
        <div className="bg-black bg-opacity-60 flex items-center justify-center fixed top-0 left-0 h-screen w-screen">
          <div className="flex flex-col w-1/3 h-56 bg-white p-12 items-center text-center text-lg rounded">
            {state.error}
            <button
              className="border p-2 w-1/3 rounded border-livepeer hover:bg-livepeer hover:text-white mt-4"
              onClick={() => dispatch({ type: "RESET_DEMO_CLICKED" })}
            >
              Retry
            </button>
          </div>
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

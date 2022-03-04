import React from "react";

import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

import { APP_STATES } from "../../utils/types";

interface Props {
  state: any;
  setStreamKey: (streamKey: string) => void;
}

const copyTextToClipboard = (text: string) => {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(text);
    }
  });
};

export const AppBody: React.FC<Props> = ({ state, setStreamKey }) => {
  const { playbackId, streamIsActive, streamKey } = state;
  const [showRequest, setShowRequest] = React.useState(false);
  const [videoEl, setVideoEl] = React.useState(null);

  React.useEffect(() => {
    // console.log(streamKey);
    setStreamKey(streamKey);
  }, [streamKey]);

  // React.useEffect(() => {
  //   console.log("playbackId", playbackId);
  //   console.log("streamIsActive", streamIsActive);
  // }, [playbackId, streamIsActive]);

  const onVideo = React.useCallback((el) => {
    setVideoEl(el);
  }, []);

  React.useEffect(() => {
    if (videoEl == null) return;
    if (streamIsActive && playbackId) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });
    }
  }, [streamIsActive]);

  switch (state.appState) {
    case APP_STATES.CREATING_STREAM:
      return (
        <div className="w-full h-3/5 flex flex-col items-center justify-center">
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-livepeer border-r-0 border-b-0 mb-8"></div>
          Creating stream...
        </div>
      );
    case APP_STATES.WAITING_FOR_VIDEO:
    case APP_STATES.SHOW_VIDEO:
      const headers = JSON.stringify(
        {
          "content-type": "application/json",
          authorization: `Bearer ${state.apiKey}`,
        },
        undefined,
        2
      );
      const body = JSON.stringify(
        {
          name: "test_stream",
          profiles: [
            {
              name: "720p",
              bitrate: 2000000,
              fps: 30,
              width: 1280,
              height: 720,
            },
            {
              name: "480p",
              bitrate: 1000000,
              fps: 30,
              width: 854,
              height: 480,
            },
            {
              name: "360p",
              bitrate: 500000,
              fps: 30,
              width: 640,
              height: 360,
            },
          ],
        },
        undefined,
        2
      );
      const response = JSON.stringify(
        {
          isActive: false,
          streamKey: state.streamKey,
          playbackId: state.playbackId,
        },
        undefined,
        2
      );
      return (
        <div className="container w-full flex flex-col items-center overflow-auto mx-auto pb-14">
          <div className="relative bg-black h-56 lg:h-96 w-full xl:w-3/5 overflow-hidden">
            <div data-vjs-player>
              <video
                id="video"
                ref={onVideo}
                className="h-full w-full video-js vjs-theme-city"
                controls
                playsInline
              />
            </div>
            <div className="bg-white text-stone-700 rounded-xl flex items-center justify-center absolute right-2 top-2 p-1 text-xs">
              <div
                className={`animate-pulse ${
                  streamIsActive ? "bg-green-700" : "bg-yellow-600"
                } h-2 w-2 mr-2 rounded-full`}
              ></div>
              {streamIsActive ? "Live" : "Waiting for Video"}
            </div>
          </div>

          <div className="w-11/12 lg:w-full xl:w-3/5 border border-dashed p-2 m-4 flex flex-col text-sm">
            <div className="flex items-center justify-between mt-2 break-all">
              <span>
                Playback ID:
                <br />
                {playbackId}
              </span>
              <button
                onClick={() => copyTextToClipboard(`${playbackId}`)}
                className="border ml-1 p-1 rounded text-sm break-normal"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="w-11/12 lg:w-full xl:w-3/5 flex flex-col items-center mt-8">
            <button
              onClick={() => setShowRequest((val) => !val)}
              className="text-gray-500 text-sm text-center w-full mb-2"
            >
              {showRequest ? "Hide" : "Show"} POST /stream request creating a
              stream{" "}
              <span className="text-xs">
                {showRequest ? <>&#9650;</> : <>&#9660;</>}
              </span>{" "}
            </button>
            {showRequest && (
              <>
                <fieldset className="w-full md:w-2/3 text-sm border border-dashed border-gray p-4 rounded flex flex-col">
                  <legend>Request</legend>
                  <div className="text-xs">
                    Headers: <br />
                    <textarea
                      rows={5}
                      cols={30}
                      value={headers}
                      disabled
                      className="w-full resize-none leading-5"
                      style={{
                        fontFamily: "Lucida Console, Monospace",
                      }}
                    />
                  </div>
                  <div className="text-xs mt-8">
                    Body: <br />
                    <textarea
                      rows={26}
                      cols={30}
                      value={body}
                      disabled
                      className="w-full resize-none leading-5"
                      style={{
                        fontFamily: "Lucida Console, Monospace",
                      }}
                    />
                  </div>
                </fieldset>
                <fieldset className="w-full md:w-2/3 text-sm border border-dashed border-gray p-4 rounded flex flex-col">
                  <legend>Response</legend>
                  <div className="text-xs">
                    <textarea
                      rows={5}
                      cols={30}
                      value={response}
                      disabled
                      className="w-full resize-none leading-5"
                      style={{
                        fontFamily: "Lucida Console, Monospace",
                      }}
                    />
                  </div>
                </fieldset>
              </>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default AppBody;
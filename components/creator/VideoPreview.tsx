import React from "react";

import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

import { APP_STATES } from "utils/types";

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

export const VideoPreview: React.FC<Props> = ({ state, setStreamKey }) => {
  const { playbackId, streamIsActive, streamKey } = state;
  const [videoEl, setVideoEl] = React.useState(null);

  React.useEffect(() => {
    setStreamKey(streamKey);
  }, [streamKey]);

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
      if (player) {
        player.hlsQualitySelector();

        player.on("error", () => {
          player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
        });
      }
    }
  }, [streamIsActive]);

  switch (state.appState) {
    case APP_STATES.WAITING_FOR_VIDEO:
    case APP_STATES.SHOW_VIDEO:
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
        </div>
      );
    default:
      return null;
  }
};

export default VideoPreview;

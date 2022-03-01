import { useState, useEffect, useCallback } from "react";
import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

export type VideoPlaybackProps = {
  video: IVideoItem;
};

export interface IVideoItem {
  id: string;
  confirmed: boolean;
}

export const VideoPlayback = ({ video }: VideoPlaybackProps) => {
  const [videoEl, setVideoEl] = useState(null);
  const streamIsActive = true;

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    if (streamIsActive && video.id) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${video.id}/index.m3u8`,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${video.id}/index.m3u8`);
      });
    }
  }, [video]);

  return (
    <div>
      <div data-vjs-player>
        <video
          id="video"
          ref={onVideo}
          className="h-full w-full video-js vjs-theme-city"
          controls
          playsInline
        />
      </div>
    </div>
  );
};

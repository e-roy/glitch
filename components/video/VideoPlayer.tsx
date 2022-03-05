import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";
import "plyr-react/dist/plyr.css";

export type VideoPlayerProps = {
  playbackId: string | null;
  streamIsActive?: boolean;
  refreshStream?: boolean;
};

export const VideoPlayer = ({
  playbackId,
  streamIsActive,
  refreshStream,
}: VideoPlayerProps) => {
  const ref = useRef<APITypes>(null);
  useEffect(() => {
    if (playbackId) {
      const loadVideo = async () => {
        const video = document.getElementById("plyr") as HTMLVideoElement;
        var hls = new Hls();
        hls.loadSource(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
        hls.attachMedia(video);
        // @ts-ignore
        ref.current!.plyr.media = video;

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          const playPromise = (ref.current!.plyr as PlyrInstance).play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                // Automatic playback started!
                // Show playing UI.
                console.log("Automatic playback started!");
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
                console.log("ERROR:", error);
              });
          }
        });
      };
      loadVideo();
    }
  }, [playbackId, refreshStream]);

  return (
    <Plyr
      id="plyr"
      options={{ volume: 0.1, autoplay: true }}
      source={{} as PlyrProps["source"]}
      ref={ref}
    />
  );
};

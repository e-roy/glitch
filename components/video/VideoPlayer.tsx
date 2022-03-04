import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";
import "plyr-react/dist/plyr.css";

export type VideoPlayerProps = {
  playbackId: string | null;
  streamIsActive?: boolean;
};

export const VideoPlayer = ({
  playbackId,
  streamIsActive,
}: VideoPlayerProps) => {
  const ref = useRef<APITypes>(null);
  useEffect(() => {
    if (playbackId && streamIsActive) {
      console.log("playbackId", playbackId);
      console.log("streamIsActive", streamIsActive);
      const loadVideo = async () => {
        const video = document.getElementById("plyr") as HTMLVideoElement;
        var hls = new Hls();
        hls.loadSource(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
        hls.attachMedia(video);
        // @ts-ignore
        ref.current!.plyr.media = video;

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          (ref.current!.plyr as PlyrInstance).play();
        });
      };
      loadVideo();
    }
  }, [playbackId, streamIsActive]);

  return (
    <Plyr
      id="plyr"
      options={{ volume: 0.1 }}
      source={{} as PlyrProps["source"]}
      ref={ref}
    />
  );
};

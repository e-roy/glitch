import { useRef, useEffect, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";

export type WebCamProps = {
  streamKey: string;
};

export const WebCam = ({ streamKey }) => {
  const videoEl = useRef<any>(null);
  const stream = useRef<any>(null);
  // const [createSession, setCreateSession] = useState(null);
  let createSession = useRef<any>(null);

  useEffect(() => {
    console.log("stream", stream);
    console.log("createSession", createSession);
  }, [stream, createSession]);

  const onButtonClick = async () => {
    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);
    createSession = client.cast(stream.current, streamKey);

    console.log("session", session);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  const handleStop = () => {
    // turn off camera and audio
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        // console.log("track", track);
        track.stop();
      });
    }
  };

  const handleStartCamera = async () => {
    // turn on camera and audio
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      videoEl.current.volume = 0;
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      window.stream = stream.current;
      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    }
  };

  return (
    <div className="App">
      <video
        className="App-video border border-stone-200 rounded"
        ref={videoEl}
      />
      <button
        className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark"
        onClick={onButtonClick}
      >
        Start Stream
      </button>

      <button
        className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark"
        onClick={handleStartCamera}
      >
        Turn on Camera
      </button>
      <button
        className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark"
        onClick={handleStop}
      >
        Turn off Camera
      </button>
    </div>
  );
};

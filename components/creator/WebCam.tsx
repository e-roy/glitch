import { useRef, useState, useEffect } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import { activateRecord } from "utils/apiFactory";
import { StreamControls } from "./";

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

declare global {
  interface Window {
    stream?: any;
  }
}

export type WebCamProps = {
  streamKey: string;
  streamId: string;
  createNewStream: () => void;
  closeStream: () => void;
  startSession: (userInput: { title: string; description: string }) => void;
  endSession: () => void;
  handleRecordState: (record: boolean) => void;
};

export const WebCam = ({
  streamKey,
  streamId,
  createNewStream,
  closeStream,
  startSession,
  endSession,
  handleRecordState,
}: WebCamProps) => {
  const videoEl = useRef<any>(null);
  const stream = useRef<any>(null);
  const [streamIsActive, setStreamIsActive] = useState(false);
  const [recordStatus, setRecordStatus] = useState(false);
  const [displayActive, setDisplayActive] = useState("");

  useEffect(() => {
    if (displayActive === "camera") handleStartCamera();
    if (displayActive === "display") handleStartDisplay();
  }, [displayActive]);

  const handleStartSession = async (userInput: any) => {
    // console.log("handleStartSession");
    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();
    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      setStreamIsActive(true);
      startSession(userInput);
      // alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
      setStreamIsActive(false);
      endSession();
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
      setStreamIsActive(false);
      endSession();
    });
  };

  const handleStopStream = () => {
    // console.log("handleStopStream");
    // turn off camera and audio
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        // console.log("track", track);
        track.stop();
      });
    }
    closeStream();
    setStreamIsActive(false);
    endSession();
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

  const handleStartDisplay = async () => {
    // const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log("devices", devices);
    var displayMediaStreamConstraints = {
      video: true, // or pass HINTS
      audio: true,
    };

    if (navigator.mediaDevices.getDisplayMedia) {
      // console.log("stream current", stream.current);
      stream.current = await navigator.mediaDevices.getDisplayMedia(
        displayMediaStreamConstraints
      );
      // console.log("stream current", stream.current);

      window.stream = stream.current;
      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    } else {
      // fallback to getUserMedia
      stream.current = await navigator.getDisplayMedia(
        displayMediaStreamConstraints
      );
      window.stream = stream.current;
      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    }
  };

  const handleRecord = async () => {
    console.log("handleRecord");

    if (!streamId) {
      alert("Invalid streamKey.");
      return;
    }
    if (recordStatus) {
      setRecordStatus(false);
      handleRecordState(false);
      await activateRecord(livepeerApi, streamId, false);
    } else {
      setRecordStatus(true);
      handleRecordState(true);
      await activateRecord(livepeerApi, streamId, true);
    }
  };

  return (
    <div className="">
      <div className="rounded content-center justify-center min-h-96">
        <video className="mx-auto h-100" ref={videoEl} />
      </div>
      <div>
        <StreamControls
          createNewStream={createNewStream}
          handleStopStream={handleStopStream}
          handleRecord={handleRecord}
          handleStartSession={handleStartSession}
          handleContent={setDisplayActive}
          streamIsActive={streamIsActive}
          setStreamIsActive={setStreamIsActive}
        />
      </div>
    </div>
  );
};

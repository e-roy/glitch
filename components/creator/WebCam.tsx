import { useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import { VideoCameraIcon, DesktopComputerIcon } from "@heroicons/react/outline";
import { activateRecord } from "utils/apiFactory";
import { PlayIcon, PauseIcon, StopIcon } from "components/icons";

const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API as string;

export type WebCamProps = {
  streamKey: string;
  streamId: string;
  createNewStream: () => void;
  closeStream: () => void;
};

export const WebCam = ({
  streamKey,
  streamId,
  createNewStream,
  closeStream,
}: WebCamProps) => {
  const videoEl = useRef<any>(null);
  const stream = useRef<any>(null);

  const [streamCreated, setStreamCreated] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [streamIsActive, setStreamIsActive] = useState(false);
  const [recordStatus, setRecordStatus] = useState(false);

  // useEffect(() => {
  //   console.log("stream", stream);
  //   let testBlankStream = new MediaStream();
  //   console.log("testBlankStream", testBlankStream);
  // }, [stream]);

  const handleStartStream = async () => {
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
      // alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
      setStreamIsActive(false);
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
      setStreamIsActive(false);
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
    closeStream();
    // setStreamCreated(false);
    setStreamIsActive(false);
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

  const handleDevice = async () => {
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
    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamId) {
      alert("Invalid streamKey.");
      return;
    }

    if (recordStatus) {
      setRecordStatus(false);
      await activateRecord(livepeerApi, streamId, false);
    } else {
      setRecordStatus(true);
      await activateRecord(livepeerApi, streamId, true);
    }
  };

  return (
    <div className="">
      <div className=" rounded content-center justify-center">
        <video className="mx-auto h-100" ref={videoEl} />
      </div>
      <div className="flex justify-between bg-backgroundLight w-full p-2 mt-8 rounded">
        <div>
          {/* <button
            className="font-bold px-10 py-2 mx-auto border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark"
            onClick={handleRecord}
          >
            rec
          </button> */}
        </div>

        <div>
          <button
            className="font-bold p-3 mx-2 border border-backgroundDark rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 text-stone-300 hover:text-stone-100"
            onClick={handleDevice}
          >
            <DesktopComputerIcon className={"h-5 w-5"} aria-hidden={"true"} />
          </button>

          <button
            className="font-bold p-3 mx-2 border border-backgroundDark rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 text-stone-300 hover:text-stone-100"
            onClick={() => {
              setCameraOn(!cameraOn);
              if (cameraOn) {
                handleStop();
              } else {
                handleStartCamera();
              }
            }}
          >
            {cameraOn ? (
              <VideoCameraIcon
                className={"h-5 w-5 text-red-600"}
                aria-hidden={"true"}
              />
            ) : (
              <VideoCameraIcon
                className={"h-5 w-5 text-green-800"}
                aria-hidden={"true"}
              />
            )}
          </button>
        </div>
        <div>
          {!streamCreated ? (
            <button
              className="font-bold px-4 py-3 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark"
              onClick={() => {
                createNewStream();
                setStreamCreated(true);
              }}
            >
              Create Stream
            </button>
          ) : (
            <>
              {!streamIsActive ? (
                <button
                  // disabled={!cameraOn}
                  onClick={() => {
                    handleStartStream();
                  }}
                  className="font-bold px-4 py-3 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark"
                >
                  Start Stream
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleStop();
                  }}
                  className="font-bold px-4 py-3 mx-auto border rounded text-sm border-red-600 bg-red-500 hover:bg-red-600  text-stone-200 hover:text-stone-100"
                >
                  Stop Stream
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

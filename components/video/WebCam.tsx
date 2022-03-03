import { useEffect, useRef } from "react";
import { Client } from "@livepeer/webrtmp-sdk";

export const WebCam = () => {
  const inputEl = useRef(null);
  const videoEl = useRef(null);
  const stream = useRef(null);

  //   useEffect(() => {
  //     (async () => {
  //       videoEl.current.volume = 0;

  //       stream.current = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: true,
  //       });

  //       videoEl.current.srcObject = stream.current;
  //       videoEl.current.play();
  //     })();
  //   });

  const onButtonClick = async () => {
    const streamKey = inputEl.current.value;

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
    console.log(window);
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  };

  const handleStartCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          console.log(stream);
          window.stream = stream; // stream available to console
          videoEl.current.volume = 0;
          videoEl.current.srcObject = stream;
          videoEl.current.play();
        })
        .catch(function (error) {
          console.log("Something went wrong!" + error);
        });
    }
  };

  return (
    <div className="App">
      <input
        className="App-input"
        ref={inputEl}
        type="text"
        placeholder="streamKey"
      />
      <video className="App-video" ref={videoEl} />
      <button
        className="border m-2 p-2 rounded bg-sky-200 hover:bg-sky-400"
        onClick={onButtonClick}
      >
        Start Stream
      </button>

      <button
        className="border m-2 p-2 rounded bg-sky-200 hover:bg-sky-400"
        onClick={handleStartCamera}
      >
        Start Camera
      </button>
      <button
        className="border m-2 p-2 rounded bg-sky-200 hover:bg-sky-400"
        onClick={handleStop}
      >
        Stop Camera
      </button>
    </div>
  );
};

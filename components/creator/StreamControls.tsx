import { useState } from "react";
import { VideoCameraIcon, DesktopComputerIcon } from "@heroicons/react/outline";
import { PlayIcon, RecordIcon, StopIcon } from "components/icons";

export type StreamControlsProps = {
  createNewStream: () => void;
  handleStopStream: () => void;
  handleRecord: () => void;
  handleStartSession: () => void;
};

export default function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

export const StreamControls = ({
  createNewStream,
  handleStopStream,
  handleRecord,
  handleStartSession,
}: StreamControlsProps) => {
  const [displayActive, setDisplayActive] = useState("");
  const [streamIsActive, setStreamIsActive] = useState(false);
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const [recordIsActive, setRecordIsActive] = useState(false);

  return (
    <div className="flex justify-between border-2 border-backgroundLight bg-backgroundLight/50 w-full p-2 mt-8 rounded">
      <div>
        <button
          className={classNames(
            displayActive === "display"
              ? "text-green-600 border-green-600 hover:text-green-600"
              : "",
            "font-bold p-2 mx-2 border border-backgroundDark rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 text-stone-300 hover:text-stone-100"
          )}
          onClick={() => {
            if (displayActive !== "display") setDisplayActive("display");
            else setDisplayActive("");
          }}
        >
          <DesktopComputerIcon className={"h-5 w-5"} aria-hidden={"true"} />
        </button>
        <button
          className={classNames(
            displayActive === "camera"
              ? "text-green-600 border-green-600 hover:text-green-600"
              : "",
            "font-bold p-2 mx-2 border border-backgroundDark rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 text-stone-300 hover:text-stone-100"
          )}
          onClick={() => {
            if (displayActive !== "camera") setDisplayActive("camera");
            else setDisplayActive("");
          }}
        >
          <VideoCameraIcon className={"h-5 w-5"} aria-hidden={"true"} />
        </button>
      </div>
      <div className="flex text-backgroundLight">
        {!sessionIsActive ? (
          <button
            className="rounded-full border-2 border-secondary bg-secondary hover:bg-backgroundLight hover:text-secondary py-2 pl-1 w-10 flex justify-center mx-2"
            onClick={() => {
              setSessionIsActive(true);
              handleStartSession();
            }}
          >
            <PlayIcon size={18} />
          </button>
        ) : (
          <button
            className="rounded-full border-2 border-secondary bg-secondary hover:bg-backgroundLight hover:text-secondary py-2 w-10 flex justify-center mx-2"
            onClick={() => setSessionIsActive(false)}
          >
            <StopIcon size={18} />
          </button>
        )}
        {!recordIsActive ? (
          <>
            {!sessionIsActive ? (
              <button
                className="rounded-full  border-2 border-red-600/70 hover:border-red-600 text-red-600/70 hover:bg-backgroundLight hover:text-red-600 py-2 w-8  flex justify-center m-1"
                onClick={() => {
                  setRecordIsActive(true);
                  handleRecord();
                }}
              >
                <RecordIcon />
              </button>
            ) : (
              <button
                disabled
                className="rounded-full border-2 border-backgroundLight  hover:text-backgroundLight py-2 w-8 flex justify-center m-1"
              >
                <RecordIcon />
              </button>
            )}
          </>
        ) : (
          <>
            {!sessionIsActive ? (
              <button
                className="rounded-full  border-2 border-red-600 bg-red-600/40 text-red-600 py-2 w-8  flex justify-center m-1"
                onClick={() => {
                  setRecordIsActive(false);
                  handleRecord();
                }}
              >
                <RecordIcon />
              </button>
            ) : (
              <button
                disabled
                className="rounded-full border-2 border-red-600 bg-red-600/40 text-red-600 py-2 w-8 flex justify-center m-1"
              >
                <RecordIcon />
              </button>
            )}
          </>
        )}
      </div>
      <div>
        {!streamIsActive ? (
          <button
            onClick={() => {
              createNewStream();
              setStreamIsActive(true);
            }}
            className="font-bold w-36 py-2 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark"
          >
            Create New Stream
          </button>
        ) : (
          <button
            onClick={() => {
              handleStopStream();
              setStreamIsActive(false);
            }}
            className="font-bold w-36 py-2 mx-auto border rounded text-sm border-red-600 bg-red-500 hover:bg-red-600  text-stone-200 hover:text-stone-100"
          >
            End Stream
          </button>
        )}
      </div>
    </div>
  );
};

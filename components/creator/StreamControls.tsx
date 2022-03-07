import { useState, useEffect } from "react";
import { VideoCameraIcon, DesktopComputerIcon } from "@heroicons/react/outline";
import { PlayIcon, RecordIcon, StopIcon } from "components/icons";
import { Modal } from "components/elements";

export type StreamControlsProps = {
  createNewStream: () => void;
  handleStopStream: () => void;
  handleRecord: () => void;
  handleStartSession: (userInput: {}) => void;
  handleContent: (content: string) => void;
  streamIsActive: boolean;
  setStreamIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StreamControls = ({
  createNewStream,
  handleStopStream,
  handleRecord,
  handleStartSession,
  handleContent,
  streamIsActive,
  setStreamIsActive,
}: StreamControlsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayActive, setDisplayActive] = useState("");
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const [recordIsActive, setRecordIsActive] = useState(false);

  const classNames = (...classes: unknown[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const userInput = {
    title: title,
    description: description,
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(displayActive);
    handleContent(displayActive);
  }, [displayActive]);

  return (
    <div className="flex justify-between border-2 border-backgroundLight bg-backgroundLight/50 w-full p-2 mt-8 rounded">
      <div>
        {/* {displayActive} */}
        <button
          className={classNames(
            displayActive === "display"
              ? "text-green-600 border-green-600 hover:text-green-600"
              : "text-stone-300 hover:text-stone-100 border-backgroundDark",
            "font-bold p-2 mx-2 border rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 "
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
              : "text-stone-300 hover:text-stone-100 border-backgroundDark",
            "font-bold p-2 mx-2 border rounded hover:bg-backgroundDark/70 bg-backgroundDark/50 "
          )}
          onClick={() => {
            if (displayActive !== "camera") setDisplayActive("camera");
            else setDisplayActive("");
          }}
        >
          <VideoCameraIcon className={"h-5 w-5"} aria-hidden={"true"} />
        </button>
      </div>
      {streamIsActive ? (
        <>
          {displayActive !== "" && (
            <div>
              {!sessionIsActive ? (
                <div className="flex">
                  <button
                    disabled={!streamIsActive}
                    className="rounded-full border-2 border-secondary bg-secondary hover:bg-backgroundLight text-backgroundLight hover:text-secondary py-2 pl-1 w-10 flex justify-center mx-2"
                    onClick={() => {
                      setSessionIsActive(true);
                      handleStartSession(userInput);
                    }}
                  >
                    <PlayIcon size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setRecordIsActive(!recordIsActive);
                      handleRecord();
                    }}
                    className={classNames(
                      recordIsActive
                        ? "border-red-600  text-red-600 animate-pulse"
                        : "border-red-600/70 hover:border-red-600 text-red-600/70 hover:text-red-600",
                      "rounded-full border-2 py-2 w-8 flex justify-center m-1"
                    )}
                  >
                    <RecordIcon />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    className="rounded-full border-2 border-secondary bg-secondary hover:bg-backgroundLight text-backgroundLight hover:text-secondary py-2 w-10 flex justify-center mx-2"
                    onClick={() => {
                      setSessionIsActive(false);
                      handleStopStream();
                      setDisplayActive("");
                    }}
                  >
                    <StopIcon size={18} />
                  </button>
                  <button
                    disabled
                    className={classNames(
                      recordIsActive
                        ? "border-red-600  text-red-600 animate-pulse"
                        : "border-backgroundLight text-backgroundLight",
                      "rounded-full border-2 py-2 w-8 flex justify-center m-1"
                    )}
                  >
                    <RecordIcon />
                  </button>
                </div>
              )}
            </div>
          )}
          <div></div>
        </>
      ) : (
        <>
          <div></div>
          <div>
            <button
              onClick={() => {
                createNewStream();
                setStreamIsActive(true);
                setIsModalOpen(true);
              }}
              className="font-bold w-36 py-2 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark"
            >
              Create New Stream
            </button>
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-backgroundLight p-4">
          <form onSubmit={handleSubmitDetails}>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-stone-200"
            >
              Title
            </label>
            <div className="mt-1 mb-4">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="title"
                required
              />
            </div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-stone-200"
            >
              Email
            </label>
            <div className="mt-1 mb-4">
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="description"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="border border-secondary py-1 px-2 rounded font-semibold text-secondary hover:bg-secondary hover:text-backgroundDark"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

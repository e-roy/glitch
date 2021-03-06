import Link from "next/link";
import { PlayIcon, PauseIcon, StopIcon } from "components/icons";

type Stream = {
  id: string;
  name?: string;
  description?: string;
  playbackId: string;
  record: boolean | null;
  active: boolean | null;
  createdAt: number;
};

export type StreamCardProps = {
  stream: Stream;
  contractAddress: string;
};

export const StreamCard = ({ stream, contractAddress }: StreamCardProps) => {
  const { name, description, playbackId } = stream;  

  const getType = () => {
    if (stream.active) {
      return "hls";
    } else if (stream.record && !stream.active) {
      return "recordings";
    }
  };

  return (
    <div className="m-4 p-2 rounded bg-backgroundLight text-secondary">
      {!!stream.active && (
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        </span>
      )}
      <div className="text-center text-lg font-bold">{name}</div>
      <div className="text-center text-md text-secondary">{description}</div>
      <div className="flex my-12 text-backgroundLight justify-center">
        <div className="rounded-full bg-secondary py-2 w-7 flex justify-center mx-2">
          <PlayIcon />
        </div>
        <div className="rounded-full bg-secondary py-2 w-7 flex justify-center mx-2">
          <PauseIcon />
        </div>
        <div className="rounded-full bg-secondary py-2 w-7 flex justify-center mx-2">
          <StopIcon />
        </div>
      </div>
      <div className="flex content-center">
        <Link
          href={`/viewer/${contractAddress}?streamId=${stream.id}&type=${getType()}&playbackId=${playbackId}`}
        >
          <button className="font-bold w-1/2 py-1 mx-auto border uppercase border-secondary rounded bg-backgroundDark/30 hover:bg-secondary text-secondary hover:text-backgroundDark">
            Go to {getType() === "hls" ? "stream" : "recording"}
          </button>
        </Link>
      </div>
    </div>
  );
};

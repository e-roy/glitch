import Link from "next/link";
import { PlayIcon, PauseIcon, StopIcon } from "components/icons";

export type StreamCardProps = {
  stream: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    tokenId: string;
    playbackId: string;
  };
};

export const StreamCard = ({ stream }: StreamCardProps) => {
  const { title, tokenId, playbackId } = stream;
  return (
    <div className="m-4 p-2 rounded bg-backgroundLight text-secondary">
      <div className="text-center text-lg font-bold">{title}</div>
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
        <Link href={`/viewer/${playbackId}`}>
          <button className="font-bold w-1/2 py-1 mx-auto border uppercase border-secondary rounded bg-backgroundDark/30 hover:bg-secondary text-secondary hover:text-backgroundDark">
            {tokenId}
          </button>
        </Link>
      </div>
    </div>
  );
};

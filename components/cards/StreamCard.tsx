import Link from "next/link";

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
  const { title, description, thumbnail, tokenId, playbackId } = stream;
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

const PlayIcon = () => {
  return (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 11 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>play_arrow</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Rounded" transform="translate(-753.000000, -955.000000)">
          <g id="AV" transform="translate(100.000000, 852.000000)">
            <g
              id="-Round-/-AV-/-play_arrow"
              transform="translate(646.000000, 98.000000)"
            >
              <g>
                <rect
                  id="Rectangle-Copy-50"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                ></rect>
                <path
                  d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z"
                  id="🔹Icon-Color"
                  fill="currentColor"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const PauseIcon = () => {
  return (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 12 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>pause</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Outlined" transform="translate(-310.000000, -955.000000)">
          <g id="Av" transform="translate(100.000000, 852.000000)">
            <g
              id="Outlined-/-AV-/-pause"
              transform="translate(204.000000, 98.000000)"
            >
              <g>
                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                <path
                  d="M6,19 L10,19 L10,5 L6,5 L6,19 Z M14,5 L14,19 L18,19 L18,5 L14,5 Z"
                  id="🔹-Icon-Color"
                  fill="currentColor"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const StopIcon = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1_1_"
      width="12px"
      height="12px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 16 16"
      //   style="enable-background:new 0 0 16 16;"
      xmlSpace="preserve"
    >
      <rect width="16" height="16" fill="currentColor" />
    </svg>
  );
};

export type PlayIconProps = {
  size?: number;
};

export const PlayIcon = ({ size = 12 }: PlayIconProps) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
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

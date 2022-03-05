export type PauseIconProps = {
  size?: number;
};

export const PauseIcon = ({ size = 12 }: PauseIconProps) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 12 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
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

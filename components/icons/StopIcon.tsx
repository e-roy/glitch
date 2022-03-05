export type StopIconProps = {
  size?: number;
};

export const StopIcon = ({ size = 12 }: StopIconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1_1_"
      width={`${size}px`}
      height={`${size}px`}
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

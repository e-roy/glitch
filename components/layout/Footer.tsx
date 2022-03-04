export const Footer = () => (
  <footer className="bg-backgroundLight flex flex-col md:flex-row md:space-x-32 mx-24 text-gray-100 px-8 py-6 justify-center text-center md:text-left font-work-sans">
    <div className="w-full  md:w-1/5  flex flex-col ">
      <p className="inline break-normal text-footerLight">
        Nec, enim sed lacus, magna pharetra. Phasellus tincidunt nulla pharetra
        gravida est.{" "}
      </p>
      <div className="my-8 text-red-400 w-12 self-center">
        <svg
          height="100%"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: "2",
          }}
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="400"
            style={{ fill: "none" }}
            width="400"
            x="56"
            y="56"
          />
          <path
            d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104"
            style={{ fill: "currentcolor", fillRule: "nonzero" }}
          />
        </svg>
      </div>
      <p className="mt-4 text-footerLight">All rights reserved@{new Date().getFullYear()}</p>
    </div>
    <div>
      <h3>About us</h3>
      <ul className="mt-4 text-footerLight space-y-2">
        <li>About NFTs</li>
        <li>Live Streams</li>
      </ul>
    </div>
    <div>
      <h3>Support</h3>
      <p className="mt-4 text-footerLight">Help & Support</p>
    </div>
  </footer>
);

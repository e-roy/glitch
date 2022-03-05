import Image from "next/image";
import walletIcon from "./WalletIcon.png";
import dashLine from "./dashLine.png";
import paste from "./paste.png";
import createWatch from "./create-watch.png";
import giveRec from "./giveRec.png";
import ellipse from "./Ellipse.png";

export const HowItWorks = () => (
  <div className="py-32 px-32 mt-14 mr-16 mb-14 ml-16 flex flex-col space-y-7 rounded overflow-hidden" id="how-it-works">

    <div className="self-center ">
      <div className=" bg-[#D53D5C] w-20 h-20 -mb-16 -ml-5 rounded-full">

      </div>
      <h3 className=" text-secondary font-oxanium font-bold text-xl md:text-6xl self-center z-4">How It Works</h3>
    </div>

    <div className="flex self-center">
      <div className="walletIcon px-3.5">
        <Image
          src={walletIcon}
          width={70}
          height={70}
          alt="Wallet Icon"
          className="rounded-lg"
        />
        <p className="text-secondary justify-center py-5">Connect Your Wallet</p>
      </div>

      <div className="arrowIcon py-3.5">
        <Image
          src={dashLine}
          width={70}
          height={0}
          alt="Arrow Icon"
          className="rounded-lg"
        />
      </div>

      <div className="paste px-3.5">
        <Image
          src={paste}
          width={70}
          height={70}
          alt="Paste Icon"
          className="rounded-lg"
        />
        <p className="text-secondary py-5">Paste Livepeer API</p>
      </div>

      <div className="arrowIcon py-3.5">
        <Image
          src={dashLine}
          width={70}
          height={0}
          alt="Arrow Icon"
          className="rounded-lg"
        />
      </div>

      <div className="createWatch px-3.5">
        <Image
          src={createWatch}
          width={70}
          height={70}
          alt="Watch Icon"
          className="rounded-lg"
        />
        <p className="text-secondary py-5">Create/Watch Stream</p>
      </div>

      <div className="arrowIcon py-3.5">
        <Image
          src={dashLine}
          width={70}
          height={0}
          alt="Arrow Icon"
          className="rounded-lg"
        />
      </div>

      <div className="giveRec px-3.5">
        <Image
          src={giveRec}
          width={70}
          height={70}
          alt="GiveRec Icon"
          className="rounded-lg"
        />
        <p className="text-secondary py-5">Give/Receive $POST</p>
      </div>
    </div>

  </div>
);

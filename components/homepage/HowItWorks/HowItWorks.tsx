import Image from "next/image";
import WalletIcon from "./WalletIcon.png";
// import DashLine from "./dashLine.png";
import CreateWatch from "./create-watch.png";
import GiveRec from "./giveRec.png";

export const HowItWorks = () => (
  <div
    className="py-32 px-32 mt-14 mr-16 mb-14 ml-16 flex flex-col space-y-7 rounded overflow-hidden"
    id="how-it-works"
  >
    <div className="self-center my-12">
      <div className=" bg-[#D53D5C] w-20 h-20 -mb-16 -ml-5 rounded-full"></div>
      <h3 className=" text-secondary font-oxanium font-bold text-xl md:text-6xl self-center z-4">
        How It Works
      </h3>
    </div>

    <div className="flex self-center">
      <div className="mx-auto">
        <div className="flex justify-center">
          <Image
            src={WalletIcon}
            width={70}
            height={70}
            alt="Wallet Icon"
            className="rounded-lg"
          />
        </div>
        <div className="text-secondary justify-center py-5">
          Connect Your Wallet
        </div>
      </div>

      {/* <div className="py-3.5">
        <Image
          src={DashLine}
          width={70}
          height={0}
          alt="Arrow Icon"
          className="rounded-lg"
        />
      </div> */}

      <div className="mx-auto">
        <div className="flex justify-center">
          <Image
            src={CreateWatch}
            width={70}
            height={70}
            alt="Watch Icon"
            className="rounded-lg"
          />
        </div>
        <div className="text-secondary py-5">Create/Watch Stream</div>
      </div>

      {/* <div className="py-3.5">
        <Image
          src={DashLine}
          width={70}
          height={0}
          alt="Arrow Icon"
          className="rounded-lg"
        />
      </div> */}

      <div className="mx-auto">
        <div className="flex justify-center">
          <Image
            src={GiveRec}
            width={70}
            height={70}
            alt="GiveRec Icon"
            className="rounded-lg"
          />
        </div>

        <div className="text-secondary py-5 text-center">
          Give/Receive $POST
        </div>
      </div>
    </div>
  </div>
);

import { AppLayout } from "components/layout";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import Link from "next/link";
import { ironOptions } from "../../lib/session";

import { Logout } from "../../components/wallet";
import Image from "next/image";
import videocam from "./video-cam.png";
import streamimg from "./stream-img.png";

const DashboardPage: NextPage = () => {
  return (
    <AppLayout sections={[{ name: "Dashboard" }]}>
      <div className="m-4 flex justify-center">
        <div className="bg-backgroundLight grid place-items-center p-10 rounded-xl">
          <Image
            src={videocam}
            width={150}
            height={150}
            alt="Video Cam"
            className="rounded-lg"
          />
          <Link href="/viewer">
            <button className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              View Stream
            </button>
          </Link>
        </div>

        <div className="bg-backgroundLight grid place-items-center ml-20 p-10 rounded-xl">
          <Image
            src={streamimg}
            width={150}
            height={150}
            alt="Stream Img"
            className="rounded-lg"
          />

          <Link href="/creator">
            <button className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              Create Stream
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  if (req.session.siwe === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
},
ironOptions);

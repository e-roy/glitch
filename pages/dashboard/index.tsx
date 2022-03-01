import type { NextPage } from "next";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
// import { AppHeader } from "../../components/layout";
import { Logout } from "../../components/wallet";

const DashboardPage: NextPage = () => {
  return (
    <main className="pb-12 h-screen m-auto pt-24 lg:pt-40 bg-backgroundDark">
      {/* <AppHeader /> */}
      <header className="w-full px-10 py-3 flex justify-between items-center fixed top-0 left-0 z-10">
        <h1 className="text-secondary uppercase font-bold text-3xl">Glitch</h1>

        <h1 className="text-secondary uppercase text-xl font-bold text-center">Dashboard</h1>
        
        <Logout/>
      </header>
      <div className="m-4 flex justify-center">
        <div className="bg-backgroundLight h-96 w-1/5 flex items-end">
          <Link href="/viewer">
            <button className="font-bold px-10 py-2 mx-auto mb-20 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              View Stream
            </button>
          </Link>
        </div>
        
        <div className="bg-backgroundLight h-96 w-1/5 flex ml-20 items-end">
          <Link href="/creator">
            <button className="font-bold px-10 py-2 mx-auto mb-20 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
              Create Stream
            </button>
          </Link>
        </div>
        
      </div>
    </main>
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

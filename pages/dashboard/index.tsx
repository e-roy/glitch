import type { NextPage } from "next";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
import { AppHeader } from "../../components/layout";

const DashboardPage: NextPage = () => {
  return (
    <main className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
      <AppHeader />

      <h1>Dashboard page</h1>
      <div className="m-4">
        <Link href="/viewer">
          <button className="p-2 m-2 border border-gray-400 rounded-lg bg-sky-300 hover:bg-sky-400">
            Viewer Page
          </button>
        </Link>
        <Link href="/creator">
          <button className="p-2 m-2 border border-gray-400 rounded-lg bg-sky-300 hover:bg-sky-400">
            Creator Page
          </button>
        </Link>
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

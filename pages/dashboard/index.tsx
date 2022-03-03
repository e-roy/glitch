import { AppLayout } from "components/layout";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import Link from "next/link";
import { ironOptions } from "../../lib/session";

const DashboardPage: NextPage = () => {
  return (
    <AppLayout sections={[{name: 'Dashboard'}]}>
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

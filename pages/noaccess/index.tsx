import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { ironOptions } from "lib/session";
import { AppLayout } from "components/layout";
import Link from "next/link";

const NoAccessPage: NextPage = () => {
  return (
    <AppLayout sections={[{ name: "Dashboard" }]}>
      <div>Sorry you don't have access to that page</div>
      <Link href={"/main"}>
        <button className="font-bold w-36 py-2 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark">
          Go Back to Main Page
        </button>
      </Link>
    </AppLayout>
  );
};

export default NoAccessPage;

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

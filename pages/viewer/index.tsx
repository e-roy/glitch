import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
import { AppHeader } from "../../components/layout";

const ViewerPage: NextPage = () => {
  return (
    <main className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
      <AppHeader />
      <h1>Veiwer page</h1>
    </main>
  );
};

export default ViewerPage;

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

import { WebsiteLayout } from "components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const NoPage: NextPage = () => {
  return (
    <WebsiteLayout>
      <h1 className="my-16 text-5xl text-slate-600 font-bold">404 page</h1>
      <Link href="/">
        <button className="p-2 m-2 border border-gray-400 rounded-lg bg-sky-300 hover:bg-sky-400">
          Home
        </button>
      </Link>
    </WebsiteLayout>
  );
};

export default NoPage;

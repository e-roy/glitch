import type { NextPage } from "next";
import Link from "next/link";

const NoPage: NextPage = () => {
  return (
    <main className="container pb-12 h-screen m-auto pt-40 lg:pt-40 text-center">
      <h1 className="my-16 text-5xl text-slate-600 font-bold">404 page</h1>
      <Link href="/">
        <button className="p-2 m-2 border border-gray-400 rounded-lg bg-sky-300 hover:bg-sky-400">
          Home
        </button>
      </Link>
    </main>
  );
};

export default NoPage;

import type { NextPage } from "next";
import Link from "next/link";
import { AppLayout } from "../../components/layout";

export type VideoListPageProps = {};

const VideoListPage: NextPage<VideoListPageProps> = ({}) => {
  return (
    <AppLayout sections={[{ name: "Creator" }]}>
      <div>video list page</div>
      <Link href="/viewer">
        <button className="font-bold px-10 py-2 mx-auto mt-10 mb-10 border hover:text-secondary border-secondary rounded hover:bg-backgroundLight bg-secondary text-backgroundDark">
          View Stream
        </button>
      </Link>
    </AppLayout>
  );
};

export default VideoListPage;

import type { NextPage } from "next";
import { AppLayout } from "../../components/layout";
import { StreamCard } from "../../components/cards";

const streams = [
  {
    id: "1",
    title: "Stream 1",
    description: "Stream 1 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "1",
    playbackId: "1",
  },
  {
    id: "2",
    title: "Stream 2",
    description: "Stream 2 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "2",
    playbackId: "2",
  },
  {
    id: "3",
    title: "Stream 3",
    description: "Stream 3 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "3",
    playbackId: "3",
  },
  {
    id: "4",
    title: "Stream 4",
    description: "Stream 4 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "4",
    playbackId: "4",
  },
  {
    id: "5",
    title: "Stream 5",
    description: "Stream 5 description",
    thumbnail: "https://picsum.photos/200/300",
    tokenId: "5",
    playbackId: "5",
  },
];

export type VideoListPageProps = {};

const VideoListPage: NextPage<VideoListPageProps> = ({}) => {
  return (
    <AppLayout sections={[{ name: "Creator" }]}>
      <div className="mx-24">
        <div className="m-4 text-secondary text-2xl font-bold">
          Streams to Watch
        </div>
        <div className="flex flex-wrap">
          {streams.map((stream, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 my-4">
              <StreamCard stream={stream} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoListPage;

import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/session";
import { AppLayout, WebsiteLayout } from "../../components/layout";
import { VideoPlayback } from "../../components/video";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const testContract = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const alchemyETH = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
);

export type ViewerPageProps = {
  video: IVideoItem;
};

export interface IVideoItem {
  id: string;
  confirmed: boolean;
}

const ViewerPage: NextPage<ViewerPageProps> = ({ video }) => {
  return (
    <AppLayout sections={[{name: 'Creator'}]}>
      <main className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
        <h1>Veiwer page</h1>
        {video.confirmed && (
          <div>
            confirmed user
            <VideoPlayback video={video} />
          </div>
        )}
        {!video.confirmed && (
          <div>sorry you don't have access to this video</div>
        )}
      </main>
    </AppLayout>
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
  // get logged in user
  const userAddress = req.session.siwe.address;
  // get user's ethereum NFTs
  const ethNfts = await alchemyETH.alchemy.getNfts({
    owner: userAddress,
  });
  // filter matching NFTs tokens for Contract
  const matchedNfts = ethNfts.ownedNfts.filter((nft: any) => {
    return nft.contract.address === testContract;
  });

  let video = {
    id: "",
    confirmed: false,
  };

  if (matchedNfts.length > 0) video.confirmed = true;

  return {
    props: { video },
  };
},
ironOptions);

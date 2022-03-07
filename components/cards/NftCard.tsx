import Link from "next/link";

export type NftCardProps = {
  nft: any;
};

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div className="border rounded">
      <img src={`${nft.metadata.image}`} alt={nft.metadata.name} />
      <div className="m-4 justify-center flex">
        <Link href={`/dashboard/${nft.contract.address}`}>
          <button className="font-bold w-36 py-2 mx-auto border rounded text-sm hover:text-secondary border-secondary hover:bg-backgroundLight bg-secondary text-backgroundDark">
            {nft.metadata.name}
          </button>
        </Link>
      </div>
    </div>
  );
};

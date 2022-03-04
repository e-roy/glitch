import { useAccount } from "wagmi";
import { ConnectWallet, Logout, SIWE } from "../../components/wallet";
import { useUser } from "hooks";
import { useCallback } from "react";
import { Logo } from "components/elements";
import Link from "next/link";

type AppHeaderProps = {
  sections?: { name: string }[];
};

const defaultSections = [
  {
    name: "Home",
  },
  {
    name: "How it works",
  },
  {
    name: "Popular Stream",
  },
];

export const AppHeader = ({ sections = defaultSections }: AppHeaderProps) => {
  const [{ data: accountData }] = useAccount();
  const { address: user } = useUser();

  const authButton = useCallback(() => {
    if (user) {
      return <Logout />;
    } else {
      return accountData ? <SIWE /> : <ConnectWallet />;
    }
  }, [user, accountData]);

  return (
    <header className="w-full px-10 py-4 flex justify-between items-center sticky top-0 left-0 z-10 font-work-sans">
      <Link href={user ? "/dashboard" : "/"}>
        <a>
          <Logo />
        </a>
      </Link>
      <div id="sections" className="md:block hidden">
        <ul className="flex text-gray-100 space-x-8">
          {sections.map((section, index) => (
            <li key={index} className="hover:text-secondary hover:underline decoration-secondary underline-offset-4 hover:cursor-pointer">
              {section.name}
            </li>
          ))}
        </ul>
      </div>
      {authButton()}
    </header>
  );
};

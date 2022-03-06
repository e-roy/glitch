import { useAccount } from "wagmi";
import { ConnectWallet, Logout, SIWE } from "../../components/wallet";
import { useUser } from "hooks";
import { useCallback } from "react";
import { Logo } from "components/elements";
import Link from "next/link";

type AppHeaderProps = {
  sections?: { name: string, id?: string }[];
  sectionsClassName?: string
};

const defaultSections = [
  {
    name: "Home",
    id: "#hero"
  },
  {
    name: "How it works",
    id: "#how-it-works"
  },
  {
    name: "Popular Stream",
  },
];

export const AppHeader = ({ sections = defaultSections, sectionsClassName }: AppHeaderProps) => {
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
      <Link href={user ? "/main" : "/"}>
        <a>
          <Logo />
        </a>
      </Link>
      <div id="sections" className="md:block hidden">
        <ul className={`flex text-gray-100 space-x-8 ${sectionsClassName ?? ''}`}>
          {sections.map((section, index) => (

            <li key={index} className="hover:text-secondary hover:underline decoration-secondary underline-offset-4 hover:cursor-pointer">
              <a href={section?.id}>{section.name}</a>
            </li>
          ))}
        </ul>
      </div>
      {authButton()}
    </header>
  );
};

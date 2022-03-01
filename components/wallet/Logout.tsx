import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export const Logout = () => {
  const router = useRouter();
  const [{}, disconnect] = useAccount();
  const handleLogout = async () => {
    const res = await fetch("/api/wallet/logout");
    if (!res.ok) throw new Error("Error logging out");
    disconnect();
    router.push("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
        className="px-10 py-2 border text-secondary border-secondary rounded bg-backgroundLight hover:bg-secondary hover:text-backgroundDark"
      >
        Logout
      </button>
    </div>
  );
};

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
        className="p-2 border border-gray-600 rounded bg-sky-300 hover:bg-sky-400"
      >
        Logout
      </button>
    </div>
  );
};

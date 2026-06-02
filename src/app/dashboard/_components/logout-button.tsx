"use client";

import { authClient } from "@/lib/auth-client";
import type { Dispatch, SetStateAction } from "react";
import {useRouter} from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton({
  isSidebarOpen,
  setLoading,
  loading,
}: {
  isSidebarOpen: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  async function handleLogout() {
    setLoading(true);
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      setLoading(false);
      console.error("An unknown error occurred", error);
    }
  }

  return (
    <button
      type="button"
      title="Logout"
      disabled={loading}
      onClick={handleLogout}
      className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-slate-50 hover:bg-slate-200 text-white py-2 px-4 rounded-md transition flex items-center gap-3"
    >
      <CiLogout className="inline-block mr-2 text-xl text-black " />
    </button>
  );
}

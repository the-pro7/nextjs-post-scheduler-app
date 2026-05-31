"use client";

import { authClient } from "@/lib/auth-client";
import type { Dispatch, SetStateAction } from "react";
import {useRouter} from "next/navigation";

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
      disabled={loading}
      onClick={handleLogout}
      className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md transition"
    >
      {!isSidebarOpen ? "L" : "Logout"}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/storage";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-gray-700">Expense Tracker</h1>

      <div className="flex gap-4 text-gray-400 items-center">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/income">Income</Link>
        <Link href="/expenses">Expenses</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/storage";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    clearSession();

    router.replace("/login");
    router.refresh();
  } catch (error) {
    console.error("Logout error:", error);

    alert("Could not connect to the backend.");
  }
}

  return (
    <nav className="w-full bg-sky-300 px-4 py-4 shadow">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <h1 className="text-xl font-bold">
          Expense Tracker
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="hover:text-blue-700"
          >
            Dashboard
          </Link>

          <Link
            href="/income"
            className="hover:text-blue-700"
          >
            Income
          </Link>

          <Link
            href="/expenses"
            className="hover:text-blue-700"
          >
            Expenses
          </Link>

          <Link
            href="/accounts"
            className="hover:text-blue-700"
          >
            Accounts
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
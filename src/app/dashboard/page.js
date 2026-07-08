"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../lib/storage";
import Navbar from "@/app/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Navbar />
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome to your expense tracker.</p>
    </main>
  );
}

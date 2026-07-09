"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUsers, saveSession } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function HandleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    const users = getUsers();

    const userExists = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (userExists) {
      saveSession(userExists);
      router.push("/dashboard");
    } else {
      alert("Wrong email or password");
      return;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={HandleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3 text-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-3 text-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-gray-800 text-white p-3 rounded-lg">
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't' have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

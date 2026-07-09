"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUsers, saveUsers, saveSession } from "../../lib/storage";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function HandleRegister(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    const users = getUsers();

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);
    saveUsers(users);
    saveSession(newUser);

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={HandleRegister}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          Register
        </h1>

        <input
          type="Name"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-3 text-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Create Account
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

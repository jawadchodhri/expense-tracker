"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthForm(props) {
  const mode = props.mode
  const onSubmit = props.onSubmit
  const isSubmitting = props.isSubmitting

  const [formData, setFormData] = useState(INITIAL_FORM);

  const isRegister = mode === "register";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formData);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md"
      >
        <h1 className="mb-5 text-center text-2xl font-bold text-gray-900">
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg border p-3 text-gray-700 outline-none focus:border-gray-700"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border p-3 text-gray-700 outline-none focus:border-gray-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          value={formData.password}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border p-3 text-gray-700 outline-none focus:border-gray-700"
        />

        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg border p-3 text-gray-700 outline-none focus:border-gray-700"
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gray-800 p-3 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Please wait..."
            : isRegister
              ? "Create Account"
              : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? "Already have an account? " : "Don't have an account? "}

          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-medium text-blue-600 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </p>
      </form>
    </main>
  );
}
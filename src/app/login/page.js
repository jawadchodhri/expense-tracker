"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { saveSession } from "@/lib/storage";

const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(formData) {
    const email = formData.email
      .trim()
      .toLowerCase();

    const password = formData.password;

    if (email === "" || password === "") {
      alert("Please provide email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      saveSession(data.user);

      const searchParams =
        new URLSearchParams(
          window.location.search,
        );

      const callbackUrl =
        searchParams.get("callbackUrl");

      const isSafeCallback =
        callbackUrl &&
        callbackUrl.startsWith("/") &&
        !callbackUrl.startsWith("//");

      if (isSafeCallback) {
        router.replace(callbackUrl);
      } else {
        router.replace("/dashboard");
      }

      router.refresh();
    } catch (error) {
      alert(
        "Could not connect to the backend.",
      );
    }
  }

  return (
    <AuthForm
      title="Login"
      fields={loginFields}
      buttonText="Login"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLink="/register"
      onSubmit={handleLogin}
    />
  );
}
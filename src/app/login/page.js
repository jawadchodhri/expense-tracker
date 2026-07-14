"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getUsers, saveSession } from "@/lib/storage";

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

  function handleLogin(formData) {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    const users = getUsers();

    const user = users.find(function (currentUser) {
      return (
        currentUser.email.toLowerCase() === email &&
        currentUser.password === password
      );
    });

    if (!user) {
      alert("Email or password is incorrect.");
      return;
    }

    saveSession(user);
    router.push("/dashboard");
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
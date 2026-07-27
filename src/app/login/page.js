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

    const searchParams = new URLSearchParams(window.location.search);

    const callbackUrl = searchParams.get("callbackUrl");

    const isSafeCallback = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//");

    if (isSafeCallback) {
      router.replace(callbackUrl);
    } else {
      router.replace("/dashboard");
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

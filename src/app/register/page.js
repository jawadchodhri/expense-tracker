"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { saveSession } from "@/lib/storage";

const registerFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Full name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Create a password",
    minLength: 6,
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    minLength: 6,
    required: true,
  },
];

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(formData) {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must have at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: name,
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

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Registration error:",
        error,
      );

      alert(
        "Could not connect to the backend.",
      );
    }
  }

  return (
    <AuthForm
      title="Register"
      fields={registerFields}
      buttonText="Create Account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLink="/login"
      onSubmit={handleRegister}
    />
  );
}
"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getUsers, saveUsers, saveSession } from "@/lib/storage";

export default function RegisterPage() {
  const router = useRouter();

  function handleRegister(formData) {
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
      alert("Password must have at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = getUsers();

    const userAlreadyExists = users.some(function (currentUser) {
      return currentUser.email.toLowerCase() === email;
    });

    if (userAlreadyExists) {
      alert("This email is already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    };

    users.push(newUser);

    saveUsers(users);
    saveSession(newUser);

    router.push("/dashboard");
  }

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
"use client";

import { useState } from "react";
import InputField from "@/components/InputField";

export default function AccountForm({ onSubmit }) {
  const [accountName, setAccountName] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (accountName.trim() === "" || openingBalance === "") {
      alert("Please fill all the fields.");
      return;
    }

    if (Number(openingBalance) < 0) {
      alert("Opening balance cannot be negative.");
      return;
    }

    const accountData = {
      name: accountName.trim(),
      openingBalance: Number(openingBalance),
    };

    onSubmit(accountData);

    setAccountName("");
    setOpeningBalance("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-5 text-2xl font-bold">
        Add Account
      </h2>

      <InputField
        name="accountName"
        type="text"
        placeholder="Account name"
        value={accountName}
        onChange={function (event) {
          setAccountName(event.target.value);
        }}
      />

      <InputField
        name="openingBalance"
        type="number"
        placeholder="Opening balance"
        value={openingBalance}
        onChange={function (event) {
          setOpeningBalance(event.target.value);
        }}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-500"
      >
        Add Account
      </button>
    </form>
  );
}
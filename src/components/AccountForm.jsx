"use client";

import { useState } from "react";
import InputField from "@/components/InputField";

export default function AccountForm({
  onSubmit,
  accountBeingEdited,
  onCancelEdit,
}) {
  const [accountName, setAccountName] = useState(
    accountBeingEdited ? accountBeingEdited.name || "" : "",
  );

  function clearForm() {
    setAccountName("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (accountName.trim() === "") {
      alert("Please enter an account name.");
      return;
    }

    const accountData = {
      name: accountName.trim(),
    };

    onSubmit(accountData);
    clearForm();
  }

  function handleCancelEdit() {
    clearForm();
    onCancelEdit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-5 text-2xl font-bold">
        {accountBeingEdited ? "Edit Account" : "Add Account"}
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

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-500"
      >
        {accountBeingEdited ? "Save Changes" : "Add Account"}
      </button>

      {accountBeingEdited && (
        <button
          type="button"
          onClick={handleCancelEdit}
          className="mt-2 w-full rounded-lg bg-gray-500 p-3 text-white hover:bg-gray-400"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}
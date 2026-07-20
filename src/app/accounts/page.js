"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AccountForm from "@/components/AccountForm";
import {getAccounts, saveAccounts} from "@/lib/storage";

export default function AccountsPage() {
  const [accountList, setAccountList] = useState([]);

  useEffect(function () {
    const savedAccounts = getAccounts();

    setAccountList(savedAccounts);
  }, []);

  function handleAddAccount(accountData) {
    let accountAlreadyExists = false;

    for (let i = 0; i < accountList.length; i++) {
      const account = accountList[i];

      if (account.name.toLowerCase() === accountData.name.toLowerCase()) {
        accountAlreadyExists = true;
      }
    }

    if (accountAlreadyExists) {
      alert("An account with this name already exists.");
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: accountData.name,
      openingBalance: accountData.openingBalance,
    };

    const updatedAccountList = accountList.slice();

    updatedAccountList.push(newAccount);

    setAccountList(updatedAccountList);
    saveAccounts(updatedAccountList);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full flex-col items-start gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-96 lg:shrink-0">
          <AccountForm onSubmit={handleAddAccount} />
        </div>

        <section className="w-full min-w-0 flex-1 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">
            Your Accounts
          </h2>

          {accountList.length === 0 ? (
            <p className="text-gray-500">
              No accounts have been added yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accountList.map(function (account) {
                return (
                  <div
                    key={account.id}
                    className="rounded-xl border bg-blue-100 p-4"
                  >
                    <h3 className="text-lg font-bold">
                      {account.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      Opening Balance
                    </p>

                    <p className="text-2xl font-bold text-blue-700">
                      {account.openingBalance}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
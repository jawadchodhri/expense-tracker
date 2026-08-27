"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AccountForm from "@/components/AccountForm";
import { getIncome, getExpenses } from "@/lib/storage";
import {
  calculateAccountBalance,
  calculateTotalAccountsBalance,
} from "@/lib/Calculation";

export default function AccountsPage() {
  const [accountList, setAccountList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [accountBeingEdited, setAccountBeingEdited] = useState(null);

  useEffect(function () {
    const timer = setTimeout(function () {
      const savedIncome = getIncome();
      const savedExpenses = getExpenses();

      setIncomeList(savedIncome);
      setExpenseList(savedExpenses);
    }, 0);

    async function loadAccounts() {
      try {
        const response = await fetch("http://localhost:5000/api/accounts", {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setAccountList(data.accounts);
      } catch (error) {
        alert("Could not load accounts from the backend.");
      }
    }

    loadAccounts();

    return function () {
      clearTimeout(timer);
    };
  }, []);

  const totalBalance = calculateTotalAccountsBalance(
    accountList,
    incomeList,
    expenseList,
  );

  async function handleAddAccount(accountData) {
    try {
      const response = await fetch("http://localhost:5000/api/accounts", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name: accountData.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedAccountList = accountList.slice();

      updatedAccountList.unshift(data.account);

      setAccountList(updatedAccountList);
    } catch (error) {
      alert("Could not create the account.");
    }
  }

  async function handleUpdateAccount(accountData) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/" + accountBeingEdited.id,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: accountData.name,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedAccountList = [];

      for (let i = 0; i < accountList.length; i++) {
        const account = accountList[i];

        if (String(account.id) === String(data.account.id)) {
          updatedAccountList.push(data.account);
        } else {
          updatedAccountList.push(account);
        }
      }

      setAccountList(updatedAccountList);
      setAccountBeingEdited(null);
    } catch (error) {
      alert("Could not update the account.");
    }
  }

  async function handleDeleteAccount(accountId) {
    let accountHasTransactions = false;

    for (let i = 0; i < incomeList.length; i++) {
      const income = incomeList[i];

      if (String(income.accountId) === String(accountId)) {
        accountHasTransactions = true;
      }
    }

    for (let i = 0; i < expenseList.length; i++) {
      const expense = expenseList[i];

      if (String(expense.accountId) === String(accountId)) {
        accountHasTransactions = true;
      }
    }

    if (accountHasTransactions) {
      alert("This account cannot be deleted because it has transactions.");
      return;
    }

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this account?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/" + accountId,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedAccountList = [];

      for (let i = 0; i < accountList.length; i++) {
        const account = accountList[i];

        if (String(account.id) !== String(data.accountId)) {
          updatedAccountList.push(account);
        }
      }

      setAccountList(updatedAccountList);

      if (
        accountBeingEdited &&
        String(accountBeingEdited.id) === String(data.accountId)
      ) {
        setAccountBeingEdited(null);
      }
    } catch (error) {
      alert("Could not delete the account.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full flex-col items-start gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-96 lg:shrink-0">
          <AccountForm
            key={accountBeingEdited ? accountBeingEdited.id : "new-account"}
            onSubmit={
              accountBeingEdited ? handleUpdateAccount : handleAddAccount
            }
            accountBeingEdited={accountBeingEdited}
            onCancelEdit={function () {
              setAccountBeingEdited(null);
            }}
          />
        </div>

        <section className="w-full min-w-0 flex-1 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Your Accounts</h2>
          <div className="mb-6 rounded-xl bg-blue-600 p-5 text-white">
            <p className="text-sm">Total Balance</p>
            <p className="text-3xl font-bold">{totalBalance}</p>
          </div>

          {accountList.length === 0 ? (
            <p className="text-gray-500">No accounts have been added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accountList.map(function (account) {
                const accountBalance = calculateAccountBalance(
                  account.id,
                  incomeList,
                  expenseList,
                );

                return (
                  <div
                    key={account.id}
                    className="rounded-xl border bg-blue-100 p-4"
                  >
                    <h3 className="text-lg font-bold">{account.name}</h3>

                    <p className="mt-2 text-sm text-gray-600">
                      Current Balance
                    </p>

                    <p className="text-2xl font-bold text-blue-700">
                      {accountBalance}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={function () {
                          setAccountBeingEdited(account);
                        }}
                        className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-400"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={function () {
                          handleDeleteAccount(account.id);
                        }}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </div>
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

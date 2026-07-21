"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeForm from "@/components/IncomeForm";
import { getIncome, saveIncome, getAccounts, saveAccounts } from "@/lib/storage";
import { calculateTotal } from "@/lib/Calculation";
import TransactionList from "@/components/TransactionList";

export default function IncomePage() {
  const [incomeList, setIncomeList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [incomeBeingEdited, setIncomeBeingEdited] = useState(null);
  const totalIncome = calculateTotal(incomeList); 

  useEffect(function () {
    const savedIncome = getIncome();
    const savedAccounts = getAccounts();

    setIncomeList(savedIncome);
    setAccountList(savedAccounts);
  }, []);

  function handleCreateAccount(accountName) {
  for (let i = 0; i < accountList.length; i++) {
    const account = accountList[i];

    if (account.name.toLowerCase() === accountName.toLowerCase()) {
      alert("An account with this name already exists.");
      return null;
    }
  }

  const newAccount = {
    id: Date.now(),
    name: accountName,
    openingBalance: 0,
  };

  const updatedAccountList = accountList.slice();

  updatedAccountList.push(newAccount);

  setAccountList(updatedAccountList);
  saveAccounts(updatedAccountList);

  return newAccount.id;
}

  function handleAddIncome(incomeData) {
    const newIncome = {
      id: Date.now(),
      title: incomeData.title,
      amount: incomeData.amount,
      category: incomeData.category,
      accountId: incomeData.accountId,
      date: incomeData.date,
    };

    const updatedIncomeList = incomeList.slice();

    updatedIncomeList.push(newIncome);

    setIncomeList(updatedIncomeList);
    saveIncome(updatedIncomeList);
  }

  function handleUpdateIncome(incomeData) {
    const updatedIncomeList = [];

    for (let i = 0; i < incomeList.length; i++) {
      const income = incomeList[i];

      if (income.id === incomeBeingEdited.id) {
        const updatedIncome = {
          id: income.id,
          title: incomeData.title,
          amount: incomeData.amount,
          category: incomeData.category,
          accountId: incomeData.accountId,
          date: incomeData.date,
        };

        updatedIncomeList.push(updatedIncome);
      } else {
        updatedIncomeList.push(income);
      }
    }

    setIncomeList(updatedIncomeList);
    saveIncome(updatedIncomeList);
    setIncomeBeingEdited(null);
  }

  function handleDeleteIncome(incomeId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this income?",
    );

    if (!shouldDelete) {
      return;
    }

    const updatedIncomeList = [];

    for (let i = 0; i < incomeList.length; i++) {
      const income = incomeList[i];

      if (income.id !== incomeId) {
        updatedIncomeList.push(income);
      }
    }

    setIncomeList(updatedIncomeList);
    saveIncome(updatedIncomeList);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full flex-col items-start gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-96 lg:shrink-0">
          <IncomeForm
            onSubmit={incomeBeingEdited ? handleUpdateIncome : handleAddIncome}
            incomeBeingEdited={incomeBeingEdited}
            accounts={accountList}
            onCreateAccount={handleCreateAccount}
            onCancelEdit={function () {
              setIncomeBeingEdited(null);
            }}
          />
        </div>
        <TransactionList
          title="Saved Income"
          totalLabel="Total Income"
          total={totalIncome}
          transactions={incomeList}
          emptyMessage="No income has been added yet."
          onEdit={function (income) {
            setIncomeBeingEdited(income);
          }}
          onDelete={handleDeleteIncome}
        />
      </div>
    </main>
  );
}

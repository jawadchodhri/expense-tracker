"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeForm from "@/components/IncomeForm";
import { getIncome, saveIncome, getAccounts } from "@/lib/storage";
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
            key={incomeBeingEdited ? incomeBeingEdited.id : "new-income"}
            onSubmit={incomeBeingEdited ? handleUpdateIncome : handleAddIncome}
            incomeBeingEdited={incomeBeingEdited}
            accounts={accountList}
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
          transactionType="income"
          accounts={accountList}
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

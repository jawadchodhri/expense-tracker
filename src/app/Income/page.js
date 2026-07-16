"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeForm from "@/components/IncomeForm";
import { getIncome, saveIncome } from "@/lib/storage";
import { calculateTotal } from "@/lib/Calculation";

export default function IncomePage() {
  const [incomeList, setIncomeList] = useState([]);
  const totalIncome = calculateTotal(incomeList);

  useEffect(function () {
    const savedIncome = getIncome();

    setIncomeList(savedIncome);
  }, []);

  function handleAddIncome(incomeData) {
    const newIncome = {
      id: Date.now(),
      title: incomeData.title,
      amount: incomeData.amount,
      category: incomeData.category,
      date: incomeData.date,
    };

    const updatedIncomeList = incomeList.slice();

    updatedIncomeList.push(newIncome);

    setIncomeList(updatedIncomeList);
    saveIncome(updatedIncomeList);
  }


  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto grid max-w-5xl gap-6 p-6 md:grid-cols-2">
        <IncomeForm onSubmit={handleAddIncome} />

        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Saved Income</h2>

          <div className="mb-4 rounded-lg bg-green-400 p-4">
            <p className="text-sm font-bold text-white">Total Income</p>

            <p className="text-2xl font-bold text-green-700">{totalIncome}</p>
          </div>

          {incomeList.length === 0 ? (
            <p className="text-gray-500">No income has been added yet.</p>
          ) : (
            <div className="space-y-3">
              {incomeList.map(function (income) {
                return (
                  <div key={income.id} className="rounded-lg bg-green-200 border p-3">
                    <h3 className="font-bold">{income.title}</h3>

                    <p>Amount: {income.amount}</p>
                    <p>Category: {income.category}</p>
                    <p>Date: {income.date}</p>
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

"use client";

import Navbar from "@/components/Navbar";
import IncomeForm from "@/components/IncomeForm";

export default function IncomePage() {
  function handleAddIncome(incomeData) {
    console.log("Submitted income:", incomeData);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center p-6">
        <IncomeForm onSubmit={handleAddIncome} />
      </div>
    </main>
  );
}
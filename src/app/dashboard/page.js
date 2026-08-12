"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { getSession, getIncome, getExpenses, getAccounts } from "@/lib/storage";
import { calculateTotal, calculateBalance } from "@/lib/Calculation";
import RecentTransactions from "@/components/RecentTransactions";
import Charts from "@/components/Charts";
import CategoryCharts from "@/components/CategoryCharts";

export default function DashboardPage() {
  const router = useRouter();

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(
    function () {
      const session = getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUserName(session.name);

      const savedIncome = getIncome();
      const savedExpenses = getExpenses();
      const savedAccounts = getAccounts();

      setIncomeList(savedIncome);
      setExpenseList(savedExpenses);
      setAccountList(savedAccounts);
    },
    [router],
  );

  const totalIncome = calculateTotal(incomeList);
  const totalExpenses = calculateTotal(expenseList);
  const currentBalance = calculateBalance(incomeList, expenseList);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="p-6">
        <h1 className="text-3xl font-bold">Welcome, {userName || "User"}</h1>{" "}
        <p className="mt-1 text-gray-600">
          Here is a summary of your finances.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Income"
            value={`PKR ${totalIncome.toLocaleString()}`}
            color="green"
          />

          <StatCard
            title="Total Expenses"
            value={`PKR ${totalExpenses.toLocaleString()}`}
            color="red"
          />

          <StatCard
            title="Current Balance"
            value={`PKR ${currentBalance.toLocaleString()}`}
            color="blue"
          />

          <StatCard
            title="Total Accounts"
            value={accountList.length}
            color="purple"
          />
        </div>
        <div className="mt-6 space-y-6">
          <Charts incomeList={incomeList} expenseList={expenseList} />
          <CategoryCharts incomeList={incomeList} expenseList={expenseList} />
        </div>
        <div className="mt-6">
          <RecentTransactions
            incomeList={incomeList}
            expenseList={expenseList}
            accounts={accountList}
          />
        </div>
      </section>
    </main>
  );
}

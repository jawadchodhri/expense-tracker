"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { calculateTotal, calculateBalance } from "@/lib/Calculation";
import RecentTransactions from "@/components/RecentTransactions";
import Charts from "@/components/Charts";
import CategoryCharts from "@/components/CategoryCharts";

export default function DashboardPage() {

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(function () {
  async function loadDashboardData() {
    try {
      const userResponse = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          credentials: "include",
        },
      );

      const incomeResponse = await fetch(
        "http://localhost:5000/api/income",
        {
          credentials: "include",
        },
      );

      const expensesResponse = await fetch(
        "http://localhost:5000/api/expenses",
        {
          credentials: "include",
        },
      );

      const accountsResponse = await fetch(
        "http://localhost:5000/api/accounts",
        {
          credentials: "include",
        },
      );

      const userData =
        await userResponse.json();

      const incomeData =
        await incomeResponse.json();

      const expensesData =
        await expensesResponse.json();

      const accountsData =
        await accountsResponse.json();

      if (!userResponse.ok) {
        alert(userData.message);
        return;
      }

      if (!incomeResponse.ok) {
        alert(incomeData.message);
        return;
      }

      if (!expensesResponse.ok) {
        alert(expensesData.message);
        return;
      }

      if (!accountsResponse.ok) {
        alert(accountsData.message);
        return;
      }

      setUserName(userData.user.name);
      setIncomeList(incomeData.income);
      setExpenseList(expensesData.expenses);
      setAccountList(accountsData.accounts);
    } catch (error) {
      alert(
        "Could not load the dashboard.",
      );
    }
  }

  loadDashboardData();
}, []);

  const totalIncome = calculateTotal(incomeList);
  const totalExpenses = calculateTotal(expenseList);
  const currentBalance = calculateBalance(incomeList, expenseList);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="p-6">
        <h1 className="text-3xl font-bold">Welcome, {userName || "User"}</h1>{" "}
        <p className="mt-1 text-gray-600">Here is a summary of your finances.</p>
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

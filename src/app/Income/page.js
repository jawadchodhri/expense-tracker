"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeForm from "@/components/IncomeForm";
import { calculateTotal } from "@/lib/Calculation";
import TransactionList from "@/components/TransactionList";

export default function IncomePage() {
  const [incomeList, setIncomeList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [incomeBeingEdited, setIncomeBeingEdited] = useState(null);
  const totalIncome = calculateTotal(incomeList);

  useEffect(function () {
    async function loadPageData() {
      try {
        const incomeResponse = await fetch("http://localhost:5000/api/income", {
          credentials: "include",
        });

        const accountsResponse = await fetch(
          "http://localhost:5000/api/accounts",
          {
            credentials: "include",
          },
        );

        const incomeData = await incomeResponse.json();

        const accountsData = await accountsResponse.json();

        if (!incomeResponse.ok) {
          alert(incomeData.message);
          return;
        }

        if (!accountsResponse.ok) {
          alert(accountsData.message);
          return;
        }

        setIncomeList(incomeData.income);
        setAccountList(accountsData.accounts);
      } catch (error) {
        alert("Could not load income and accounts.");
      }
    }

    loadPageData();
  }, []);

  async function reloadIncomeList() {
    try {
      const response = await fetch("http://localhost:5000/api/income", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      setIncomeList(data.income);

      return true;
    } catch (error) {
      return false;
    }
  }

  async function handleAddIncome(incomeData) {
    try {
      const response = await fetch("http://localhost:5000/api/income", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          title: incomeData.title,
          amount: incomeData.amount,
          category: incomeData.category,
          accountId: incomeData.accountId,
          date: incomeData.date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedIncomeList = incomeList.slice();

      updatedIncomeList.unshift(data.income);

      setIncomeList(updatedIncomeList);
    } catch (error) {
      const listWasReloaded = await reloadIncomeList();

      if (listWasReloaded) {
        alert(
          "The connection was interrupted. The latest income list has been reloaded. Check the list before adding it again.",
        );
        return;
      }

      alert("Could not create the income.");
    }
  }

  async function handleUpdateIncome(incomeData) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/income/" + incomeBeingEdited.id,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: incomeData.title,
            amount: incomeData.amount,
            category: incomeData.category,
            accountId: incomeData.accountId,
            date: incomeData.date,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedIncomeList = [];

      for (let i = 0; i < incomeList.length; i++) {
        const income = incomeList[i];

        if (String(income.id) === String(data.income.id)) {
          updatedIncomeList.push(data.income);
        } else {
          updatedIncomeList.push(income);
        }
      }

      setIncomeList(updatedIncomeList);
      setIncomeBeingEdited(null);
    } catch (error) {
      alert("Could not update the income.");
    }
  }

  async function handleDeleteIncome(incomeId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this income?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/income/" + incomeId,
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

      const updatedIncomeList = [];

      for (let i = 0; i < incomeList.length; i++) {
        const income = incomeList[i];

        if (String(income.id) !== String(data.incomeId)) {
          updatedIncomeList.push(income);
        }
      }

      setIncomeList(updatedIncomeList);

      if (
        incomeBeingEdited &&
        String(incomeBeingEdited.id) === String(data.incomeId)
      ) {
        setIncomeBeingEdited(null);
      }
    } catch (error) {
      alert("Could not delete the income.");
    }
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

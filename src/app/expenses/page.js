"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ExpenseForm from "@/components/ExpenseForm";
import TransactionList from "@/components/TransactionList";
import { calculateTotal, calculateAccountBalance } from "@/lib/Calculation";

export default function ExpensePage() {
  const [expenseList, setExpenseList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseBeingEdited, setExpenseBeingEdited] = useState(null);

  const totalExpenses = calculateTotal(expenseList);

  useEffect(function () {
    async function loadPageData() {
      try {
        const expensesResponse = await fetch(
          "http://localhost:5000/api/expenses",
          {
            credentials: "include",
          },
        );

        const incomeResponse = await fetch("http://localhost:5000/api/income", {
          credentials: "include",
        });

        const accountsResponse = await fetch(
          "http://localhost:5000/api/accounts",
          {
            credentials: "include",
          },
        );

        const expensesData = await expensesResponse.json();

        const incomeData = await incomeResponse.json();

        const accountsData = await accountsResponse.json();

        if (!expensesResponse.ok) {
          alert(expensesData.message);
          return;
        }

        if (!incomeResponse.ok) {
          alert(incomeData.message);
          return;
        }

        if (!accountsResponse.ok) {
          alert(accountsData.message);
          return;
        }

        setExpenseList(expensesData.expenses);

        setIncomeList(incomeData.income);
        setAccountList(accountsData.accounts);
      } catch (error) {
        alert("Could not load expenses, income, and accounts.");
      }
    }

    loadPageData();
  }, []);

  async function handleAddExpense(expenseData) {
    const accountBalance = calculateAccountBalance(
      expenseData.accountId,
      incomeList,
      expenseList,
    );

    if (expenseData.amount > accountBalance) {
      alert("This account does not have enough balance.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          title: expenseData.title,
          amount: expenseData.amount,
          category: expenseData.category,
          accountId: expenseData.accountId,
          date: expenseData.date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedExpenseList = expenseList.slice();

      updatedExpenseList.unshift(data.expense);

      setExpenseList(updatedExpenseList);
    } catch (error) {
      alert("Could not create the expense.");
    }
  }

  async function handleUpdateExpense(expenseData) {
    let availableBalance = calculateAccountBalance(
      expenseData.accountId,
      incomeList,
      expenseList,
    );

    const isSameAccount =
      String(expenseBeingEdited.accountId) === String(expenseData.accountId);

    if (isSameAccount) {
      availableBalance = availableBalance + Number(expenseBeingEdited.amount);
    }

    if (expenseData.amount > availableBalance) {
      alert("This account does not have enough balance.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/expenses/" + expenseBeingEdited.id,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: expenseData.title,
            amount: expenseData.amount,
            category: expenseData.category,
            accountId: expenseData.accountId,
            date: expenseData.date,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedExpenseList = [];

      for (let i = 0; i < expenseList.length; i++) {
        const expense = expenseList[i];

        if (String(expense.id) === String(data.expense.id)) {
          updatedExpenseList.push(data.expense);
        } else {
          updatedExpenseList.push(expense);
        }
      }

      setExpenseList(updatedExpenseList);
      setExpenseBeingEdited(null);
    } catch (error) {
      alert("Could not update the expense.");
    }
  }

  async function handleDeleteExpense(expenseId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/expenses/" + expenseId,
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

      const updatedExpenseList = [];

      for (let i = 0; i < expenseList.length; i++) {
        const expense = expenseList[i];

        if (String(expense.id) !== String(data.expenseId)) {
          updatedExpenseList.push(expense);
        }
      }

      setExpenseList(updatedExpenseList);

      if (
        expenseBeingEdited &&
        String(expenseBeingEdited.id) === String(data.expenseId)
      ) {
        setExpenseBeingEdited(null);
      }
    } catch (error) {
      alert("Could not delete the expense.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full flex-col items-start gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-96 lg:shrink-0">
          <ExpenseForm
            key={expenseBeingEdited ? expenseBeingEdited.id : "new-expense"}
            onSubmit={
              expenseBeingEdited ? handleUpdateExpense : handleAddExpense
            }
            expenseBeingEdited={expenseBeingEdited}
            accounts={accountList}
            onCancelEdit={function () {
              setExpenseBeingEdited(null);
            }}
          />
        </div>

        <TransactionList
          title="Saved Expenses"
          totalLabel="Total Expenses"
          total={totalExpenses}
          transactions={expenseList}
          transactionType="expense"
          accounts={accountList}
          emptyMessage="No expenses have been added yet."
          onEdit={function (expense) {
            setExpenseBeingEdited(expense);
          }}
          onDelete={handleDeleteExpense}
        />
      </div>
    </main>
  );
}

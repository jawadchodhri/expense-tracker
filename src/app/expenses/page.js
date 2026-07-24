"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ExpenseForm from "@/components/ExpenseForm";
import TransactionList from "@/components/TransactionList";
import { getExpenses, saveExpenses } from "@/lib/storage";
import { calculateTotal } from "@/lib/Calculation";


export default function ExpensePage() {
    const[expenseList, setExpenseList] = useState([])
    const[expenseBeingEdited, setExpenseBeingEdited] = useState(null)

    const totalExpenses = calculateTotal(expenseList)

    useEffect(function (){
        const savedExpense = getExpenses();

        setExpenseList(savedExpense)
    }, [])

    function handleAddExpense(expenseData){
        const newExpense = {
            id: Date.now(),
            title: expenseData.title,
            amount: expenseData.amount,
            category: expenseData.category,
            date: expenseData.date
        }

    const updatedExpenseList = expenseList.slice();

    updatedExpenseList.push(newExpense)
    setExpenseList(updatedExpenseList)
    saveExpenses(updatedExpenseList)
    }

    function handleUpdateExpense(expenseData){
        const updatedExpenseList = [];

        for(let i = 0; i < expenseList.length; i++){
            const expense = expenseList[i]

            if(expense.id === expenseBeingEdited.id){
                const updatedExpense = {
                    id: expense.id,
                    title: expenseData.title,
                    amount: expenseData.amount,
                    category: expenseData.category,
                    date: expenseData.date
                }

                updatedExpenseList.push(updatedExpense)
            } else {
                updatedExpenseList.push(expense)
            }
        }

        setExpenseList(updatedExpenseList)
        saveExpenses(updatedExpenseList)
        setExpenseBeingEdited(null)
    }

    function handleDeleteExpense(expenseId){
        const shouldDelete = window.confirm("Are you sure you want to delete this expense")

        if(!shouldDelete){return}

        const updatedExpenseList = [];

        for(let i = 0; i < expenseList.length; i++){
            const expense = expenseList[i]

            if(expense.id !== expenseId){
                updatedExpenseList.push(expense)
            }
        }
        setExpenseList(updatedExpenseList)
        saveExpenses(updatedExpenseList)
    }



  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full flex-col items-start gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-96 lg:shrink-0">
          <ExpenseForm
            onSubmit={expenseBeingEdited ? handleUpdateExpense : handleAddExpense}
            expenseBeingEdited={expenseBeingEdited}
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
          emptyMessage="No expenses have been added yet."
          onEdit={function (expense) {
            setExpenseBeingEdited(expense);
          }}
          onDelete={handleDeleteExpense}
        />
      </div>
    </main>
  )
}


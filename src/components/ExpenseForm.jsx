"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";

export default function ExpenseForm({
  onSubmit,
  expenseBeingEdited,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(
    function () {
      if (expenseBeingEdited) {
        setTitle(expenseBeingEdited.title);
        setAmount(String(expenseBeingEdited.amount));
        setCategory(expenseBeingEdited.category);
        setDate(expenseBeingEdited.date);
      }
    },
    [expenseBeingEdited],
  );

  function clearForm() {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "" || amount === "" || category.trim() === "" || date === "") {
      alert("Please fill all the fields.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
      date: date,
    };

    onSubmit(expenseData);
    clearForm();
  }

  function handleCancelEdit() {
    clearForm();
    onCancelEdit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-5 text-2xl font-bold">
        {expenseBeingEdited ? "Edit Expense" : "Add Expense"}
      </h2>

      <InputField
        name="title"
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={function (event) {
          setTitle(event.target.value);
        }}
      />

      <InputField
        name="amount"
        type="number"
        placeholder="Expense amount"
        value={amount}
        onChange={function (event) {
          setAmount(event.target.value);
        }}
      />

      <InputField
        name="category"
        type="text"
        placeholder="Expense category"
        value={category}
        onChange={function (event) {
          setCategory(event.target.value);
        }}
      />

      <InputField
        name="date"
        type="date"
        value={date}
        onChange={function (event) {
          setDate(event.target.value);
        }}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-red-600 p-3 text-white hover:bg-red-500"
      >
        {expenseBeingEdited ? "Save Changes" : "Add Expense"}
      </button>

      {expenseBeingEdited && (
        <button
          type="button"
          onClick={handleCancelEdit}
          className="mt-2 w-full rounded-lg bg-gray-500 p-3 text-white hover:bg-gray-400"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}
import { useState } from 'react'
import InputField from '@/components/InputField'

export default function IncomeForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "" || amount === "" || category.trim() === "" || date === "") {
            alert("Please fill all the fields");
            return
        }

        if (Number(amount) <= 0) {
            alert("Amount must be greater then zero")
            return
        }

        const incomeData = {
            title: title.trim(),
            amount: Number(amount),
            category: category.trim(),
            date: date,
        }

        onSubmit(incomeData)

        setTitle("");
        setAmount("");
        setDate("");
        setCategory("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-md"
        >
            <h2 className="mb-5 text-2xl font-bold">
                Add Income
            </h2>

            <InputField
                name="title"
                type="text"
                placeholder="Income title"
                value={title}
                onChange={function (event) {
                    setTitle(event.target.value);
                }}
            />

            <InputField
                name="amount"
                type="number"
                placeholder="Income amount"
                value={amount}
                onChange={function (event) {
                    setAmount(event.target.value);
                }}
            />

            <InputField
                name="category"
                type="text"
                placeholder="Income category"
                value={category}
                onChange={function (event) {
                    setCategory(event.target.value);
                }}
            />

            <InputField
                name="date"
                type="date"
                placeholder="Income date"
                value={date}
                onChange={function (event) {
                    setDate(event.target.value);
                }}
            />

            <button
                type="submit"
                className="w-full rounded-lg bg-green-600 p-3 text-white hover:bg-green-500"
            >
                Add Income
            </button>
        </form>
    )
}

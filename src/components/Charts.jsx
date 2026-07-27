"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { groupByMonth } from "@/lib/Calculation";

export default function Charts({
  incomeList,
  expenseList,
}) {
  const incomeByMonth = groupByMonth(incomeList);
  const expensesByMonth = groupByMonth(expenseList);

  const chartData = [];

  for (let i = 0; i < incomeByMonth.length; i++) {
    const incomeMonth = incomeByMonth[i];

    chartData.push({
      month: incomeMonth.month,
      income: incomeMonth.total,
      expenses: 0,
    });
  }

  for (let i = 0; i < expensesByMonth.length; i++) {
    const expenseMonth = expensesByMonth[i];
    let monthAlreadyExists = false;

    for (let j = 0; j < chartData.length; j++) {
      if (chartData[j].month === expenseMonth.month) {
        chartData[j].expenses = expenseMonth.total;
        monthAlreadyExists = true;
      }
    }

    if (!monthAlreadyExists) {
      chartData.push({
        month: expenseMonth.month,
        income: 0,
        expenses: expenseMonth.total,
      });
    }
  }

  chartData.sort(function (firstMonth, secondMonth) {
    return new Date(firstMonth.month) - new Date(secondMonth.month);
  });

  return (
    <section className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Income and Expenses
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500">
          Add some transactions to see your chart.
        </p>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#16a34a"
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#dc2626"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
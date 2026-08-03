"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { groupByMonth, groupByCategory } from "@/lib/Calculation";

const incomeColors = [
  "#166534",
  "#16a34a",
  "#22c55e",
  "#4ade80",
  "#86efac",
];

const expenseColors = [
  "#991b1b",
  "#dc2626",
  "#ef4444",
  "#f97316",
  "#f59e0b",
];

function CategoryPieChart({
  title,
  data,
  colors,
  emptyMessage,
}) {
  const coloredData = [];

  for (let i = 0; i < data.length; i++) {
    const category = data[i];
    const categoryColor = colors[i % colors.length];

    coloredData.push({
      ...category,
      fill: categoryColor,
    });
  }
  function renderPieSlice(props) {
  return <Sector {...props} />;
}

  return (
    <section className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        {title}
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          {emptyMessage}
        </p>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={coloredData}
                dataKey="total"
                nameKey="category"
                innerRadius={55}
                outerRadius={100}
                paddingAngle={3}
                shape={renderPieSlice}
              />

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default function Charts({
  incomeList,
  expenseList,
}) {
  const incomeByMonth = groupByMonth(incomeList);
  const expensesByMonth = groupByMonth(expenseList);
  const incomeByCategory = groupByCategory(incomeList);
  const expensesByCategory = groupByCategory(expenseList);

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
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
        <h2 className="mb-6 text-2xl font-bold">
          Monthly Income and Expenses
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

      <CategoryPieChart
        title="Income by Category"
        data={incomeByCategory}
        colors={incomeColors}
        emptyMessage="Add some income to see this chart."
      />

      <CategoryPieChart
        title="Expenses by Category"
        data={expensesByCategory}
        colors={expenseColors}
        emptyMessage="Add some expenses to see this chart."
      />
    </div>
  );
}
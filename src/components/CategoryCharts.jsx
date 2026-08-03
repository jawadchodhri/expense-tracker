"use client";

import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

import { groupByCategory } from "@/lib/Calculation";

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

export default function CategoryCharts({
  incomeList,
  expenseList,
}) {
  const incomeByCategory = groupByCategory(incomeList);
  const expensesByCategory = groupByCategory(expenseList);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
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
export function calculateTotal(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    const amount = Number(item.amount);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}

export function calculateBalance(income, expenses) {
  const totalIncome = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);

  return totalIncome - totalExpenses;
}

export function calculateSavings(income, expenses) {
  return calculateBalance(income, expenses);
}

export function groupByCategory(items) {
  if (!Array.isArray(items)) return [];

  const categoryMap = {};

  items.forEach((item) => {
    const category = item.category || "Other";
    const amount = Number(item.amount);

    if (!Number.isFinite(amount)) return;

    categoryMap[category] = (categoryMap[category] || 0) + amount;
  });

  return Object.entries(categoryMap).map(([category, total]) => ({
    category,
    total,
  }));
} 

export function groupByMonth(items) {
  if (!Array.isArray(items)) return [];

  const monthMap = {};

  items.forEach((item) => {
    if (!item.date) return;

    const date = new Date(item.date);
    if (Number.isNaN(date.getTime())) return;

    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const amount = Number(item.amount);
    if (!Number.isFinite(amount)) return;

    monthMap[month] = (monthMap[month] || 0) + amount;
  });

  return Object.entries(monthMap).map(([month, total]) => ({
    month,
    total,
  }));
}
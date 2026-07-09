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
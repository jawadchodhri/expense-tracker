export function calculateTotal(items) {
  if (!Array.isArray(items)) {
    return 0;
  }

  let total = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const amount = Number(item.amount);

    if (Number.isFinite(amount)) {
      total = total + amount;
    }
  }

  return total;
}

export function calculateBalance(income, expenses) {
  const totalIncome = calculateTotal(income);
  const totalExpenses = calculateTotal(expenses);

  const balance = totalIncome - totalExpenses;

  return balance;
}

export function calculateSavings(income, expenses) {
  const savings = calculateBalance(income, expenses);

  return savings;
}

export function groupByCategory(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const categoryTotals = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    let category = item.category;

    if (!category) {
      category = "Other";
    }

    const amount = Number(item.amount);

    if (!Number.isFinite(amount)) {
      continue;
    }

    if (categoryTotals[category] === undefined) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] =
      categoryTotals[category] + amount;
  }

  const groupedCategories = [];
  const categoryNames = Object.keys(categoryTotals);

  for (let index = 0; index < categoryNames.length; index++) {
    const categoryName = categoryNames[index];

    const categoryData = {
      category: categoryName,
      total: categoryTotals[categoryName],
    };

    groupedCategories.push(categoryData);
  }

  return groupedCategories;
}

export function groupByMonth(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const monthTotals = {};

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    if (!item.date) {
      continue;
    }

    const date = new Date(item.date);

    if (Number.isNaN(date.getTime())) {
      continue;
    }

    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const amount = Number(item.amount);

    if (!Number.isFinite(amount)) {
      continue;
    }

    if (monthTotals[month] === undefined) {
      monthTotals[month] = 0;
    }

    monthTotals[month] = monthTotals[month] + amount;
  }

  const groupedMonths = [];
  const monthNames = Object.keys(monthTotals);

  for (let index = 0; index < monthNames.length; index++) {
    const monthName = monthNames[index];

    const monthData = {
      month: monthName,
      total: monthTotals[monthName],
    };

    groupedMonths.push(monthData);
  }

  return groupedMonths;
}
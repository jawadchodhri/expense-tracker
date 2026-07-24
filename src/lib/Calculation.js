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

export function calculateAccountBalance(
  accountId,
  incomeList,
  expenseList,
) {
  let balance = 0;

  if (Array.isArray(incomeList)) {
    for (let i = 0; i < incomeList.length; i++) {
      const income = incomeList[i];

      if (String(income.accountId) === String(accountId)) {
        const amount = Number(income.amount);

        if (Number.isFinite(amount)) {
          balance = balance + amount;
        }
      }
    }
  }

  if (Array.isArray(expenseList)) {
    for (let i = 0; i < expenseList.length; i++) {
      const expense = expenseList[i];

      if (
        String(expense.accountId) === String(accountId)
      ) {
        const amount = Number(expense.amount);

        if (Number.isFinite(amount)) {
          balance = balance - amount;
        }
      }
    }
  }

  return balance;
}

export function calculateTotalAccountsBalance(
  accounts,
  incomeList,
  expenseList,
) {
  if (!Array.isArray(accounts)) {
    return 0;
  }

  let totalBalance = 0;

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];

    const accountBalance = calculateAccountBalance(
      account.id,
      incomeList,
      expenseList,
    );

    totalBalance = totalBalance + accountBalance;
  }

  return totalBalance;
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

    categoryTotals[category] = categoryTotals[category] + amount;
  }

  const groupedCategories = [];
  const categoryNames = Object.keys(categoryTotals);

  for (let i = 0; i < categoryNames.length; i++) {
    const categoryName = categoryNames[i];

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

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

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

  for (let i = 0; i < monthNames.length; i++) {
    const monthName = monthNames[i];

    const monthData = {
      month: monthName,
      total: monthTotals[monthName],
    };

    groupedMonths.push(monthData);
  }

  return groupedMonths;
}
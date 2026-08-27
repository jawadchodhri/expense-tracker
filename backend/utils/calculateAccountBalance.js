import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export async function calculateAccountBalance(userId, accountId) {
  const incomeResults = await Income.aggregate([
    {
      $match: {
        userId: userId,
        accountId: accountId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const expenseResults = await Expense.aggregate([
    {
      $match: {
        userId: userId,
        accountId: accountId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpenses = 0;

  if (incomeResults.length > 0) {
    totalIncome = incomeResults[0].total;
  }

  if (expenseResults.length > 0) {
    totalExpenses = expenseResults[0].total;
  }

  const balance = totalIncome - totalExpenses;

  return balance;
}

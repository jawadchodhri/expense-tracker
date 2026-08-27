import mongoose from "mongoose";

import Account from "../models/Account.js";
import Expense from "../models/Expense.js";

import { calculateAccountBalance } from "../utils/calculateAccountBalance.js";

function formatExpense(expense) {
  return {
    id: expense._id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    accountId: expense.accountId,
  };
}

export async function getExpenses(request, response) {
  try {
    const expenseList = await Expense.find({
      userId: request.user._id,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    const formattedExpenses = [];

    for (let i = 0; i < expenseList.length; i++) {
      formattedExpenses.push(formatExpense(expenseList[i]));
    }

    return response.status(200).json({
      expenses: formattedExpenses,
    });
  } catch (error) {
    console.error("Getting expenses failed:", error.message);

    return response.status(500).json({
      message: "Could not get expenses.",
    });
  }
}

export async function createExpense(request, response) {
  try {
    const { title, amount, category, date, accountId } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof category !== "string" ||
      category.trim() === "" ||
      typeof date !== "string" ||
      date === ""
    ) {
      return response.status(400).json({
        message: "Please fill all expense fields.",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return response.status(400).json({
        message: "Expense amount must be greater than zero.",
      });
    }

    if (!mongoose.isValidObjectId(accountId)) {
      return response.status(400).json({
        message: "Invalid account ID.",
      });
    }

    const account = await Account.findOne({
      _id: accountId,
      userId: request.user._id,
    });

    if (!account) {
      return response.status(404).json({
        message: "The selected account was not found.",
      });
    }

    const accountBalance = await calculateAccountBalance(
      request.user._id,
      account._id,
    );

    if (numericAmount > accountBalance) {
      return response.status(400).json({
        message: "This account does not have enough balance.",
      });
    }

    const newExpense = await Expense.create({
      title: title.trim(),
      amount: numericAmount,
      category: category.trim(),
      date: date,
      accountId: account._id,
      userId: request.user._id,
    });

    return response.status(201).json({
      message: "Expense created successfully.",
      expense: formatExpense(newExpense),
    });
  } catch (error) {
    console.error("Creating expense failed:", error.message);

    return response.status(500).json({
      message: "Could not create expense.",
    });
  }
}
export async function updateExpense(request, response) {
  try {
    const { expenseId } = request.params;

    const { title, amount, category, date, accountId } = request.body;

    if (!mongoose.isValidObjectId(expenseId)) {
      return response.status(400).json({
        message: "Invalid expense ID.",
      });
    }

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof category !== "string" ||
      category.trim() === "" ||
      typeof date !== "string" ||
      date === ""
    ) {
      return response.status(400).json({
        message: "Please fill all expense fields.",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return response.status(400).json({
        message: "Expense amount must be greater than zero.",
      });
    }

    if (!mongoose.isValidObjectId(accountId)) {
      return response.status(400).json({
        message: "Invalid account ID.",
      });
    }

    const expense = await Expense.findOne({
      _id: expenseId,
      userId: request.user._id,
    });

    if (!expense) {
      return response.status(404).json({
        message: "Expense not found.",
      });
    }

    const account = await Account.findOne({
      _id: accountId,
      userId: request.user._id,
    });

    if (!account) {
      return response.status(404).json({
        message: "The selected account was not found.",
      });
    }

    let availableBalance = await calculateAccountBalance(
      request.user._id,
      account._id,
    );

    const isSameAccount = String(expense.accountId) === String(account._id);

    if (isSameAccount) {
      availableBalance = availableBalance + Number(expense.amount);
    }

    if (numericAmount > availableBalance) {
      return response.status(400).json({
        message: "This account does not have enough balance.",
      });
    }

    expense.title = title.trim();
    expense.amount = numericAmount;
    expense.category = category.trim();
    expense.date = date;
    expense.accountId = account._id;

    await expense.save();

    return response.status(200).json({
      message: "Expense updated successfully.",
      expense: formatExpense(expense),
    });
  } catch (error) {
    console.error("Updating expense failed:", error.message);

    return response.status(500).json({
      message: "Could not update expense.",
    });
  }
}

export async function deleteExpense(request, response) {
  try {
    const { expenseId } = request.params;

    if (!mongoose.isValidObjectId(expenseId)) {
      return response.status(400).json({
        message: "Invalid expense ID.",
      });
    }

    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: request.user._id,
    });

    if (!deletedExpense) {
      return response.status(404).json({
        message: "Expense not found.",
      });
    }

    return response.status(200).json({
      message: "Expense deleted successfully.",
      expenseId: deletedExpense._id,
    });
  } catch (error) {
    console.error("Deleting expense failed:", error.message);

    return response.status(500).json({
      message: "Could not delete expense.",
    });
  }
}

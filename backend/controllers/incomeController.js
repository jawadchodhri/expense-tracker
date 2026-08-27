import mongoose from "mongoose";

import Account from "../models/Account.js";
import Income from "../models/Income.js";

function formatIncome(income) {
  return {
    id: income._id,
    title: income.title,
    amount: income.amount,
    category: income.category,
    date: income.date,
    accountId: income.accountId,
  };
}

export async function getIncome(
  request,
  response,
) {
  try {
    const incomeList = await Income.find({
      userId: request.user._id,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    const formattedIncome = [];

    for (let i = 0; i < incomeList.length; i++) {
      formattedIncome.push(formatIncome(incomeList[i]));
    }

    return response.status(200).json({
      income: formattedIncome,
    });
  } catch (error) {
    console.error(
      "Getting income failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not get income.",
    });
  }
}

export async function createIncome(
  request,
  response,
) {
  try {
    const {
      title,
      amount,
      category,
      date,
      accountId,
    } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof category !== "string" ||
      category.trim() === "" ||
      typeof date !== "string" ||
      date === ""
    ) {
      return response.status(400).json({
        message: "Please fill all income fields.",
      });
    }

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return response.status(400).json({
        message:
          "Income amount must be greater than zero.",
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
        message:
          "The selected account was not found.",
      });
    }

    const newIncome = await Income.create({
      title: title.trim(),
      amount: numericAmount,
      category: category.trim(),
      date: date,
      accountId: account._id,
      userId: request.user._id,
    });

    return response.status(201).json({
      message: "Income created successfully.",
      income: formatIncome(newIncome),
    });
  } catch (error) {
    console.error(
      "Creating income failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not create income.",
    });
  }
}
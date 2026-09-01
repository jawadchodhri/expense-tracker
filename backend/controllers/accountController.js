import mongoose from "mongoose";

import Account from "../models/Account.js";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

function formatAccount(account) {
  return {
    id: account._id,
    name: account.name,
  };
}

export async function getAccounts(request, response) {
  try {
    const accounts = await Account.find({
      userId: request.user._id,
    }).sort({
      createdAt: -1,
    });

    const formattedAccounts = [];

    for (let i = 0; i < accounts.length; i++) {
      formattedAccounts.push(
        formatAccount(accounts[i]),
      );
    }

    return response.status(200).json({
      accounts: formattedAccounts,
    });
  } catch (error) {
    console.error(
      "Getting accounts failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not get accounts.",
    });
  }
}

export async function createAccount(request, response) {
  try {
    const { name } = request.body;

    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      return response.status(400).json({
        message:
          "Please provide an account name.",
      });
    }

    const cleanName = name.trim();

    const existingAccount =
      await Account.findOne({
        userId: request.user._id,
        name: cleanName,
      }).collation({
        locale: "en",
        strength: 2,
      });

    if (existingAccount) {
      return response.status(409).json({
        message:
          "An account with this name already exists.",
      });
    }

    const newAccount = await Account.create({
      name: cleanName,
      userId: request.user._id,
    });

    return response.status(201).json({
      message: "Account created successfully.",
      account: formatAccount(newAccount),
    });
  } catch (error) {
    console.error(
      "Creating account failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not create account.",
    });
  }
}

export async function updateAccount(
  request,
  response,
) {
  try {
    const { accountId } = request.params;
    const { name } = request.body;

    if (!mongoose.isValidObjectId(accountId)) {
      return response.status(400).json({
        message: "Invalid account ID.",
      });
    }

    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      return response.status(400).json({
        message:
          "Please provide an account name.",
      });
    }

    const cleanName = name.trim();

    const account = await Account.findOne({
      _id: accountId,
      userId: request.user._id,
    });

    if (!account) {
      return response.status(404).json({
        message: "Account not found.",
      });
    }

    const existingAccount =
      await Account.findOne({
        _id: {
          $ne: accountId,
        },
        userId: request.user._id,
        name: cleanName,
      }).collation({
        locale: "en",
        strength: 2,
      });

    if (existingAccount) {
      return response.status(409).json({
        message:
          "An account with this name already exists.",
      });
    }

    account.name = cleanName;

    await account.save();

    return response.status(200).json({
      message: "Account updated successfully.",
      account: formatAccount(account),
    });
  } catch (error) {
    console.error(
      "Updating account failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not update account.",
    });
  }
}

export async function deleteAccount(
  request,
  response,
) {
  try {
    const { accountId } = request.params;

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
        message: "Account not found.",
      });
    }

    const incomeExists = await Income.exists({
      accountId: account._id,
      userId: request.user._id,
    });

    const expenseExists =
      await Expense.exists({
        accountId: account._id,
        userId: request.user._id,
      });

    if (incomeExists || expenseExists) {
      return response.status(409).json({
        message:
          "This account cannot be deleted because it has transactions.",
      });
    }

    await account.deleteOne();

    return response.status(200).json({
      message:
        "Account deleted successfully.",
      accountId: account._id,
    });
  } catch (error) {
    console.error(
      "Deleting account failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Could not delete account.",
    });
  }
}
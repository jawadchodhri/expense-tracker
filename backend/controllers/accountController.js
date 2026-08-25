import Account from "../models/Account.js";

function formatAccount(account) {
  return {
    id: account._id,
    name: account.name,
  };
}

export async function getAccounts(
  request,
  response,
) {
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
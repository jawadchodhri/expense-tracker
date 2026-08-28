"use client";

import { useState } from "react";

export default function TransactionList({
  title,
  totalLabel,
  total,
  transactions,
  accounts = [],
  emptyMessage,
  transactionType = "income",
  onEdit,
  onDelete,
}) {
  const [searchText, setSearchText] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [
    selectedAccountId,
    setSelectedAccountId,
  ] = useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  let summaryColor = "bg-green-100";
  let textColor = "text-green-800";
  let transactionColor = "bg-green-200";
  let amountSign = "+";

  if (transactionType === "expense") {
    summaryColor = "bg-red-100";
    textColor = "text-red-800";
    transactionColor = "bg-red-200";
    amountSign = "-";
  }

  function getAccountName(accountId) {
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];

      if (
        String(account.id) ===
        String(accountId)
      ) {
        return account.name;
      }
    }

    return "Unassigned";
  }

  const categoryList = [];

  for (let i = 0; i < transactions.length; i++) {
    const category =
      transactions[i].category;

    if (
      category &&
      !categoryList.includes(category)
    ) {
      categoryList.push(category);
    }
  }

  categoryList.sort();

  const filteredTransactions = [];
  const cleanSearch =
    searchText.trim().toLowerCase();

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    const accountName = getAccountName(
      transaction.accountId,
    );

    const searchableText = [
      transaction.title,
      transaction.category,
      transaction.amount,
      transaction.date,
      accountName,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      cleanSearch === "" ||
      searchableText.includes(cleanSearch);

    const matchesCategory =
      selectedCategory === "" ||
      transaction.category ===
      selectedCategory;

    const matchesAccount =
      selectedAccountId === "" ||
      String(transaction.accountId) ===
      selectedAccountId;

    const matchesDate =
      selectedDate === "" ||
      transaction.date === selectedDate;

    if (
      matchesSearch &&
      matchesCategory &&
      matchesAccount &&
      matchesDate
    ) {
      filteredTransactions.push(
        transaction,
      );
    }
  }

  const filtersAreActive =
    searchText !== "" ||
    selectedCategory !== "" ||
    selectedAccountId !== "" ||
    selectedDate !== "";

  function clearFilters() {
    setSearchText("");
    setSelectedCategory("");
    setSelectedAccountId("");
    setSelectedDate("");
  }

  return (
    <section className="w-full min-w-0 flex-1 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        {title}
      </h2>

      <div
        className={`mb-4 rounded-lg p-4 ${summaryColor}`}
      >
        <p
          className={`text-sm font-bold ${textColor}`}
        >
          {totalLabel}
        </p>

        <p
          className={`text-2xl font-bold ${textColor}`}
        >
          PKR {Number(total).toLocaleString()}
        </p>
      </div>

      {transactions.length > 0 && (
        <>
          <div className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <label className="text-sm font-medium">
              Search
              <input
                type="search"
                placeholder="Title, amount, category..."
                value={searchText}
                onChange={function (event) {
                  setSearchText(
                    event.target.value,
                  );
                }}
                className="mt-1 w-full rounded-lg border p-3 font-normal"
              />
            </label>

            <label className="text-sm font-medium">
              Category
              <select
                value={selectedCategory}
                onChange={function (event) {
                  setSelectedCategory(
                    event.target.value,
                  );
                }}
                className="mt-1 w-full rounded-lg border p-3 font-normal"
              >
                <option value="">
                  All categories
                </option>

                {categoryList.map(
                  function (category) {
                    return (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    );
                  },
                )}
              </select>
            </label>

            <label className="text-sm font-medium">
              Account
              <select
                value={selectedAccountId}
                onChange={function (event) {
                  setSelectedAccountId(
                    event.target.value,
                  );
                }}
                className="mt-1 w-full rounded-lg border p-3 font-normal"
              >
                <option value="">
                  All accounts
                </option>

                {accounts.map(
                  function (account) {
                    return (
                      <option
                        key={account.id}
                        value={account.id}
                      >
                        {account.name}
                      </option>
                    );
                  },
                )}
              </select>
            </label>

            <label className="text-sm font-medium">
              Date
              <input
                type="date"
                value={selectedDate}
                onChange={function (event) {
                  setSelectedDate(
                    event.target.value,
                  );
                }}
                className="mt-1 w-full rounded-lg border p-3 font-normal"
              />
            </label>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              {filteredTransactions.length} of{" "}
              {transactions.length} transactions
            </p>

            {filtersAreActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500"
              >
                Clear Filters
              </button>
            )}
          </div>
        </>
      )}

      {transactions.length === 0 ? (
        <p className="text-gray-500">
          {emptyMessage}
        </p>
      ) : filteredTransactions.length === 0 ? (
        <p className="text-gray-500">
          No transactions match your search
          and filters.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map(
            function (transaction) {
              const accountName =
                getAccountName(
                  transaction.accountId,
                );

              return (
                <div
                  key={transaction.id}
                  className={`rounded-lg border p-3 ${transactionColor}`}
                >
                  <h3 className="font-bold">
                    {transaction.title}
                  </h3>

                  <p
                    className={`font-semibold ${textColor}`}
                  >
                    {amountSign} PKR{" "}
                    {Number(
                      transaction.amount,
                    ).toLocaleString()}
                  </p>

                  <p>
                    Category:{" "}
                    {transaction.category}
                  </p>

                  <p>
                    Account: {accountName}
                  </p>

                  <p>
                    Date: {transaction.date}
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={function () {
                        onEdit(transaction);
                      }}
                      className="mt-3 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={function () {
                        onDelete(
                          transaction.id,
                        );
                      }}
                      className="mt-3 rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}
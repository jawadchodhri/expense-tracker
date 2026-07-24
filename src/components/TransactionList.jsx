"use client";

export default function TransactionList({
  title,
  totalLabel,
  total,
  transactions,
  accounts = [],
  emptyMessage,
  onEdit,
  onDelete,
}) {
  return (
    <section className="w-full min-w-0 flex-1 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        {title}
      </h2>

      <div className="mb-4 rounded-lg bg-green-400 p-4">
        <p className="text-sm font-bold text-white">
          {totalLabel}
        </p>

        <p className="text-2xl font-bold text-green-700">
          {total}
        </p>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map(function (transaction) {
            let accountName = "Unassigned";

            for (let i = 0; i < accounts.length; i++) {
              const account = accounts[i];

              if (
                String(account.id) ===
                String(transaction.accountId)
              ) {
                accountName = account.name;
                break;
              }
            }
            return (
              <div
                key={transaction.id}
                className="rounded-lg border bg-green-200 p-3"
              >
                <h3 className="font-bold">
                  {transaction.title}
                </h3>

                <p>Amount: {transaction.amount}</p>
                <p>Category: {transaction.category}</p>
                <p>Account: {accountName}</p>
                <p>Date: {transaction.date}</p>

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
                      onDelete(transaction.id);
                    }}
                    className="mt-3 rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
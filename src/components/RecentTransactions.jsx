export default function RecentTransactions({
  incomeList,
  expenseList,
  accounts,
}) {
  const allTransactions = [];

  for (let i = 0; i < incomeList.length; i++) {
    allTransactions.push({...incomeList[i], type: "income"});
  }

  for (let i = 0; i < expenseList.length; i++) {
    allTransactions.push({...expenseList[i], type: "expense"});
  }

  allTransactions.sort(function (firstTransaction, secondTransaction) {
    const firstDate = new Date(firstTransaction.date);
    const secondDate = new Date(secondTransaction.date);

    return secondDate - firstDate;
  });

  const recentTransactions = allTransactions.slice(0, 5);

  function getAccountName(accountId) {
    for (let i = 0; i < accounts.length; i++) {
      if (String(accounts[i].id) === String(accountId)) {
        return accounts[i].name;
      }
    }

    return "Unknown account";
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Recent Transactions
      </h2>

      {recentTransactions.length === 0 ? (<p className="text-gray-500">No transactions have been added yet.</p>)
      : (<div className="space-y-3">
          {recentTransactions.map(function (transaction) {
            const isIncome = transaction.type === "income";

            return (
              <div
                key={`${transaction.type}-${transaction.id}`}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-semibold">{transaction.title}</p>

                  <p className="text-sm text-gray-500">
                    {getAccountName(transaction.accountId)}{" • "}{transaction.date}
                  </p>
                </div>

                <p
                  className={isIncome ? "font-bold text-green-600" : "font-bold text-red-600"}
                >
                  {isIncome ? "+" : "-"} PKR{" "}
                  {Number(transaction.amount).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
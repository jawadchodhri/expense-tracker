import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">
          Expense Tracker
        </h1>

        <p className="text-gray-600">
          Track income, expenses, balance, and savings.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="flex-1 rounded-lg bg-gray-800 px-5 py-3 text-white hover:bg-gray-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="flex-1 rounded-lg border border-gray-800 px-5 py-3 text-gray-800 hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
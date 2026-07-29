export default function StatCard({ title, value, color }) {
  let valueColor = "text-blue-600";

  if (color === "green") {
    valueColor = "text-green-600";
  } else if (color === "red") {
    valueColor = "text-red-600";
  } else if (color === "purple") {
    valueColor = "text-purple-600";
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-md">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <p className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
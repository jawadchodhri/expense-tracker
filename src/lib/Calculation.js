export function calculateTotal(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    const amount = Number(item.amount);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}
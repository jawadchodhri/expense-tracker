export default function InputField({
  name,
  label,
  className = "",
  ...inputProps
}) {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        {...inputProps}
        className={`w-full rounded-lg border p-3 text-gray-700 ${className}`}
      />
    </div>
  );
}
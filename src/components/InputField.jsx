export default function InputField({
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
}) {
  return (
    <div className="mb-3">
      <input
        className="w-full rounded-lg border p-3 text-gray-700"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
    </div>
  );
}
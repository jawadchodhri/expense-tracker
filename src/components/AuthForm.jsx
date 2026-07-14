"use client";

import Link from "next/link";
import InputField from "@/components/InputField";

export default function AuthForm({
  title,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  footerLink,
  onSubmit,
  children,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    onSubmit(values);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-2xl font-bold text-gray-900">
          {title}
        </h1>


        <div className="mt-5">
          {fields.map(function (field) {
            return <InputField
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange} />;
          })}
        </div>

        {children}

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-800 p-3 text-white hover:bg-gray-700"
        >
          {buttonText}
        </button>

        {footerText && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {footerText}{" "}

            {footerLink && footerLinkText && (
              <Link
                href={footerLink}
                className="font-medium text-blue-600 hover:underline"
              >
                {footerLinkText}
              </Link>
            )}
          </p>
        )}
      </form>
    </main>
  );
}
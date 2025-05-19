import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({
  id,
  name,
  value,
  onChange,
  label,
  placeholder = "",
  required = false,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs md:text-sm mb-1">
        {label}
      </label>
      <input
        id={id || name}
        name={name || id}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
        {...props}
      />
    </div>
  );
}

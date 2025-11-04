import { ChangeEvent } from "react";

type FormFieldProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
}

export const FormField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  maxLength,
  minLength,
  className = "",
}: FormFieldProps ) => {
  const baseClassName = `w-full mb-2 p-1 border-2 rounded-md focus:border-blue-500 ${
    error ? "border-pink-500" : "border-[#bccdbc]"
  } ${className}`;

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={baseClassName}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    </div>
  );
};

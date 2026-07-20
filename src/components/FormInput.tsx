import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  rightElement?: ReactNode;
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  rightElement,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-text-primary"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-xl border bg-surface px-4 text-sm outline-none transition placeholder:text-text-secondary/60 focus:ring-4 ${
            rightElement ? "pr-12" : ""
          } ${
            error
              ? "border-danger focus:ring-danger/10"
              : "border-border-light focus:border-primary focus:ring-primary/10"
          }`}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
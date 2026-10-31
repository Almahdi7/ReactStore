import { useId, type ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="label-caps text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        className={`body-md border bg-transparent px-4 py-3 text-ink placeholder:text-muted outline-none transition-colors focus:border-ink ${
          error ? "border-error" : "border-line"
        } ${className}`}
        {...rest}
      />
      {error && <p className="body-sm text-error">{error}</p>}
    </div>
  );
}
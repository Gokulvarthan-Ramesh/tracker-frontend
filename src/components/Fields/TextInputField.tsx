import React, {
  type ChangeEvent,
  type InputHTMLAttributes,
  useId,
  useState,
} from "react";

interface TextInputFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "value"
    | "onChange"
    | "type"
    | "className"
    | "required"
    | "disabled"
    | "prefix"    
    | "suffix"    
  > {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: "text" | "number" | "date" | "email" | "password" | "tel" | "search";
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number | string;
  step?: number | string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  value: controlledValue,
  onChange: controlledOnChange,
  label,
  type = "text",
  className = "",
  required = false,
  disabled = false,
  error,
  helperText,
  prefix,
  suffix,
  min,
  step,
  id: propId,
  ...inputProps // now safe — prefix/suffix are not passed to <input>
}) => {
  const generatedId = useId();
  const inputId = propId || generatedId;

  // ── Uncontrolled mode fallback ────────────────────────────────
  const [internalValue, setInternalValue] = useState<string | number>("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    controlledOnChange?.(e);
  };

  // ── Floating label logic ───────────────────────────────────────
  const hasValue = value != null && String(value).length > 0;
  const isActive = hasValue;

  // ── Classes ────────────────────────────────────────────────────
  const hasError = !!error && !disabled;

  const containerClasses = [
    "flex items-center rounded-xl border bg-gray-800 transition-all duration-200",
    hasError ? "border-red-500 focus-within:border-red-500 shadow-sm shadow-red-500/20" : "border-gray-700 focus-within:border-violet-500",
    disabled ? "opacity-60 cursor-not-allowed" : "",
    "focus-within:ring-2 focus-within:ring-violet-500/30",
  ].filter(Boolean).join(" ");

  const labelClasses = [
    "absolute left-4 origin-left pointer-events-none transition-all duration-200 ease-out",
    hasError ? "text-red-500" : isActive ? "text-violet-500" : "text-gray-400",
    isActive ? "-top-2.5 text-xs scale-90" : "top-1/2 -translate-y-1/2 text-base",
    prefix ? "left-10" : "left-4",
    "peer-focus:text-violet-500",
    "bg-gray-800 px-1 -ml-1",
  ].filter(Boolean).join(" ");

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {/* Floating label wrapper */}
      <div className="relative">
        <div className={containerClasses}>
          {prefix && (
            <span className="pl-4 text-gray-400 pointer-events-none">{prefix}</span>
          )}

          <input
            id={inputId}
            type={type}
            value={value ?? ""}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            min={min}
            step={step}
            placeholder=" " // for floating label accessibility
            className={`peer flex-1 bg-transparent outline-none text-white placeholder-transparent disabled:cursor-not-allowed py-4
              ${prefix ? "pl-2" : "pl-4"}
              ${suffix ? "pr-2" : "pr-4"}
            `}
            {...inputProps}
          />

          {suffix && (
            <span className="pr-4 text-gray-400 pointer-events-none">{suffix}</span>
          )}
        </div>

        {/* Floating Label */}
        <label
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      {/* Error or Helper text */}
      {(error || helperText) && (
        <p
          className={`text-xs mt-1.5 ${hasError ? "text-red-500" : "text-gray-400"}`}
        >
          {hasError ? error : helperText}
        </p>
      )}
    </div>
  );
};

export default TextInputField;
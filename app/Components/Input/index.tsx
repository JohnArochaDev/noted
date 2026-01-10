import { ChangeEvent, useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  type?: InputType;
  onChange?: (value: string) => void;
  isRegistration?: boolean;
  validateAs?: "password" | "username";
  minLength?: number;
  onError?: (error: string | null) => void;
};

type InputType = "person" | "lock";

export const Input = ({
  label,
  placeholder = "",
  value,
  type,
  onChange,
  isRegistration = false,
  validateAs,
  minLength,
  onError,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const [error, setError] = useState<string | null>(null);

  // determine validation mode
  const effectiveMode =
    validateAs || (isRegistration && type === "lock" ? "password" : undefined);

  const defaultMinLength = effectiveMode === "username" ? 3 : 8;
  const actualMinLength = minLength ?? defaultMinLength;

  const validate = (val: string): string | null => {
    if (!effectiveMode) return null;
    if (val.length === 0) return null;

    if (val.length < actualMinLength) {
      return `${label} must be at least ${actualMinLength} characters`;
    }

    // only password gets the extra complexity requirement
    if (effectiveMode === "password") {
      const hasNumberOrSpecial =
        /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
      if (!hasNumberOrSpecial) {
        return "Add a number or special character for better security";
      }
    }

    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // update value
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);

    // run validation only if there's a validation mode
    if (effectiveMode) {
      const validationError = validate(newValue);
      setError(validationError);
      onError?.(validationError);
    } else {
      setError(null);
      onError?.(null);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.innerWrapper}>
        <label className={styles.label}>{label}</label>

        <div className={styles.inputWithIcon}>
          {type && (
            <Image
              src={`/assets/${type}.png`}
              alt={`${label} icon`}
              width={17}
              height={17}
              className={styles.icon}
            />
          )}
          <input
            type={type === "lock" ? "password" : "text"}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

import { ChangeEvent, useState } from "react";

import styles from "./styles.module.scss";

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const Input = ({
  label,
  placeholder = "",
  value,
  onChange,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.innerWrapper}>
        <label className={styles.label}>{label}</label>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

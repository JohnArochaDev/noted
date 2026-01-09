import { ChangeEvent, useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  type?: InputType; // "person" or "lock" — optional
  onChange?: (value: string) => void;
};

type InputType = "person" | "lock";

export const Input = ({
  label,
  placeholder = "",
  value,
  type,
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
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

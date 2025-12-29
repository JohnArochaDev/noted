"use client";
import styles from "./styles.module.scss";

type ButtonType = {
  label: string;
  onClick: () => void;
};

export const Button = (props: ButtonType) => {
  const { label, onClick } = props;

  return (
    <button
      className={styles.button}
      aria-label={label}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
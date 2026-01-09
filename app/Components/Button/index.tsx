import Image from "next/image";

import styles from "./styles.module.scss";

type ButtonPropType = {
  label: string;
  type?: ButtonType;
  onClick: () => void;
  centered?: boolean;
  disabled?: boolean;
  variant?: string;
};

type ButtonType = "newFile" | "newFolder" | "newNode2" | "logout";

export const Button = (props: ButtonPropType) => {
  const {
    label,
    type,
    onClick,
    centered = false,
    disabled = false,
    variant = "",
  } = props;

  return (
    <button
      className={`
    ${styles.button}
    ${variant === "danger" ? styles.danger : ""}
    ${centered ? styles.centered : ""}
    ${disabled ? styles.disabled : ""}
  `
        .replace(/\s+/g, " ")
        .trim()}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {type && (
        <Image
          src={`/assets/${type}.png`}
          alt={`${label} Icon`}
          width={17}
          height={17}
        />
      )}
      {label}
    </button>
  );
};

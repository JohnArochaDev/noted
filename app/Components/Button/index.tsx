import Image from "next/image";

import styles from "./styles.module.scss";

type ButtonPropType = {
  label: string;
  type?: ButtonType;
  onClick: () => void;
  centered?: boolean;
};

type ButtonType = "newFile" | "newFolder" | "newNode2";

export const Button = (props: ButtonPropType) => {
  const { label, type, onClick, centered = false } = props;

  return (
    <button
      className={`${styles.button} ${centered ? styles.centered : ""}`}
      onClick={onClick}
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

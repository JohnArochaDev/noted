import Image from "next/image";

import styles from "./styles.module.scss";

type ButtonPropType = {
  label: string;
  type?: ButtonType;
  onClick: () => void;
};

type ButtonType = "newFile" | "newFolder" | "newNode2";

export const Button = (props: ButtonPropType) => {
  const { label, type, onClick } = props;
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {type && (
          <Image
            src={`/assets/${type}.png`}
            alt="Open Folder Icon"
            width={17}
            height={17}
          />
        )}
        {label}
      </button>
    </div>
  );
};

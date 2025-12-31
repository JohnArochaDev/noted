import styles from "./styles.module.scss";

import Image from "next/image";

type ButtonPropType = {
  label: string;
  type?: ButtonType;
};

type ButtonType = "newFile" | "newFolder" | "newNode2";

export const Button = (props: ButtonPropType) => {
  const { label, type } = props;
  return (
    <div>
      <button className={styles.button}>
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

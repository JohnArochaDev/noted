import styles from "./styles.module.scss";

import Image from "next/image";

type SquareButtonPropType = {
  type?: SquareButtonType;
};

type SquareButtonType = "undo" | "redo" | "save";

export const SquareButton = (props: SquareButtonPropType) => {
  const { type } = props;
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
      </button>
    </div>
  );
};

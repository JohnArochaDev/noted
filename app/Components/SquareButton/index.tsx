import styles from "./styles.module.scss";

import Image from "next/image";

type SquareButtonPropType = {
  type?: SquareButtonType;
  onClick: () => void;
  customStyles?: object;
};

type SquareButtonType = "undo" | "redo" | "save" | "focus" | 'edit';

export const SquareButton = (props: SquareButtonPropType) => {
  const { type, onClick, customStyles } = props;
  return (
    <div>
      <button
        style={customStyles ?? {}}
        className={styles.button}
        onClick={onClick}
      >
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

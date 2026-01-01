import Image from "next/image";

import styles from "./styles.module.scss";

type ThreeDotsType = {
  isHovered: boolean;
};

export const ThreeDots = (props: ThreeDotsType) => {
  const { isHovered } = props;
  return (
    <div className={styles.threeDots}>
      {isHovered && (
        <Image
          src="/assets/threeDots.png"
          alt="Closed Folder Icon"
          width={22}
          height={22}
        />
      )}
    </div>
  );
};

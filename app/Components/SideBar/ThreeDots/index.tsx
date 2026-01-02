import { useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

type ThreeDotsType = {
  isHovered: boolean;
};

export const ThreeDots = (props: ThreeDotsType) => {
  const { isHovered } = props;
  const [imageSrc, setImageSrc] = useState("/assets/threeDots.png");

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImageSrc("/assets/threeDotsSelected.png");
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImageSrc("/assets/threeDots.png");
  };

  return (
    <div className={styles.threeDots} onClick={(e) => e.stopPropagation()}>
      {isHovered && (
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={imageSrc}
            alt="Closed Folder Icon"
            width={22}
            height={22}
          />
        </div>
      )}
    </div>
  );
};

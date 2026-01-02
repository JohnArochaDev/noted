import { useState } from "react";

import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered } = props;

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <>
      {(isHovered || isHovering) && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={styles.popupMenu}
        ></div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered, setEditMode } = props;

  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    if (!isHovered && !isHovering) {
      setEditMode(false);
    }
  }, [isHovered, isHovering, setEditMode]);

  return (
    <>
      {(isHovered || isHovering) && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={styles.popupMenu}
        >
          <div className={styles.option}>Edit</div>
          <div className={styles.option}>Delete</div>
        </div>
      )}
    </>
  );
};

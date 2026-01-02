import { useEffect, useState } from "react";

import { useNodes } from "@/app/Context";

import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered, setEditMode, id } = props;

  const { currentFolders, setCurrentFolders, setSavedFolders } = useNodes();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const deleteNodes = () => {
    const previousFolders = currentFolders[0].folders;

    setCurrentFolders([
      {
        id: currentFolders[0].id,
        folders: previousFolders.filter((folder) => folder.id !== id),
      },
    ]);

    // if db call works, then update the state, if not, toast message

    setSavedFolders([
      {
        id: currentFolders[0].id,
        folders: previousFolders.filter((folder) => folder.id !== id),
      },
    ]);
  };

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
          <div className={styles.option} onClick={() => {}}>
            Edit
          </div>
          <div className={styles.option} onClick={() => deleteNodes()}>
            Delete
          </div>
        </div>
      )}
    </>
  );
};

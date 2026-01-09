import { useEffect, useState } from "react";

import { NodeFileType } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { deleteNodesAndFolders } from "./helpers";
import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: NodeFileType;
  parentId?: string;
  top: number;
  left: number;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered, setEditMode, id, type, parentId = "", top, left } = props;

  const { savedFolders, setSavedFolders, setNodeEdit } = useNodes();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const editNodes = () => {
    setNodeEdit({
      activeFolder: type === "folder" ? id : undefined,
      activeNode: type === "node" ? id : undefined,
      editMode: true,
    });
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
          style={{ top: `${top - 28}px`, left: `${left + 28}px` }}
        >
          <div className={styles.option} onClick={() => editNodes()}>
            Edit
          </div>
          <div
            className={styles.option}
            onClick={() =>
              deleteNodesAndFolders({
                type,
                savedFolders,
                id,
                parentId,
                setSavedFolders,
              })
            }
          >
            Delete
          </div>
        </div>
      )}
    </>
  );
};

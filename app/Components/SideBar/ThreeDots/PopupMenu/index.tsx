import { useEffect, useState } from "react";

import { NodeType } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { deleteNodesAndFolders } from "./helpers";
import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: NodeType;
  parentId?: string;
  top: number;
  left: number;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered, setEditMode, id, type, parentId = "", top, left } = props;

  const { currentFolders, setCurrentFolders, setSavedFolders, setNodeEdit } =
    useNodes();

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
                currentFolders,
                id,
                parentId,
                setCurrentFolders,
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

// makew edit work, make selection in context and hide the add new file button if nothing is selcted, add ability to add new folders to a pre-existing folder IF a folder is selected, then add nodes file IF a folder is selected, add ability to edit folders AND nodes

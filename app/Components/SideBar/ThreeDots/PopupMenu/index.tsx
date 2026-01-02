import { useEffect, useState } from "react";

import { Folder, NodeType, RootFolder } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import styles from "./styles.module.scss";

type PopupMenuType = {
  isHovered: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: NodeType;
  parentId?: string;
};

export const PopupMenu = (props: PopupMenuType) => {
  const { isHovered, setEditMode, id, type, parentId = "" } = props;

  const { currentFolders, setCurrentFolders, setSavedFolders, setNodeEdit } =
    useNodes();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const editNodes = () => {
    console.log("hit");
    setNodeEdit({
      activeFolder: type === "folder" ? id : undefined,
      activeNode: type === "node" ? id : undefined,
      editMode: true,
    });

    console.log("edit", {
      activeFolder: type === "folder" ? id : undefined,
      activeNode: type === "node" ? id : undefined,
      editMode: true,
    });
  };

  const deleteNodesAndFolders = () => {
    // logic to delete folders cascading from parents

    const previousFolders = currentFolders[0].folders;

    if (type === "folder") {
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
    } else {
      // logic to delete node files cascading from parents

      const deleteNodes = (
        data: RootFolder[],
        id: string,
        parent_id: string
      ): RootFolder[] => {
        const deleteNode = (folders: Folder[]): Folder[] => {
          return folders.map((folder) => {
            if (folder.id === parent_id) {
              return {
                ...folder,
                nodes: folder.nodes.filter((node) => node.id !== id),
              };
            } else {
              return {
                ...folder,
                subfolders: deleteNode(folder.subfolders),
              };
            }
          });
        };

        return data.map((root) => ({
          ...root,
          folders: deleteNode(root.folders),
        }));
      };

      setCurrentFolders(deleteNodes(currentFolders, id, parentId));

      // save to the db, if it fails post a toast message

      setSavedFolders(deleteNodes(currentFolders, id, parentId));
    }
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
          <div className={styles.option} onClick={() => editNodes()}>
            Edit
          </div>
          <div
            className={styles.option}
            onClick={() => deleteNodesAndFolders()}
          >
            Delete
          </div>
        </div>
      )}
    </>
  );
};

// makew edit work, make selection in context and hide the add new file button if nothing is selcted, add ability to add new folders to a pre-existing folder IF a folder is selected, then add nodes file IF a folder is selected, add ability to edit folders AND nodes

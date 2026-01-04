import { saveAs } from "file-saver";

import { Folder, Node, UserFolder } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";
import { generateUUID } from "@/app/utils/uuid";

import { Button } from "../Button";
import { SquareButton } from "../SquareButton";
import styles from "./styles.module.scss";

export const HotBar = () => {
  const {
    currentPageNodes,
    currentPageId,
    setCurrentPageNodes,
    currentFolders,
    setCurrentFolders,
    userId,
    setSavedFolders,
    nodeEdit,
  } = useNodes();

  const saveNodes = () => {
    const dataToBeSaved = currentPageNodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      width: node.width,
      height: node.height,
      data: node.data,
    }));

    const blob = new Blob([JSON.stringify(dataToBeSaved, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "pageNode.json");
  };

  const createNewNode = () => {
    const newNode = {
      id: generateUUID(),
      type: "textNode",
      pageId: currentPageId,
      position: {
        x: 2500,
        y: 2500,
      },
      width: 300,
      height: 200,
      data: {
        text: "Edit Me\n\n---\n\n",
      },
    };

    setCurrentPageNodes([...currentPageNodes, newNode]);
  };

  const createNewFolder = () => {
    const newFolder: Folder = {
      id: generateUUID(),
      parent_id: userId,
      name: "Folder",
      type: "folder",
      subfolders: [],
      nodes: [],
    };

    if (!nodeEdit.activeFolder && !nodeEdit.activeNode) {
      setCurrentFolders([
        {
          id: currentFolders[0].id,
          folders: [newFolder, ...currentFolders[0].folders],
        },
      ]);

      // if db call works, then update the state, if not, toast message

      setSavedFolders([
        {
          id: currentFolders[0].id,
          folders: [newFolder, ...currentFolders[0].folders],
        },
      ]);

      return;
    } else if (!currentFolders[0].folders.length) {
      setCurrentFolders([
        {
          id: currentFolders[0].id,
          folders: [newFolder],
        },
      ]);

      // if db call works, then update the state, if not, toast message

      setSavedFolders([
        {
          id: currentFolders[0].id,
          folders: [newFolder],
        },
      ]);

      return;
    }

    const addNewFolder = (root: UserFolder[]): UserFolder[] => {
      const addFolder = (folders: Folder[], parentId: string): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              subfolders: [newFolder, ...folder.subfolders],
            };
          } else {
            return {
              ...folder,
              subfolders: addFolder(folder.subfolders, parentId),
            };
          }
        });
      };

      return [
        {
          id: root[0].id,
          folders: addFolder(root[0].folders, nodeEdit.activeFolder ?? ""),
        },
      ];
    };

    setCurrentFolders(addNewFolder(currentFolders));

    // if db call works, then update the state, if not, toast message

    setSavedFolders(addNewFolder(currentFolders));
  };

  const createNewFile = () => {
    const newFile: Node = {
      id: generateUUID(),
      parent_id: nodeEdit.activeFolder ?? "",
      name: "newFile",
      type: "node",
    };

    const addNewFile = (data: UserFolder[], parentId: string): UserFolder[] => {
      const addFile = (folders: Folder[], parentId: string): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              nodes: [newFile, ...folder.nodes],
            };
          } else {
            return {
              ...folder,
              subfolders: addFile(folder.subfolders, parentId),
            };
          }
        });
      };

      return data.map((root) => ({
        ...root,
        folders: addFile(root.folders, parentId),
      }));
    };

    setCurrentFolders(addNewFile(currentFolders, nodeEdit.activeFolder ?? ""));

    // if db call works, then update the state, if not, toast message

    setSavedFolders(addNewFile(currentFolders, nodeEdit.activeFolder ?? ""));
  };

  return (
    <div className={styles.hotBar}>
      <div className={styles.leftSection}>
        <h2 style={{ fontWeight: 100, marginLeft: "60px" }}>noted.exe</h2>
        <div className={styles.verticalDivider} />
        <Button
          label="New Folder"
          type="newFolder"
          onClick={() => createNewFolder()}
        />
        {nodeEdit.activeFolder && !!currentFolders[0].folders.length && (
          <Button
            label="New File"
            type="newFile"
            onClick={() => createNewFile()}
          />
        )}
        <Button
          label="New Node"
          type="newNode2"
          onClick={() => createNewNode()}
        />
      </div>

      <div className={styles.rightSection}>
        <SquareButton type="undo" onClick={() => {}} />
        <SquareButton type="redo" onClick={() => {}} />
        <SquareButton type="save" onClick={() => saveNodes()} />
      </div>
    </div>
  );
};

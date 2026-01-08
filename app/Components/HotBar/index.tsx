import { saveAs } from "file-saver";

import { newFolderPost } from "@/app/Constants/requests";
import {
  CreateFolderResponse,
  Folder,
  NodeFile,
  Nodule,
  UserFolder,
} from "@/app/Constants/types";
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
      pageId: currentPageId,
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

  // no need to save this to DB, only save when user pushes the SAVE button
  const createNewNode = () => {
    const newNode: Nodule = {
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

  const createNewFolder = async () => {
    const newFolder: Folder = {
      id: generateUUID(),
      parentId: userId ?? "",
      name: "Folder",
      type: "folder",
      subfolders: [],
      nodes: [],
    };

    const response: CreateFolderResponse = await newFolderPost(
      userId ?? "",
      "Folder"
    );

    // only save to UI if the POST request returns a valid id - signifying a successful save to the db
    if (response.id) {
      // this creates a folder at root level
      if (!nodeEdit.activeFolder && !nodeEdit.activeNode) {
        setCurrentFolders({
          id: currentFolders.id,
          folders: [newFolder, ...currentFolders.folders],
        });

        // if db call works, then update the state, if not, toast message

        setSavedFolders({
          id: currentFolders.id,
          folders: [newFolder, ...currentFolders.folders],
        });

        return;
        // this creates a folder at root level IF NONE CURRENTLY EXIST AT ROOT LEVEL in UI
      } else if (!currentFolders.folders.length) {
        setCurrentFolders({
          id: currentFolders.id,
          folders: [newFolder],
        });

        // if db call works, then update the state, if not, toast message

        setSavedFolders({
          id: currentFolders.id,
          folders: [newFolder],
        });

        return;
      }

      // this adds a folder to the hierarchy. it finds its placement before saving
      const addNewFolder = (root: UserFolder): UserFolder => {
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

        return {
          id: root.id,
          folders: addFolder(root.folders, nodeEdit.activeFolder ?? ""),
        };
      };

      setCurrentFolders(addNewFolder(currentFolders));

      // if db call works, then update the state, if not, toast message

      setSavedFolders(addNewFolder(currentFolders));
    }
  };

  const createNewFile = () => {
    const newFile: NodeFile = {
      id: generateUUID(),
      parentId: nodeEdit.activeFolder ?? "",
      name: "newFile",
      type: "node",
    };

    const addNewFile = (data: UserFolder, parentId: string): UserFolder => {
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

      return {
        ...data,
        folders: addFile(data.folders, parentId),
      };
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
        {nodeEdit.activeFolder && !!currentFolders.folders.length && (
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

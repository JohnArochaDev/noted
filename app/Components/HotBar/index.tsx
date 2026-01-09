import { saveAs } from "file-saver";

import { newFilePost, newFolderPost } from "@/app/Constants/requests";
import {
  CreateFolderOrNodeResponse,
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
    savedFolders,
    setSavedFolders,
    nodeEdit,
  } = useNodes();

  // THIS is where we save the nodules to db
  const saveNodules = () => {
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
  const createNewNodule = () => {
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
    const response: CreateFolderOrNodeResponse = await newFolderPost(
      nodeEdit.activeFolder ?? null,
      "Folder"
    );

    // only save to UI if the POST request returns a valid id - signifying a successful save to the db
    if (response.id) {
      const newFolder: Folder = {
        id: response.id,
        parentId: response.parentId,
        name: response.name,
        type: "folder",
        subfolders: [],
        nodes: [],
      };

      // this creates a folder at root level
      if (!nodeEdit.activeFolder && !nodeEdit.activeNode) {
        setSavedFolders({
          id: savedFolders.id,
          folders: [...savedFolders.folders, newFolder],
        });

        // if db call works, then update the state, if not, toast message

        setSavedFolders({
          id: savedFolders.id,
          folders: [...savedFolders.folders, newFolder],
        });

        return;
        // this creates a folder at root level IF NONE CURRENTLY EXIST AT ROOT LEVEL in UI
      } else if (!savedFolders.folders.length) {
        setSavedFolders({
          id: savedFolders.id,
          folders: [newFolder],
        });

        // if db call works, then update the state, if not, toast message

        setSavedFolders({
          id: savedFolders.id,
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
                subfolders: [...folder.subfolders, newFolder],
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

      setSavedFolders(addNewFolder(savedFolders));

      // if db call works, then update the state, if not, toast message

      setSavedFolders(addNewFolder(savedFolders));
    }
  };

  const createNewFile = async () => {
    const response: CreateFolderOrNodeResponse = await newFilePost(
      nodeEdit.activeFolder!,
      "newNode"
    );

    if (response.id) {
      const newFile: NodeFile = {
        id: response.id,
        parentId: response.parentId,
        name: response.name,
        type: "node",
      };

      const addNewFile = (data: UserFolder, parentId: string): UserFolder => {
        const addFile = (folders: Folder[], parentId: string): Folder[] => {
          return folders.map((folder) => {
            if (folder.id === parentId) {
              return {
                ...folder,
                nodes: [...folder.nodes, newFile],
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

      setSavedFolders(addNewFile(savedFolders, nodeEdit.activeFolder!));
    }
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
        {nodeEdit.activeFolder && !!savedFolders.folders.length && (
          <Button
            label="New File"
            type="newFile"
            onClick={() => createNewFile()}
          />
        )}
        <Button
          label="New Node"
          type="newNode2"
          onClick={() => createNewNodule()}
        />
      </div>
      <div className={styles.rightSection}>
        <SquareButton type="undo" onClick={() => {}} />
        <SquareButton type="redo" onClick={() => {}} />
        <SquareButton type="save" onClick={() => saveNodules()} />
        <div className={styles.verticalDividerLast} />
        <Button
          label="Logout"
          type="logout"
          onClick={() => {}}
          variant="danger"
        />
        <div style={{ width: "20px" }}></div>
      </div>
    </div>
  );
};

import { saveAs } from "file-saver";

import { useNodes } from "@/app/Context";
import { generateUUID } from "@/app/utils/uuid";

import { Button } from "../Button";
import { SquareButton } from "../SquareButton";
import styles from "./styles.module.scss";

export const HotBar = () => {
  const { currentPageNodes, currentPageId, setCurrentPageNodes } = useNodes();

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

  // when saving a new folder or a new file, I need to both create it by updating the context,
  // AND create it in the UI. if the call fails i delete the new file / folder and add a toast error.
  // I need to be careful to keep the UI and DB synced perfectly, and be careful with my data.

  return (
    <div className={styles.hotBar}>
      <div className={styles.leftSection}>
        <h2 style={{ fontWeight: 100, marginLeft: "60px" }}>noted.exe</h2>
        <div className={styles.verticalDivider} />
        <Button label="New Folder" type="newFolder" onClick={() => {}} />
        <Button label="New File" type="newFile" onClick={() => {}} />
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

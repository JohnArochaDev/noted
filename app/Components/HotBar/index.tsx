import { saveAs } from "file-saver";

import { useNodes } from "@/app/Context";

import { Button } from "../Button";
import { SquareButton } from "../SquareButton";
import styles from "./styles.module.scss";

export const HotBar = () => {
  const { currentPageNodes } = useNodes();

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

  return (
    <div className={styles.hotBar}>
      <div className={styles.leftSection}>
        <h2 style={{ fontWeight: 100, marginLeft: "60px" }}>noted.exe</h2>
        <div className={styles.verticalDivider} />
        <Button label="New Folder" type="newFolder" />
        <Button label="New File" type="newFile" />
        <Button label="New Node" type="newNode2" />
      </div>

      <div className={styles.rightSection}>
        <SquareButton type="undo" onClick={() => {}} />
        <SquareButton type="redo" onClick={() => {}} />
        <SquareButton type="save" onClick={() => saveNodes()} />
      </div>
    </div>
  );
};

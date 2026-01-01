import { useNodes } from "@/app/Context";

import { Button } from "../Button";
import { SquareButton } from "../SquareButton";
import styles from "./styles.module.scss";

export const HotBar = () => {
  const {
    savedPageNodes,
    setSavedPageNodes,
    currentPageNodes,
    setCurrentPageNodes,
  } = useNodes();

  const saveNodes = () => {
    console.log("current nodes (need to be formatted)", currentPageNodes);
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

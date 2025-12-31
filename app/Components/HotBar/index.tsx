import { Button } from "../Button";
import { SquareButton } from "../SquareButton";
import styles from "./styles.module.scss";

export const HotBar = () => {
  return (
    <div className={styles.hotBar}>
      <div className={styles.leftSection}>
        <h2 style={{ fontWeight: 100, marginLeft: '75px' }}>noted.exe</h2>
        <div className={styles.verticalDivider} />
        <Button label="New Folder" type="newFolder" />
        <Button label="New File" type="newFile" />
        <Button label="New Node" type="newNode2" />
      </div>

      <div className={styles.rightSection}>
        <SquareButton type="undo" />
        <SquareButton type="redo" />
        <SquareButton type="save" />
      </div>
    </div>
  );
};

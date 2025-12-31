import { Button } from "../Button";
import styles from "./styles.module.scss";

export const HotBar = () => {
  return (
    <div className={styles.hotBar}>
      <h2 style={{ fontWeight: 100, marginLeft: "70px" }}>noted.exe</h2>
      <div className={styles.verticalDivider} />
      <Button label="New Folder" type="newFolder" />
      <Button label="New File" type="newFile"  />
      <Button label="New Node" type="newNode2"  />
    </div>
  );
};

"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

type FolderNodeType = {
  label: string;
};

export const FolderNode = (props: FolderNodeType) => {
  const { label } = props;

  const [selected, setSelected] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    if (!selected) {
      setSelected(true);
    }
    setOpen(!open);
  };

  return (
    <div
      className={styles.folder}
      aria-label={label}
      onClick={onClick}
      tabIndex={0}    
      onBlur={() => setSelected(false)}
    >
      <div className={styles.open}>{open ? "▼" : "►"}</div>
      {selected && <div className={styles.selected}></div>}
      {label}
    </div>
  );
};

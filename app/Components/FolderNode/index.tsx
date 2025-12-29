"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

type FolderNodeType = {
  label: string;
  onClick?: () => void;
};

export const FolderNode = (props: FolderNodeType) => {
  const { label } = props;

  const [ selected, setSelected ] = useState<boolean>(false)

  return (
    <div
      className={styles.folder}
      aria-label={label}
      onClick={() => setSelected(!selected)}
    >
      {selected && <div className={styles.selected}></div>}
      {label}
    </div>
  );
};

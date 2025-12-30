"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

type TreeNodeType = {
  label: string;
};

export const TreeNode = (props: TreeNodeType) => {
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
      className={styles.node}
      aria-label={label}
      onClick={onClick}
      tabIndex={0}
      onBlur={() => setSelected(false)}
    >
      {selected && <div className={styles.selected}></div>}
      {label}
    </div>
  );
};

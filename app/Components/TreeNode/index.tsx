"use client";
import styles from "./styles.module.scss";

type TreeNodeType = {
  label: string;
  onClick: () => void;
};

export const TreeNode = (props: TreeNodeType) => {
  const { label, onClick } = props;

  return (
    <button
      className={styles.tree}
      aria-label={label}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
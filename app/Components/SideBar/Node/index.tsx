"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

import Image from "next/image";

type TreeNodeType = {
  label: string;
};

export const TreeNode = (props: TreeNodeType) => {
  const { label } = props;

  let formattedLabel = label.toLowerCase().trim();

  // this makes it camelCase, make another for snake case
  if (formattedLabel.includes(" ")) {
    for (let i = 0; i < formattedLabel.length; i++) {
      if (formattedLabel.includes(" ")) {
        const parts = formattedLabel.split(" ");
        formattedLabel =
          parts[0].toLowerCase() +
          parts
            .slice(1)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
      }
    }
  }

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
      <div className={styles.file}>
        <Image
          src="/assets/file.png"
          alt="Open Folder Icon"
          width={20}
          height={20}
        />
      </div>
      {selected && <div className={styles.selected}></div>}
      <span className={styles.nodeText}>{`${formattedLabel}.node`}</span>
    </div>
  );
};

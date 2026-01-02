"use client";
import { useState } from "react";

import Image from "next/image";

import { useNodes } from "@/app/Context";

import { ThreeDots } from "../ThreeDots";
import styles from "./styles.module.scss";

type TreeNodeType = {
  label: string;
  id: string;
};

export const TreeNode = (props: TreeNodeType) => {
  const { label, id } = props;

  const { setCurrentPageId } = useNodes()

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

  const onClick = () => {
    setCurrentPageId(id)

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <ThreeDots isHovered={isHovered} id={id} />
    </div>
  );
};

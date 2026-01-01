"use client";

import { useState } from "react";

import Image from "next/image";

import { Folder, Node } from "../../../Constants/types";
import { TreeNode } from "../Node";
import { NodeRow } from "../NodeRow";
import { Spacer } from "../Spacer";
import { ThreeDots } from "../ThreeDots";
import styles from "./styles.module.scss";

type TreeFolderType = {
  folderData: Folder;
  indentation?: number;
};

export const TreeFolder = (props: TreeFolderType) => {
  const { folderData, indentation = 0 } = props;

  const [selected, setSelected] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    if (!selected) {
      setSelected(true);
    }
    setOpen(!open);
  };

  const renderNodes = (data: Node[], indent: number): React.ReactNode => {
    return (
      <>
        {data.map((node) => (
          <NodeRow key={node.id}>
            <Spacer indentation={indent} />
            <TreeNode label={node.name} id={node.id} />
          </NodeRow>
        ))}
      </>
    );
  };

  const renderFolder = (data: Folder[], indent: number): React.ReactNode => {
    return data.map((folder) => (
      <TreeFolder key={folder.id} folderData={folder} indentation={indent} />
    ));
  };

  return (
    <>
      <NodeRow>
        <Spacer indentation={indentation} />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={styles.folder}
          aria-label={folderData.name}
          onClick={onClick}
          tabIndex={0}
          onBlur={() => setSelected(false)}
        >
          <div className={styles.open}>
            {open ? (
              <Image
                src="/assets/openFolder.png"
                alt="Open Folder Icon"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/closedFolder.png"
                alt="Closed Folder Icon"
                width={20}
                height={20}
              />
            )}
          </div>
          {selected && <div className={styles.selected}></div>}
          <span className={styles.folderText}>
            {folderData.name.toUpperCase()}
          </span>
          <ThreeDots isHovered={isHovered} />
        </div>
      </NodeRow>

      {folderData.subfolders &&
        open &&
        renderFolder(folderData.subfolders, indentation + 1)}

      {folderData.nodes &&
        open &&
        renderNodes(folderData.nodes, indentation + 1)}
    </>
  );
};

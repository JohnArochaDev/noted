"use client";

import { Folder, Node } from "../../../Constants/types";
import { TreeNode } from "../Node";
import { useState } from "react";
import styles from "./styles.module.scss";
import { NodeRow } from "../NodeRow";
import { Spacer } from "../Spacer";

type TreeFolderType = {
  folderData: Folder;
  indentation?: number;
};

export const TreeFolder = (props: TreeFolderType) => {
  const { folderData, indentation = 0 } = props;

  const [selected, setSelected] = useState<boolean>(false);
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
            <TreeNode label={node.name} />
          </NodeRow>
        ))}
      </>
    );
  };

  const renderFolder = (data: Folder[], indent: number): React.ReactNode => {
    return data.map((folder) => (
      <>
        <TreeFolder key={folder.id} folderData={folder} indentation={indent} />
      </>
    ));
  };

  return (
    <>
      <div
        className={styles.folder}
        aria-label={folderData.name}
        onClick={onClick}
        tabIndex={0}
        onBlur={() => setSelected(false)}
      >
        <div className={styles.open}>{open ? "▼" : "►"}</div>

        {selected && <div className={styles.selected}></div>}

        {folderData.name}
      </div>

      {/* make a div here for children, then pass children but with indentation already added */}

      {/* folder children*/}

      {folderData.subfolders &&
        open &&
        renderFolder(folderData.subfolders, indentation + 1)}

      {/* node children */}

      {folderData.nodes &&
        open &&
        renderNodes(folderData.nodes, indentation + 1)}
    </>
  );
};

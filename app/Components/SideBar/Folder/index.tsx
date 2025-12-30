"use client";

import { Folder, Node } from "../../../Constants/types";
import { TreeNode } from "../Node";
import { useState } from "react";
import styles from "./styles.module.scss";
import { NodeRow } from "../NodeRow";
import { Spacer } from "../Spacer";

type TreeFolderType = {
  folderData: Folder;
};

export const TreeFolder = (props: TreeFolderType) => {
  const { folderData } = props;

  const [selected, setSelected] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    if (!selected) {
      setSelected(true);
    }
    setOpen(!open);
  };

  const renderNodes = (data: Node[]): React.ReactNode => {
    return (
      <>
        {data.map((node) => (
          <NodeRow key={node.id}>
            <Spacer indentation={1} /> {/* if this works make the indentation in the component */}
            <TreeNode label={node.name} />
          </NodeRow>
        ))}
      </>
    );
  };

  // const renderFolder = (data: Folder, indentation = 0): React.ReactNode => {
  //   const folders = data.subfolders;
  //   const nodes = data.nodes;

  //   let nodesToRender: React.ReactNode = [];

  //   if (folders.length) {
  //     folders.forEach((folder) => {
  //       renderFolder(folder, indentation + 1);
  //     });
  //   }

  //   if (nodes.length) {
  //     nodesToRender = renderNodes(data.nodes, indentation);
  //   }

  //   return (
  //     <>
  //       <NodeRow>
  //         <Spacer indentation={indentation} />
  //         <TreeFolder label={data.name} />
  //       </NodeRow>
  //       {nodes && nodesToRender}
  //     </>
  //   );
  // };

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

      {/* node children */}

      {folderData.nodes && open && renderNodes(folderData.nodes)}
    </>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useNodes } from "@/app/Context";

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

  const {
    nodeEdit,
    setNodeEdit,
    currentFolders,
    setCurrentFolders,
    setSavedFolders,
  } = useNodes();

  const [selected, setSelected] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [text, setText] = useState<string>(folderData.name);
  const [open, setOpen] = useState<boolean>(false);

  const textRef = useRef<HTMLInputElement>(null);

  const saveEdit = () => {
    setCurrentFolders([
      {
        id: currentFolders[0].id,
        folders: currentFolders[0].folders.map((folder) =>
          folder.id === nodeEdit.activeFolder
            ? { ...folder, name: text }
            : folder
        ),
      },
    ]);

    // save to the db, if it fails post a toast message

    setSavedFolders([
      {
        id: currentFolders[0].id,
        folders: currentFolders[0].folders.map((folder) =>
          folder.id === nodeEdit.activeFolder
            ? { ...folder, name: text }
            : folder
        ),
      },
    ]);

    setNodeEdit({
      ...nodeEdit,
      editMode: false,
    });
  };

  const onKeyDown = (key: React.KeyboardEvent) => {
    if (key.code === "Enter") {
      saveEdit();
    }
  };

  const onClick = () => {
    if (!selected) {
      setSelected(true);
    }
    setOpen(!open);

    setNodeEdit({
      ...nodeEdit,
      activeFolder: folderData.id,
      activeNode: undefined,
    });
  };

  const renderNodes = (data: Node[], indent: number): React.ReactNode => {
    return (
      <>
        {data.map((node) => (
          <NodeRow key={node.id}>
            <Spacer indentation={indent} />
            <TreeNode node={node} />
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

  // if edit mode is turned on for a node, select it automatically so the user can type
  useEffect(() => {
    if (nodeEdit.activeFolder === folderData.id && textRef.current) {
      textRef.current.focus();
      textRef.current.setSelectionRange(text.length, text.length);
    }
  }, [nodeEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NodeRow>
        <Spacer indentation={indentation} />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(key) => onKeyDown(key)}
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
          {nodeEdit.activeFolder === folderData.id && nodeEdit.editMode ? (
            <input
              ref={textRef}
              className={styles.folderTextInput}
              value={text.toUpperCase()}
              onChange={(e) => setText(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
              onBlur={saveEdit}
              style={{
                border: "none",
                background: "transparent",
                resize: "none",
              }}
            />
          ) : (
            <span className={styles.folderText}>
              {folderData.name.toUpperCase()}
            </span>
          )}
          <ThreeDots isHovered={isHovered} id={folderData.id} type={folderData.type} />
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

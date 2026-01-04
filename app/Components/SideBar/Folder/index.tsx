"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useNodes } from "@/app/Context";

import { Folder, NodeFile, UserFolder } from "../../../Constants/types";
import { TreeNode } from "../NodeFile";
import { NodeRow } from "../NodeRow";
import { Spacer } from "../Spacer";
import { ThreeDots } from "../ThreeDots";
import styles from "./styles.module.scss";

type TreeFolderType = {
  folderData: Folder;
  indentation?: number;
};

type NodeAndFolderChildren = {
  folders: number;
  nodes: number;
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

  const [children, setChildren] = useState<NodeAndFolderChildren>({
    folders: folderData.subfolders.length,
    nodes: folderData.nodes.length,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [text, setText] = useState<string>(folderData.name);
  const [open, setOpen] = useState<boolean>(false);

  const textRef = useRef<HTMLInputElement>(null);

  const saveEdit = () => {
    const updateFolderName = (data: UserFolder[]): UserFolder[] => {
      const updateFolder = (folders: Folder[], id: string): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === id) {
            return {
              ...folder,
              name: text,
            };
          } else {
            return {
              ...folder,
              subfolders: updateFolder(folder.subfolders, id),
            };
          }
        });
      };

      return data.map((root) => ({
        ...root,
        folders: updateFolder(root.folders, folderData.id),
      }));
    };

    setCurrentFolders(updateFolderName(currentFolders));

    // save to the db, if it fails post a toast message

    setSavedFolders(updateFolderName(currentFolders));

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

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setOpen(!open);

    setNodeEdit({
      ...nodeEdit,
      activeFolder: folderData.id,
      activeNode: undefined,
    });
  };

  const renderNodes = (data: NodeFile[], indent: number): React.ReactNode => {
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

  useEffect(() => {
    if (
      children.folders < folderData.subfolders.length ||
      children.nodes < folderData.nodes.length
    ) {
      // eslint-disable-next-line
      setOpen(true);
      setChildren({
        folders: folderData.subfolders.length,
        nodes: folderData.nodes.length,
      });
    }
  }, [folderData, children.folders, children.nodes]);

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
          {nodeEdit.activeFolder === folderData.id && (
            <div className={styles.selected}></div>
          )}
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
          <ThreeDots
            isHovered={isHovered}
            id={folderData.id}
            type={folderData.type}
          />
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

"use client";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { updateFilePut } from "@/app/Constants/requests";
import { Folder, NodeFile, UserFolder } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { ThreeDots } from "../ThreeDots";
import styles from "./styles.module.scss";

type TreeNodeType = {
  node: NodeFile;
};

export const TreeNode = (props: TreeNodeType) => {
  const { node } = props;
  const { name, id, parentId } = node;

  const {
    setCurrentPageId,
    nodeEdit,
    setNodeEdit,
    savedFolders,
    setSavedFolders,
  } = useNodes();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const textRef = useRef<HTMLInputElement>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setCurrentPageId(id);

    setOpen(!open);

    setNodeEdit({
      ...nodeEdit,
      activeFolder: undefined,
      activeNode: id,
    });

    // ← ADD THIS: update URL with ?pageId=
    const url = new URL(window.location.href);
    url.searchParams.set("pageId", id);
    window.history.pushState({}, "", url);
  };

  const updateNodeFile = async () => {
    const updateNodeName = (
      data: UserFolder,
      nodeId: string,
      parentId: string
    ): UserFolder => {
      const updateFolders = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              nodes: folder.nodes.map((node) =>
                node.id === nodeId ? { ...node, name: text } : node
              ),
            };
          } else {
            return {
              ...folder,
              subfolders: updateFolders(folder.subfolders),
            };
          }
        });
      };

      return {
        ...data,
        folders: updateFolders(data.folders),
      };
    };

    const updated = await updateFilePut(id, text);

    if (updated) {
      setSavedFolders(updateNodeName(savedFolders, id, parentId));
    }
    // if fail need to post a toast message

    setNodeEdit({
      ...nodeEdit,
      editMode: false,
    });
  };

  const onKeyDown = (key: React.KeyboardEvent) => {
    if (key.code === "Enter") {
      updateNodeFile();
    }
  };

  useEffect(() => {
    let formattedLabel = name.toLowerCase().trim();

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

    // eslint-disable-next-line
    setText(formattedLabel);
    // eslint-disable-next-line
  }, []);

  // if edit mode is turned on for a node, select it automatically so the user can type
  useEffect(() => {
    if (nodeEdit.activeNode === id && textRef.current) {
      textRef.current.focus();
      textRef.current.setSelectionRange(text.length, text.length);
    }
  }, [nodeEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={styles.node}
      aria-label={name}
      onClick={onClick}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(key) => onKeyDown(key)}
    >
      <div className={styles.file}>
        <Image
          src="/assets/file.png"
          alt="Open Folder Icon"
          width={20}
          height={20}
        />
      </div>
      {nodeEdit.activeNode === id && <div className={styles.selected}></div>}

      {nodeEdit.activeNode === id && nodeEdit.editMode ? (
        <input
          ref={textRef}
          className={styles.folderTextInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onBlur={updateNodeFile}
          style={{
            border: "none",
            background: "transparent",
            resize: "none",
          }}
        />
      ) : (
        <span className={styles.nodeText}>{`${text}.node`}</span>
      )}

      <ThreeDots
        isHovered={isHovered}
        id={id}
        type={node.type}
        parentId={node.parentId}
      />
    </div>
  );
};

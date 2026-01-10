"use client";

import { useNodes } from "@/app/Context";

import styles from "./styles.module.scss";

export const SideBar = ({ children }: { children?: React.ReactNode }) => {
  const { nodeEdit, setNodeEdit } = useNodes();
  return (
    <div
      className={styles.sidebar}
      onClick={() =>
        setNodeEdit({
          ...nodeEdit,
          activeNode: undefined,
          activeFolder: undefined,
        })
      }
    >
      {children}
    </div>
  );
};

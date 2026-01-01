import { createContext, useContext, useState } from "react";

import nodeDate from "../Constants/pageNode.json"
import folderData from "../Constants/treeNodeData.json";
import { RootFolder } from "../Constants/types";
import { TextNodeType } from "../Constants/types";

type NodesContextType = {
  userId: number;
  setUserId: (userId: number) => void;
  folders: RootFolder[];
  setFolders: (folders: RootFolder[]) => void;
  pageNodes: TextNodeType[];
  setPageNodes: (pageNodes: TextNodeType[]) => void;
};

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number>(0); // logged in user
  const [folders, setFolders] = useState<RootFolder[]>(folderData as RootFolder[]); // all folders and .node files
  const [pageNodes, setPageNodes] = useState<TextNodeType[]>(nodeDate as TextNodeType[]); // active page selected from hierarchy tree
  // when the server is up these will come from my db

  return (
    <NodesContext.Provider
      value={{
        userId,
        setUserId,
        folders,
        setFolders,
        pageNodes,
        setPageNodes,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => {
  const context = useContext(NodesContext);
  if (!context) throw new Error("useNodes must be used within a NodeProvider");

  return context;
};

import { createContext, useContext, useState } from "react";

import data from "../Constants/treeNodeData.json";
import { RootFolder } from "../Constants/types";


type NodesContextType = {
  userId: number;
  setUserId: (userId: number) => void;
  folders: RootFolder[];
  setFolders: (folders: RootFolder[]) => void;
};

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number>(0);
  const [folders, setFolders] = useState<RootFolder[]>(data as RootFolder[]);
  // when the server is up these will come from my db

  return (
    <NodesContext.Provider value={{ userId, setUserId, folders, setFolders }}>
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => {
  const context = useContext(NodesContext);
  if (!context) throw new Error("useNodes must be used within a NodeProvider");

  return context;
};

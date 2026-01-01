import { createContext, useContext, useState } from "react";

import { CustomTextNode } from "../Components/Canvas";
import nodeDate from "../Constants/pageNode.json";
import folderData from "../Constants/treeNodeData.json";
import { RootFolder } from "../Constants/types";
import { TextNodeType } from "../Constants/types";

type NodesContextType = {
  userId: string;
  setUserId: (userId: string) => void;
  savedFolders: RootFolder[];
  setSavedFolders: (savedFolders: RootFolder[]) => void;
  currentFolders: RootFolder[];
  setCurrentFolders: (currentFolders: RootFolder[]) => void;
  savedPageNodes: TextNodeType[];
  setSavedPageNodes: (pageNodes: TextNodeType[]) => void;
  currentPageNodes: CustomTextNode[];
  // eslint-disable-next-line
  setCurrentPageNodes: (currentPageNodes: any) => void;
  currentPageId: string;
  setCurrentPageId: (currentPageId: string) => void;
};

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("12345"); // logged in user

  const [savedFolders, setSavedFolders] = useState<RootFolder[]>(
    folderData as RootFolder[]
  ); // all folders and .node files that are saved to the db
  const [currentFolders, setCurrentFolders] = useState<RootFolder[]>(
    folderData as RootFolder[]
  ); // all folders and .node files that are current

  // active saved page nodes selected from hierarchy tree. these will be found via a call for a specific node page ID. all results will be used on the page, no filtering through different pages nodes will be required
  const [savedPageNodes, setSavedPageNodes] = useState<TextNodeType[]>(
    nodeDate as TextNodeType[]
  );
  // these nodes are the unsaved page nodes. When a save happens, these will be formatted to meet the format expected by the DB, send to the DB, and then a call will pull them back from the DB to keep everythiing synced up
  const [currentPageNodes, setCurrentPageNodes] = useState<CustomTextNode[]>(
    nodeDate as CustomTextNode[]
  );

  const [currentPageId, setCurrentPageId] = useState<string>("7"); // will be used when creating new nodes, will set the parent ID to this.
  // when the server is up these will come from my db

  return (
    <NodesContext.Provider
      value={{
        userId,
        setUserId,
        savedFolders,
        setSavedFolders,
        currentFolders,
        setCurrentFolders,
        savedPageNodes,
        setSavedPageNodes,
        currentPageNodes,
        setCurrentPageNodes,
        currentPageId,
        setCurrentPageId,
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

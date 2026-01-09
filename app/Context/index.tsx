import { createContext, useContext, useEffect, useState } from "react";

import nodeDate from "../Constants/pageNode.json";
import { fetchFolders } from "../Constants/requests";
import folderData from "../Constants/treeNodeData.json";
import { EditNoduleType, Nodule, UserFolder } from "../Constants/types";

type NodesContextType = {
  userId: string | undefined;
  setUserId: (userId: string | undefined) => void;
  savedFolders: UserFolder;
  setSavedFolders: (savedFolders: UserFolder) => void;
  savedPageNodes: Nodule[];
  setSavedPageNodes: (pageNodes: Nodule[]) => void;
  currentPageNodes: Nodule[];
  setCurrentPageNodes: (currentPageNodes: Nodule[]) => void;
  currentPageId: string;
  setCurrentPageId: (currentPageId: string) => void;
  nodeEdit: EditNoduleType;
  setNodeEdit: (nodeEdit: EditNoduleType) => void;
};

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  // in future, need to check jwt token and time BEFORE i set to state
  const userIdFromStorage = localStorage.getItem("userId");

  const [userId, setUserId] = useState<string | undefined>(
    userIdFromStorage ?? undefined
  );

  const [savedFolders, setSavedFolders] = useState<UserFolder>(
    folderData as UserFolder
  ); // all folders and .node files that are saved to the db

  // active saved page nodes selected from hierarchy tree
  const [savedPageNodes, setSavedPageNodes] = useState<Nodule[]>(
    nodeDate as Nodule[]
  );

  // unsaved / currently edited page nodes on the canvas
  const [currentPageNodes, setCurrentPageNodes] = useState<Nodule[]>(
    nodeDate as Nodule[]
  );

  const [currentPageId, setCurrentPageId] = useState<string>("7"); // used when creating new nodes

  // active element for editing
  const [nodeEdit, setNodeEdit] = useState<EditNoduleType>({
    activeFolder: undefined,
    activeNode: undefined,
    editMode: false,
  });

  useEffect(() => {
    if (!savedFolders?.folders.length) {
      // eslint-disable-next-line
      setNodeEdit({
        activeFolder: undefined,
        activeNode: undefined,
        editMode: false,
      });
    }
  }, [savedFolders]);

  useEffect(() => {
    const loadFolders = async () => {
      const folders = await fetchFolders();
      if (folders) {
        setSavedFolders(folders);
      }
    };

    loadFolders();
  }, []); // Runs once on mount

  return (
    <NodesContext.Provider
      value={{
        userId,
        setUserId,
        savedFolders,
        setSavedFolders,
        savedPageNodes,
        setSavedPageNodes,
        currentPageNodes,
        setCurrentPageNodes,
        currentPageId,
        setCurrentPageId,
        nodeEdit,
        setNodeEdit,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodeProvider");
  }
  return context;
};

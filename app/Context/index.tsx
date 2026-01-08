import { createContext, useContext, useEffect, useState } from "react";

import nodeDate from "../Constants/pageNode.json";
import folderData from "../Constants/treeNodeData.json";
import { EditNoduleType, Nodule, UserFolder } from "../Constants/types";

type NodesContextType = {
  userId: string;
  setUserId: (userId: string) => void;
  savedFolders: UserFolder | undefined;
  setSavedFolders: (savedFolders: UserFolder) => void;
  currentFolders: UserFolder;
  setCurrentFolders: (currentFolders: UserFolder) => void;
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
  const [userId, setUserId] = useState<string>("12345"); // logged in user

  const [savedFolders, setSavedFolders] = useState<UserFolder>(); // all folders and .node files that are saved to the db

  const [currentFolders, setCurrentFolders] = useState<UserFolder>(
    folderData as UserFolder
  ); // all folders and .node files that are current

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
    if (!currentFolders?.folders.length) {
      setNodeEdit({
        activeFolder: undefined,
        activeNode: undefined,
        editMode: false,
      });
    }
  }, [currentFolders]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch("http://localhost:8080/noted/folders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any auth headers if needed, e.g.:
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserFolder = await response.json();
        setSavedFolders(data);
        // eslint-disable-next-line
      } catch (err: any) {
        console.error("Failed to fetch folders:", err);
      }
    };

    fetchFolders();
  }, []); // Empty dependency array → runs once on mount

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

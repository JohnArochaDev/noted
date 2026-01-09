import { createContext, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { fetchFolders, getNodules } from "../Constants/requests";
import folderData from "../Constants/treeNodeData.json";
import { EditNoduleType, Nodule, UserFolder } from "../Constants/types";

type NodesContextType = {
  userId: string | undefined;
  setUserId: (userId: string | undefined) => void;
  savedFolders: UserFolder;
  setSavedFolders: (savedFolders: UserFolder) => void;
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

  // unsaved / currently edited page nodes on the canvas
  const [currentPageNodes, setCurrentPageNodes] = useState<Nodule[]>([]);

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
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // if no token at all → ensure everything is cleared
    if (!authToken) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      // eslint-disable-next-line
      setUserId(undefined);
      return;
    }

    try {
      const decoded: { exp?: number } = jwtDecode(authToken);

      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        // expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setUserId(undefined);
      }
      // if valid token → you could also set userId from token if needed
    } catch (error) {
      // invalid token
      console.warn("Invalid JWT token:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setUserId(undefined);
    }
  }, []);

  useEffect(() => {
    if (nodeEdit.activeNode !== undefined) {
      const urlParams = new URLSearchParams(window.location.search);
      const pageIdFromUrl = urlParams.get("pageId");

      if (pageIdFromUrl) {
        const loadNodules = async () => {
          const nodules = await getNodules(pageIdFromUrl);
          if (nodules) {
            setCurrentPageNodes(nodules);
          }
        };

        loadNodules();
      }
    }
  }, [nodeEdit]);

  return (
    <NodesContext.Provider
      value={{
        userId,
        setUserId,
        savedFolders,
        setSavedFolders,
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

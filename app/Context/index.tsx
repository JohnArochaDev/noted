import { createContext, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { fetchFolders, getNodules } from "../Constants/requests";
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
  isLoadingFolders: boolean;
};

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const userIdFromStorage = localStorage.getItem("userId");

  const [userId, setUserId] = useState<string | undefined>(
    userIdFromStorage ?? undefined
  );

  // Loading state for folders
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  const [savedFolders, setSavedFolders] = useState<UserFolder>({
    id: "",
    folders: [],
  } as UserFolder);

  // unsaved / currently edited page nodes on the canvas
  const [currentPageNodes, setCurrentPageNodes] = useState<Nodule[]>([]);

  const [currentPageId, setCurrentPageId] = useState<string>("7");

  // active element for editing
  const [nodeEdit, setNodeEdit] = useState<EditNoduleType>({
    activeFolder: undefined,
    activeNode: undefined,
    editMode: false,
  });

  useEffect(() => {
    if (savedFolders && !savedFolders?.folders.length) {
      setNodeEdit({
        activeFolder: undefined,
        activeNode: undefined,
        editMode: false,
      });
    }
  }, [savedFolders]);

  useEffect(() => {
    const loadFolders = async () => {
      setIsLoadingFolders(true);

      try {
        const folders = await fetchFolders();
        setSavedFolders(folders || { id: "", folders: [] });
      } catch (error) {
        console.error("Failed to load folders:", error);
        setSavedFolders({ id: "", folders: [] });
      } finally {
        setIsLoadingFolders(false);
      }
    };

    // only try to fetch when we have a userId (i.e. after login)
    if (userId) {
      loadFolders();
    }
  }, [userId]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setUserId(undefined);
      return;
    }

    try {
      const decoded: { exp?: number } = jwtDecode(authToken);

      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setUserId(undefined);
      }
    } catch (error) {
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
        isLoadingFolders,
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

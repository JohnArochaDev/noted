import { Folder, NodeType, UserFolder } from "@/app/Constants/types";

type DeleteNodesAndFoldersType = {
  type: NodeType;
  currentFolders: UserFolder[];
  id: string;
  parentId?: string;
  setCurrentFolders: (currentFolders: UserFolder[]) => void;
  setSavedFolders: (savedFolders: UserFolder[]) => void;
};

export const deleteNodesAndFolders = (props: DeleteNodesAndFoldersType) => {
  const {
    type,
    currentFolders,
    id,
    setCurrentFolders,
    setSavedFolders,
    parentId = "",
  } = props;

  if (type === "folder") {
    // logic to delete folders cascading from parents

    const deleteFolders = (data: UserFolder[], id: string): UserFolder[] => {
      const deleteFolder = (folders: Folder[]): Folder[] => {
        return folders
          .filter((folder) => folder.id !== id)
          .map((folder) => ({
            ...folder,
            subfolders: deleteFolder(folder.subfolders),
          }));
      };

      return data.map((root) => ({
        ...root,
        folders: deleteFolder(root.folders),
      }));
    };

    setCurrentFolders(deleteFolders(currentFolders, id));

    // if db call works, then update the state, if not, toast message

    setSavedFolders(deleteFolders(currentFolders, id));
  } else {
    // logic to delete node files cascading from parents

    const deleteNodes = (
      data: UserFolder[],
      id: string,
      parent_id: string
    ): UserFolder[] => {
      const deleteNode = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === parent_id) {
            return {
              ...folder,
              nodes: folder.nodes.filter((node) => node.id !== id),
            };
          } else {
            return {
              ...folder,
              subfolders: deleteNode(folder.subfolders),
            };
          }
        });
      };

      return data.map((root) => ({
        ...root,
        folders: deleteNode(root.folders),
      }));
    };

    setCurrentFolders(deleteNodes(currentFolders, id, parentId));

    // save to the db, if it fails post a toast message

    setSavedFolders(deleteNodes(currentFolders, id, parentId));
  }
};

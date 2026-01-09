import { Folder, NodeFileType, UserFolder } from "@/app/Constants/types";

type DeleteNodesAndFoldersType = {
  type: NodeFileType;
  savedFolders: UserFolder;
  id: string;
  parentId?: string;
  setSavedFolders: (savedFolders: UserFolder) => void;
};

export const deleteNodesAndFolders = (props: DeleteNodesAndFoldersType) => {
  const { type, savedFolders, id, setSavedFolders, parentId = "" } = props;

  if (type === "folder") {
    // logic to delete folders cascading from parents

    const deleteFolders = (data: UserFolder, id: string): UserFolder => {
      const deleteFolder = (folders: Folder[]): Folder[] => {
        return folders
          .filter((folder) => folder.id !== id)
          .map((folder) => ({
            ...folder,
            subfolders: deleteFolder(folder.subfolders),
          }));
      };

      return {
        ...data,
        folders: deleteFolder(data.folders),
      };
    };

    setSavedFolders(deleteFolders(savedFolders, id));
  } else {
    // logic to delete node files cascading from parents

    const deleteNodes = (
      data: UserFolder,
      id: string,
      parent_id: string
    ): UserFolder => {
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

      return {
        ...data,
        folders: deleteNode(data.folders),
      };
    };

    setSavedFolders(deleteNodes(savedFolders, id, parentId));
  }
};

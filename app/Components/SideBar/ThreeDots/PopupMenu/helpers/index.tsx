import { deleteFolderPost, deleteNodeFilePost } from "@/app/Constants/requests";
import { Folder, NodeFileType, UserFolder } from "@/app/Constants/types";

type DeleteNodesAndFoldersType = {
  type: NodeFileType;
  savedFolders: UserFolder;
  id: string;
  parentId?: string;
  setSavedFolders: (savedFolders: UserFolder) => void;
};

export const deleteNodesAndFolders = async (
  props: DeleteNodesAndFoldersType
) => {
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

    // delete from db, and update if successful
    const deleted = await deleteFolderPost(id);

    if (deleted) {
      setSavedFolders(deleteFolders(savedFolders, id));
    }
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

    // delete from db, and update if successful
    const deleted = await deleteNodeFilePost(id);

    if (deleted) {
      setSavedFolders(deleteNodes(savedFolders, id, parentId));
    }
  }
};

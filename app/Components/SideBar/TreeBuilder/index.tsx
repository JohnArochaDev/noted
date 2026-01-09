import { useNodes } from "@/app/Context";

import { TreeFolder } from "../Folder";

export const TreeBuilder = () => {
  const { savedFolders } = useNodes();

  return (
    <>
      {savedFolders && savedFolders.folders.map((folder) => (
        <TreeFolder folderData={folder} key={folder.id} />
      ))}
    </>
  );
};

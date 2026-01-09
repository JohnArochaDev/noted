import { useNodes } from "@/app/Context";

import { TreeFolder } from "../Folder";

export const TreeBuilder = () => {
  const { savedFolders, isLoadingFolders } = useNodes();

  // loading state
  if (isLoadingFolders) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#9e968e",
          fontSize: "14px",
        }}
      >
        Loading folders...
      </div>
    );
  }

  // empty state (no folders yet)
  if (!savedFolders?.folders || savedFolders.folders.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#666",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        No folders yet. Create one to get started!
      </div>
    );
  }

  // normal state - render folders
  return (
    <>
      {savedFolders.folders.map((folder) => (
        <TreeFolder folderData={folder} key={folder.id} />
      ))}
    </>
  );
};

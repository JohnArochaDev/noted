import { RootFolder } from "@/app/Constants/types";

import { TreeFolder } from "../Folder";

type TreeBuilderType = {
  data: RootFolder[];
};

export const TreeBuilder = (props: TreeBuilderType) => {
  const { data } = props;

  return (
    <>
      {data[0].folders.map((folder) => (
        <TreeFolder folderData={folder} key={folder.id} />
      ))}
    </>
  );
};

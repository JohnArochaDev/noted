export type UserFolder = {
  id: string;
  folders: Folder[];
};

export type Folder = {
  id: string;
  parent_id: string | null;
  name: string;
  type: NodeFileType;
  subfolders: Folder[];
  nodes: Node[];
};

export type Node = {
  id: string;
  parent_id: string;
  name: string;
  type: NodeFileType;
};

export type NodeFileType = "folder" | "node";

export type Nodule = {
  id: string;
  pageId: number;
  type: NodePlateType;
  position: Coordinates;
  width: number;
  height: number;
  data: NoduleData;
};

export type Coordinates = { x: number; y: number };

export type NoduleData = { text: string };

export type NodePlateType = "textNode";

export type EditNoduleType = {
  activeFolder: string | undefined;
  activeNode: string | undefined;
  editMode: boolean;
};

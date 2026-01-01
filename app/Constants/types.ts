export type RootFolder = {
  id: string;
  folders: Folder[];
};

export type Folder = {
  id: string;
  parent_id: string | null;
  name: string;
  type: NodeType;
  subfolders: Folder[];
  nodes: Node[];
};

export type Node = {
  id: string;
  parent_id: string;
  name: string;
  data: string;
  type: NodeType;
};

export type NodeType = "folder" | "node";

export type TextNodeType = {
  id: string;
  pageId: number;
  type: NodePlateType;
  position: Coordinates;
  width: number;
  height: number
  data: nodeData;
};

export type Coordinates = {x: number, y: number};

export type nodeData = { text: string }

export type NodePlateType = "textNode";

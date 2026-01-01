export type RootFolder = {
  id: number; // use ID number
  folders: Folder[];
};

export type Folder = {
  id: number;
  parent_id: number | null;
  name: string;
  type: NodeType;
  subfolders: Folder[];
  nodes: Node[];
};

export type Node = {
  id: number;
  parent_id: number;
  name: string;
  data: string;
  type: NodeType;
};

export type NodeType = "folder" | "node";

export type TextNodeType = {
  id: string;
  type: NodePlateType;
  position: Coordinates;
  width: number;
  height: number
  data: nodeData;
};

export type Coordinates = {x: number, y: number};

export type nodeData = { text: string }

export type NodePlateType = "textNode";

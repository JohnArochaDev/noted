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

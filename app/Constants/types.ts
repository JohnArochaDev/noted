export type Folder = {
  id: number;
  parent_id: number;
  name: string;
  type: NodeType;
  subFolders: Folder;
  nodes: Node;
};

export type Node = {
  id: number;
  parent_id: number;
  name: string;
  data: string;
};

export type NodeType = "folder" | "node";

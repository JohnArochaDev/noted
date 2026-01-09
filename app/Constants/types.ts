import { Node } from "@xyflow/react";

export type UserFolder = {
  id: string;
  userId?: string;
  folders: Folder[];
};

export type Folder = {
  id: string;
  parentId: string | null;
  name: string;
  type: NodeFileType;
  subfolders: Folder[];
  nodes: NodeFile[];
};

export type NodeFile = {
  id: string;
  parentId: string;
  name: string;
  type: NodeFileType;
};

export type NodeFileType = "folder" | "node";

export type Nodule = Node<NoduleData, NodePlateType> & {
  id: string;
  pageId: string;
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

export type LoginRegisterSwitchProps = {
  selected: SelectedType;
  setSelected: (value: SelectedType) => void;
};

export type SelectedType = "login" | "register";

export type UserResponse = {
  token: string;
  user: User;
};

export type User = {
  userId: string;
  username: string;
  password: string;
};

export type CreateFolderOrNodeResponse = {
  id: string;
  parentId: string;
  name: string;
};

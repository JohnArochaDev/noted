import { CreateFolderOrNodeResponse, UserFolder, UserResponse } from "./types";

export const loginPost = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/noted/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data: UserResponse = await response.json();
    console.log("LOGIN REQUEST", data);

    return data;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Login error:", err);
    throw err;
  }
};

export const fetchFolders = async () => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:8080/noted/folders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserFolder = await response.json();

    return data;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Failed to fetch folders:", err);
  }
};

export const newFolderPost = async (parentId: string | null, name: string) => {
  const token = localStorage.getItem("authToken");

  const folder = {
    parent_id: parentId,
    name: name,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(folder),
    });

    if (!response.ok) {
      throw new Error(`Failed to save folder: ${response.status}`);
    }

    const createdFolder: CreateFolderOrNodeResponse = await response.json();

    return createdFolder;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Folder save error:", err);

    throw err;
  }
};

export const newFilePost = async (parentId: string, name: string) => {
  const token = localStorage.getItem("authToken");

  const nodeFile = {
    parent_id: parentId,
    name: name,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/node-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nodeFile),
    });

    if (!response.ok) {
      throw new Error(`Failed to save node file: ${response.status}`);
    }

    const createdNodeFile: CreateFolderOrNodeResponse = await response.json();

    return createdNodeFile;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Node file save error:", err);

    throw err;
  }
};

export const updateFolderPut = async (id: string, name: string) => {
  const token = localStorage.getItem("authToken");

  const folder = {
    id: id,
    name: name,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/folders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(folder),
    });

    if (!response.ok) {
      throw new Error(`Failed to save node file: ${response.status}`);
    }

    return true;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Node file save error:", err);

    return false;
  }
};

export const updateFilePut = async (id: string, name: string) => {
  const token = localStorage.getItem("authToken");

  const nodeFile = {
    id: id,
    name: name,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/node-files", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nodeFile),
    });

    if (!response.ok) {
      throw new Error(`Failed to save node file: ${response.status}`);
    }

    return true;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Node file save error:", err);

    return false;
  }
};

export const deleteFolderPost = async (id: string) => {
  const token = localStorage.getItem("authToken");

  const folder = {
    id: id,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/folders", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(folder),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete folder: ${response.status}`);
    }

    return true;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Folder save error:", err);

    return false;
  }
};

export const deleteNodeFilePost = async (id: string) => {
  const token = localStorage.getItem("authToken");

  const nodeFile = {
    id: id,
  };

  try {
    const response = await fetch("http://localhost:8080/noted/node-files", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nodeFile),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete folder: ${response.status}`);
    }

    return true;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Folder save error:", err);

    return false;
  }
};

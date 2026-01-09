import {
  CreateFolderOrNodeResponse,
  Nodule,
  UserFolder,
  UserResponse,
} from "./types";

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

    return data;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Login error:", err);
    throw err;
  }
};

export const registerPost = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/noted/users/register", {
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

    return true;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Login error:", err);
    return false;
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
    return { id: "", folders: [] };
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

export const saveNodulesPost = async (nodules: Nodule[]) => {
  const token = localStorage.getItem("authToken");

  const nodulesToUpdate = nodules.map((nodule) => ({
    parentId: nodule.pageId,
    x: Math.round(nodule.position.x), // make sure integers are sent
    y: Math.round(nodule.position.y),
    width: nodule.width,
    height: nodule.height,
    textContent: nodule.data.text ?? "",
  }));

  try {
    const response = await fetch("http://localhost:8080/noted/nodules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nodulesToUpdate),
    });

    if (!response.ok) {
      throw new Error(`Failed to save folder: ${response.status}`);
    }

    // eslint-disable-next-line
    const createdNodules: any[] = await response.json();

    const formattedNodules: Nodule[] = createdNodules.map((nodule) => ({
      id: nodule.id,
      pageId: nodule.parentId,
      type: "textNode" as const,
      position: {
        x: nodule.coordinates.x,
        y: nodule.coordinates.y,
      },
      width: nodule.width,
      height: nodule.height,
      data: {
        text: nodule.data?.text ?? "",
      },
    }));

    return formattedNodules;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Nodules save error:", err);

    throw err;
  }
};

export const getNodules = async (pageId: string): Promise<Nodule[]> => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in");
  }

  if (!pageId) {
    throw new Error("pageId is required to fetch nodules");
  }

  try {
    const response = await fetch(
      `http://localhost:8080/noted/nodule?parentId=${encodeURIComponent(
        pageId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(
        `Failed to fetch nodules: ${response.status} ${errorText}`
      );
    }

    // eslint-disable-next-line
    const rawNodules: any[] = await response.json();

    const formattedNodules: Nodule[] = rawNodules.map((nodule) => ({
      id: nodule.id,
      pageId: nodule.parentId,
      type: "textNode" as const,
      position: {
        x: nodule.coordinates.x,
        y: nodule.coordinates.y,
      },
      width: nodule.width,
      height: nodule.height,
      data: {
        text: nodule.data?.text ?? "",
      },
    }));

    return formattedNodules;

    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Error fetching nodules:", err);
    throw err;
  }
};

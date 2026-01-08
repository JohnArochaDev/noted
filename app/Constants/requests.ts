import { UserResponse } from "./types";

export const login = async (username: string, password: string) => {
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
    console.log('LOGIN REQUEST', data)

    return data;
    // eslint-disable-next-line
  } catch (err: any) {
    console.error("Login error:", err);
    throw err;
  }
};

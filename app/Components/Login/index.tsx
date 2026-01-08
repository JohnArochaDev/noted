import { useEffect, useState } from "react";

import { login } from "@/app/Constants/requests";
import { SelectedType } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { Button } from "../Button";
import { Input } from "../Input";
import { Spacer } from "../Spacer";
import { LoginRegisterSwitch } from "./LoginRegisterSwitch";
import styles from "./styles.module.scss";

type LoginType = {
  username: string;
  password: string;
};

type RegisterType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const LoginPage = () => {
  const { setUserId } = useNodes();

  const [selected, setSelected] = useState<SelectedType>("login");

  const [loginData, setLoginData] = useState<LoginType>({
    username: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterType>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async () => {
    try {
      const response = await login(loginData.username, loginData.password);

      const { token, user } = response;

      if (token && user?.userId) {
        localStorage.setItem("authToken", token);

        setUserId(user.userId);

        console.log("Login successful!");
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.error("Login failed:", error);

      alert("Login failed. Please check your credentials.");
    }
  };

  // Clear fields when switching between login and register
  useEffect(() => {
    // eslint-disable-next-line
    setLoginData({ username: "", password: "" });
    setRegisterData({ username: "", password: "", confirmPassword: "" });
  }, [selected]);

  const passwordsMatch = registerData.password === registerData.confirmPassword;
  const canRegister =
    registerData.username.trim() !== "" &&
    registerData.password.trim() !== "" &&
    passwordsMatch;

  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>noted.exe</h1>
      <h5 className={styles.text}>authentication system v1.0</h5>
      <div
        className={
          selected === "login" ? styles.loginModal : styles.registerModal
        }
      >
        <LoginRegisterSwitch selected={selected} setSelected={setSelected} />

        {selected === "login" && (
          <div className={styles.containerLogin}>
            <Input
              label="USERNAME"
              placeholder="ENTER USERNAME..."
              value={loginData.username}
              onChange={(value) =>
                setLoginData((prev) => ({ ...prev, username: value }))
              }
            />
            <Input
              label="PASSWORD"
              placeholder="ENTER PASSWORD..."
              value={loginData.password}
              onChange={(value) =>
                setLoginData((prev) => ({ ...prev, password: value }))
              }
            />
            <Spacer size="lg" direction="vertical" />
            <Button
              label="LOGIN"
              onClick={() => handleLogin()}
              centered
            />
          </div>
        )}

        {selected === "register" && (
          <div className={styles.containerRegister}>
            <Input
              label="USERNAME"
              placeholder="ENTER USERNAME..."
              value={registerData.username}
              onChange={(value) =>
                setRegisterData((prev) => ({ ...prev, username: value }))
              }
            />
            <Input
              label="PASSWORD"
              placeholder="ENTER PASSWORD..."
              value={registerData.password}
              onChange={(value) =>
                setRegisterData((prev) => ({ ...prev, password: value }))
              }
            />
            <Input
              label="CONFIRM PASSWORD"
              placeholder="CONFIRM PASSWORD..."
              value={registerData.confirmPassword}
              onChange={(value) =>
                setRegisterData((prev) => ({ ...prev, confirmPassword: value }))
              }
            />
            <Spacer size="lg" direction="vertical" />
            <Button
              label="CREATE ACCOUNT"
              onClick={() => {}}
              centered
              disabled={!canRegister}
            />
          </div>
        )}

        <h5 className={styles.rights}>
          SYSTEM STATUS: <span style={{ color: "#00ff00" }}>ONLINE</span>
          <br />
          <br />© {currentYear} noted.exe - All Rights Reserved
        </h5>
      </div>
    </div>
  );
};

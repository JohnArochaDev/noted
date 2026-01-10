import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { loginPost, registerPost } from "@/app/Constants/requests";
import { SelectedType } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { Button } from "../Button";
import { Input } from "../Input";
import { Spacer } from "../Spacer";
import { useToast } from "../Toast";
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
  const { showError } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await loginPost(loginData.username, loginData.password);

      const { token, user } = response;

      if (token && user?.userId) {
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userId", user.userId);
          setUserId(user.userId);
        }
        
        console.log("Login successful!");
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.error("Login failed:", error);
      showError("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    const registered = await registerPost(
      registerData.username,
      registerData.password
    );

    if (!registered) {
      showError("Account already exists");
      return;
    }

    setSelected("login");
    setRegisterData({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const passwordsMatch = registerData.password === registerData.confirmPassword;
  const fieldsFilled =
    registerData.username.trim() !== "" &&
    registerData.password.trim() !== "" &&
    registerData.confirmPassword.trim() !== "";

  const noValidationErrors = !usernameError && !passwordError && !confirmError;

  const canRegister = fieldsFilled && passwordsMatch && noValidationErrors;

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // eslint-disable-next-line
    setLoginData({ username: "", password: "" });
    setRegisterData({ username: "", password: "", confirmPassword: "" });
    setUsernameError(null);
    setPasswordError(null);
    setConfirmError(null);
  }, [selected]);

  useEffect(() => {
    const pageIdParam = searchParams.get("pageId");

    if (pageIdParam !== null) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("pageId");

      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}`
        : pathname;

      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

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
              type="person"
            />
            <Input
              label="PASSWORD"
              placeholder="ENTER PASSWORD..."
              value={loginData.password}
              onChange={(value) =>
                setLoginData((prev) => ({ ...prev, password: value }))
              }
              type="lock"
            />
            <Spacer size="lg" direction="vertical" />
            <Button label="LOGIN" onClick={handleLogin} centered />
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
              type="person"
              validateAs="username"
              minLength={3}
              onError={(err) => setUsernameError(err)}
            />
            <Input
              label="PASSWORD"
              placeholder="ENTER PASSWORD..."
              value={registerData.password}
              onChange={(value) =>
                setRegisterData((prev) => ({ ...prev, password: value }))
              }
              type="lock"
              validateAs="password"
              minLength={8}
              onError={(err) => setPasswordError(err)}
            />
            <Input
              label="CONFIRM PASSWORD"
              placeholder="CONFIRM PASSWORD..."
              value={registerData.confirmPassword}
              onChange={(value) =>
                setRegisterData((prev) => ({ ...prev, confirmPassword: value }))
              }
              type="lock"
              validateAs="password"
              minLength={8}
              onError={(err) => setConfirmError(err)}
            />
            <Spacer size="lg" direction="vertical" />
            <Button
              label="CREATE ACCOUNT"
              onClick={handleRegister}
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

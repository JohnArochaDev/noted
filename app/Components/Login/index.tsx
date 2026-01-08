import { useState } from "react";

import { SelectedType } from "@/app/Constants/types";

import { Button } from "../Button";
import { Input } from "../Input";
import { Spacer } from "../Spacer";
import { LoginRegisterSwitch } from "./LoginRegisterSwitch";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  const [selected, setSelected] = useState<SelectedType>("login");

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
          <div className={styles.container}>
            <Input label="USERNAME" placeholder="ENTER USERNAME..." />
            <Input label="PASSWORD" placeholder="ENTER PASSWORD..." />
            <Spacer size="x" direction="vertical" />
            <Button label="LOGIN" onClick={() => {}} centered />
          </div>
        )}

        {selected === "register" && (
          <div className={styles.container}>
            <Input label="USERNAME" placeholder="ENTER USERNAME..." />
            <Input label="PASSWORD" placeholder="ENTER PASSWORD..." />
            <Input label="PASSWORD" placeholder="ENTER PASSWORD..." />
            <Spacer size="x" direction="vertical" />
            <Button label="LOGIN" onClick={() => {}} centered />
          </div>
        )}
        <h5 className={styles.rights}>
          SYSTEM STATUS:{" "}
          <span style={{ color: "#00ff00"}}>ONLINE</span>
          <br />
          <br />© {currentYear} noted.exe - ALL RIGHTS RESERVED
        </h5>
      </div>
    </div>
  );
};

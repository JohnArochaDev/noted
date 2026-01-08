import { useState } from "react";

import { SelectedType } from "@/app/Constants/types";

import { Button } from "../Button";
import { Input } from "../Input";
import { Spacer } from "../Spacer";
import { LoginRegisterSwitch } from "./LoginRegisterSwitch";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  const [selected, setSelected] = useState<SelectedType>("login");
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>noted.exe</h1>
      <h5 className={styles.text}>authentication system v1.0</h5>
      <div className={styles.loginModal}>
        <LoginRegisterSwitch selected={selected} setSelected={setSelected} />
        <div className={styles.container}>
          <Input label="USERNAME" placeholder="ENTER USERNAME..." />
          <Input label="PASSWORD" placeholder="ENTER PASSWORD..." />
          <Spacer size="x" direction="vertical" />
          <Button label="LOGIN" onClick={() => {}} centered />
        </div>
      </div>
    </div>
  );
};

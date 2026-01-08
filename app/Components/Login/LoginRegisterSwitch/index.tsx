import { useState } from "react";

import styles from "./styles.module.scss";

type SelectedType = "login" | "register";

export const LoginRegisterSwitch = () => {
  const [selected, setSelected] = useState<SelectedType>("login");

  return (
    <div className={styles.loginRegisterSwitch}>
      <div
        className={`${styles.switchDiv} ${
          selected === "login" ? styles.selected : ""
        }`}
        onClick={() => setSelected("login")}
      >
        Login
      </div>
      <div
        className={`${styles.switchDiv} ${
          selected === "register" ? styles.selected : ""
        }`}
        onClick={() => setSelected("register")}
      >
        Register
      </div>
    </div>
  );
};

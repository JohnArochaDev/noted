import { LoginRegisterSwitchProps } from "@/app/Constants/types";

import styles from "./styles.module.scss";

export const LoginRegisterSwitch = ({
  selected,
  setSelected,
}: LoginRegisterSwitchProps) => {
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

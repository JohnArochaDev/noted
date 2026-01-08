import { LoginRegisterSwitch } from "./LoginRegisterSwitch";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.login}>
      <div className={styles.loginModal}>
        <LoginRegisterSwitch />
      </div>
    </div>
  );
};

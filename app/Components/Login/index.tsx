import { Input } from "../Input";
import { LoginRegisterSwitch } from "./LoginRegisterSwitch";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>noted.exe</h1>
      <h5 className={styles.text}>authentication system v1.0</h5>
      <div className={styles.loginModal}>
        <LoginRegisterSwitch />
        <div className={styles.container} >
          <Input label="username" />
          <Input label="password" />
        </div>
      </div>
    </div>
  );
};

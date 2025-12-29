import styles from "./styles.module.scss";

export const SideBar = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.sidebar}>{children}</div>;
};

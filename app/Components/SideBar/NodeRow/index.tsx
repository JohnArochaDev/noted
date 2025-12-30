import styles from "./styles.module.scss";

export const NodeRow = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.containerRow}>{children}</div>;
};

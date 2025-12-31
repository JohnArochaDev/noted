import styles from "./styles.module.scss";

type ButtonType = {
  label: string;
};

export const Button = (props: ButtonType) => {
  const { label } = props;
  return (
    <div>
      <button className={styles.button}>{label}</button>
    </div>
  );
};

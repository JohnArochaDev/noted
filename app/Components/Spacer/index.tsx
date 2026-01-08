import styles from "./styles.module.scss";

type SpacerProps = {
  size: "xs" | "sm" | "md" | "lg" | "x" | "xl" | number;
  direction?: "horizontal" | "vertical";
};

export const Spacer = ({
  size = "md",
  direction = "vertical",
}: SpacerProps) => {
  const className = `${styles.spacer} ${
    typeof size === "string" ? styles[size] : ""
  } ${direction === "horizontal" ? styles.horizontal : ""}`;

  const inlineStyle =
    typeof size === "number"
      ? direction === "horizontal"
        ? { width: `${size}px` }
        : { height: `${size}px` }
      : undefined;

  return <div className={className} style={inlineStyle} />;
};

import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import styles from "./styles.module.scss";

type CustomTextNode = Node<{ title: string; text: string }, 'text'>;

export function TextNode({ data }: NodeProps<CustomTextNode>) {
  return (
    <div className={styles.textNode}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <p className={styles.title}>{data.title}</p>
      <hr className={styles.seperator} />
      <p>{data.text}</p>
    </div>
  );
};
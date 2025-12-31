import {
  Handle,
  Position,
  NodeProps,
  Node,
  NodeResizer,
  ResizeParams,
} from "@xyflow/react";
import { D3DragEvent, SubjectPosition } from "d3-drag";

import styles from "./styles.module.scss";

type CustomTextNode = Node<{ title: string; text: string }, "text">;

export function TextNode({ data, selected, id }: NodeProps<CustomTextNode>) {
  const handleResizeEnd = (
    _event: D3DragEvent<HTMLDivElement, null, SubjectPosition>,
    params: ResizeParams
  ) => {
    console.log(
      `Node ${id} new dimensions: width=${params.width}, height=${params.height}`
    );
    // Or perform other actions, like saving to external state
  };

  return (
    <div className={styles.textNode} style={{ width: "100%", height: "100%" }}>
      <NodeResizer
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        onResizeEnd={handleResizeEnd}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <p className={styles.title}>{data.title}</p>
      <hr className={styles.seperator} />
      <p className={styles.text}>{data.text}</p>
    </div>
  );
}

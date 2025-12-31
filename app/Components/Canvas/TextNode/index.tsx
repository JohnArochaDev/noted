import { NodeProps, Node, NodeResizer, ResizeParams } from "@xyflow/react";
import { D3DragEvent, SubjectPosition } from "d3-drag";

import styles from "./styles.module.scss";

type CustomTextNode = Node<{ title: string; text: string }, "textNode">;

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
    <div
      className={styles.textNode}
      style={{
        width: "100%",
        height: "100%",
        boxShadow: selected ? "" : "2px 2px #464342",
      }}
    >
      <NodeResizer
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        onResizeEnd={handleResizeEnd}
        color="#9e968e"
        handleStyle={{
          background: "#9e968e",
          width: "5px",
          height: "5px",
        }}
      />

      <p className={styles.title}>{data.title}</p>
      <hr className={styles.seperator} />
      <p className={styles.text}>{data.text}</p>
    </div>
  );
}

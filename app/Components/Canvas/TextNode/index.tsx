import ReactMarkdown from "react-markdown";

import { Node, NodeProps, NodeResizer, ResizeParams } from "@xyflow/react";
import { D3DragEvent, SubjectPosition } from "d3-drag";

import { SquareButton } from "../../SquareButton";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

type CustomTextNode = Node<{ title: string; text: string }, "textNode">;

export function TextNode({ data, selected, id }: NodeProps<CustomTextNode>) {

  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState<string>(data.text)

  const handleResizeEnd = (
    _event: D3DragEvent<HTMLDivElement, null, SubjectPosition>,
    params: ResizeParams
  ) => {
    console.log(
      `Node ${id} new dimensions: width=${params.width}, height=${params.height}`
    );
    // save to external context in future
  };

  useEffect(() => {
    if (!selected) {
      setIsEditing(false);
    }
  }, [selected]);

  return (
    <div
      className={styles.textNode}
      style={{
        width: "100%",
        height: "100%",
        boxShadow: selected ? "" : "2px 2px #464342",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {selected && (
        <SquareButton
          type="edit"
          onClick={() => setIsEditing(!isEditing)}
          customStyles={{
            width: "25px",
            height: "25px",
            position: "absolute",
            top: "-30px",
            right: "-55px",
          }}
        />
      )}{" "}
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
      <div style={{ flex: 1, overflow: "hidden" }}>
        {isEditing ? (
          <textarea
            className={styles.text}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              resize: "none",
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          ></textarea>
        ) : (
          <div
            className={styles.text}
            style={{ height: "100%", overflow: "auto" }}
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

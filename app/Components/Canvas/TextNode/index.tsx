import ReactMarkdown from "react-markdown";

import {
  Node,
  NodeProps,
  NodeResizer,
  ResizeParams,
  useReactFlow,
} from "@xyflow/react";
import { D3DragEvent, SubjectPosition } from "d3-drag";

import { SquareButton } from "../../SquareButton";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";

type CustomTextNode = Node<{ title: string; text: string }, "textNode">;

export function TextNode({ data, selected, id }: NodeProps<CustomTextNode>) {
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState<string>(data.text);
  const [title, setTitle] = useState<string>(data.title);

  const rf = useReactFlow();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    rf.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, draggable: !isEditing } : node
      )
    );
  }, [isEditing, id, rf]);

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      textRef.current.setSelectionRange(text.length, text.length);
    }
  }, [isEditing, text]);

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
      {isEditing ? (
        <input
          ref={titleRef}
          className={`${styles.title} nopan`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          style={{
            border: "none",
            background: "transparent",
            resize: "none",
            overflow: "auto",
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "14px"
          }}
        />
      ) : (
        <div
          className={styles.title}
          style={{
            border: "none",
            textAlign: "center",
            paddingBottom: "14px",
            paddingTop: "10px",
          }}
        >
          <ReactMarkdown
            components={{
              p: (props) => <p style={{ margin: 0 }} {...props} />,
            }}
          >
            {title}
          </ReactMarkdown>
        </div>
      )}
      <hr className={styles.seperator} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {isEditing ? (
          <textarea
            ref={textRef}
            className={`${styles.text} nopan`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              border: "none",
              background: "transparent",
              resize: "none",
              width: "100%",
              height: "100%",
              overflow: "auto",
              textAlign: "center",
              fontSize: "15px",
              paddingTop: "10px",
            }}
          />
        ) : (
          <div
            className={styles.text}
            style={{
              height: "100%",
              overflow: "auto",
              textAlign: "center",
              fontSize: "15px",
              paddingTop: "10px",
            }}
          >
            <ReactMarkdown
              components={{
                p: (props) => <p style={{ margin: 0 }} {...props} />,
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Node,
  NodeProps,
  NodeResizer,
  ResizeParams,
  useReactFlow,
} from "@xyflow/react";
import { D3DragEvent, SubjectPosition } from "d3-drag";
import remarkGfm from "remark-gfm";

import { SquareButton } from "../../SquareButton";
import styles from "./styles.module.scss";

type TextNodeType = Node<{ text: string }, "textNode">;

export function TextNode({ data, selected, id }: NodeProps<TextNodeType>) {
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState<string>(data.text);

  const rf = useReactFlow();

  const textRef = useRef<HTMLTextAreaElement>(null);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

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
              paddingTop: "20px",
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
              paddingTop: "20px",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => <p style={{ margin: 0 }} {...props} />,
                table: (props) => (
                  <table style={{ margin: "0 auto" }} {...props} />
                ),
                ul: (props) => (
                  <ul
                    style={{
                      textAlign: "left",
                      maxWidth: "fit-content",
                      margin: "0 auto",
                      paddingLeft: "20px",
                    }}
                    {...props}
                  />
                ),
                ol: (props) => (
                  <ol
                    style={{
                      textAlign: "left",
                      maxWidth: "fit-content",
                      margin: "0 auto",
                      paddingLeft: "20px",
                    }}
                    {...props}
                  />
                ),
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

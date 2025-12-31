import Draggable from "react-draggable";
import { NodePlate } from "@/app/Constants/types";
import { useRef } from "react";
import styles from "./styles.module.scss";
import { Panel } from "@xyflow/react";

export const TextNode = (props: NodePlate) => {
  const { id, type, title, data, coordinates } = props;

  const nodeRef = useRef(null);

  return (
    <Panel>
      <Draggable nodeRef={nodeRef}>
        <div ref={nodeRef} className={styles.textNode}>
          <p className={styles.title}>{title}</p>
          <hr className={styles.seperator} />
          <p>{data}</p>
        </div>
      </Draggable>
    </Panel>
  );
};

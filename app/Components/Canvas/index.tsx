"use client";
import "@xyflow/react/dist/style.css";

import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";
import styles from "./styles.module.scss";

export const Canvas = () => {
  return (
    <div className={styles.canvas}>
      <ReactFlow
        fitView
        snapGrid={[20, 20]} // change this to match the dots
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        preventScrolling
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        deleteKeyCode={null}
        minZoom={0.1}
        maxZoom={2}
        translateExtent={[
          [0, 0], // top left boundary coordinates
          [5000, 5000], // bottom right boundary coordinates
        ]}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(255,255,255,0.1)"
          bgColor="#121113"
        />
      </ReactFlow>
    </div>
  );
};

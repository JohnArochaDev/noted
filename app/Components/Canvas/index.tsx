"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Node,
  OnNodesChange,
  Panel,
  PanOnScrollMode,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useReactFlow,
  useViewport,
} from "@xyflow/react";

import { ViewportClamper } from "./helpers";

import "@xyflow/react/dist/style.css";
import { useNodes } from "@/app/Context";

import { RecenterButton } from "./RecenterCanvasButton";
import styles from "./styles.module.scss";
import { TextNode } from "./TextNode";

export type CustomTextNode = Node<TextNodeData, "textNode">;

type TextNodeData = { text: string };

export const Canvas = () => {
  const { savedPageNodes, setSavedPageNodes } = useNodes();

  const [nodes, setNodes] = useNodesState<CustomTextNode>(savedPageNodes);
  const [minZoomVal, setMinZoomVal] = useState(0.1);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  const nodeTypes = { textNode: TextNode };

  // ########## Saving and updating nodes with context ##########

  // later, when I add the save button, the result of this will be saved to `pageNodes`. pageNodes
  // will be the SAVED version of the node file, and the nodes will be the version used to track the
  // nodes current (unsaved) locations and values. later, when saving, map through the `nodes`, and
  // map the needed fields to the pageNodes, then save them with the setPageNodes and make the call
  // to update the data.

  const onNodesChange: OnNodesChange<CustomTextNode> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const extentWidth = 5000;
        const extentHeight = 5000;
        const newMinZoom = Math.max(width / extentWidth, height / extentHeight);
        setMinZoomVal(newMinZoom);
        setViewportSize({ width, height });
      }
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReactFlowProvider>
        <div className={styles.canvas} ref={canvasRef}>
          <ReactFlow
            fitView
            nodeTypes={nodeTypes}
            nodes={nodes}
            onNodesChange={onNodesChange}
            snapToGrid
            snapGrid={[20, 20]}
            panOnDrag
            zoomOnScroll
            zoomOnPinch
            zoomOnDoubleClick={false}
            preventScrolling
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable
            deleteKeyCode={null}
            minZoom={minZoomVal}
            maxZoom={2}
            translateExtent={[
              [0, 0], // top left boundary coordinates
              [5000, 5000], // bottom right boundary coordinates
            ]}
            nodeExtent={[
              [0, 0], // top left boundary coordinates
              [5000, 5000], // bottom right boundary coordinates
            ]}
            panOnScrollMode={PanOnScrollMode.Free}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="rgba(255,255,255,0.1)"
              bgColor="#121113"
            />
            <Panel position="top-right">
              <RecenterButton />
            </Panel>
            <ViewportClamper viewportSize={viewportSize} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

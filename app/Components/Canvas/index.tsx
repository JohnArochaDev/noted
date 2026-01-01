"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useNodes } from "@/app/Context";

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

import "@xyflow/react/dist/style.css";

import { RecenterButton } from "./RecenterCanvasButton";
import styles from "./styles.module.scss";
import { TextNode } from "./TextNode";

type TextNodeData = { text: string };

export type CustomTextNode = Node<TextNodeData, "textNode">;

const ViewportClamper = ({
  viewportSize,
}: {
  viewportSize: { width: number; height: number };
}) => {
  const { setViewport } = useReactFlow();
  const { x, y, zoom } = useViewport();

  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height) return;

    const extentW = 5000;
    const extentH = 5000;

    let newX = x;
    let newY = y;

    const minTx = viewportSize.width - extentW * zoom;
    const minTy = viewportSize.height - extentH * zoom;
    const maxTx = 0;
    const maxTy = 0;

    if (minTx > maxTx) {
      newX = minTx / 2;
    } else {
      newX = Math.max(minTx, Math.min(x, maxTx));
    }

    if (minTy > maxTy) {
      newY = minTy / 2;
    } else {
      newY = Math.max(minTy, Math.min(y, maxTy));
    }

    if (newX !== x || newY !== y) {
      setViewport({ x: newX, y: newY, zoom }, { duration: 0 });
    }
  }, [x, y, zoom, viewportSize, setViewport]);

  return null;
};

export const Canvas = () => {

  const { pageNodes, setPageNodes } = useNodes()

  const nodeTypes = { textNode: TextNode };

  const [nodes, setNodes] = useNodesState<CustomTextNode>(pageNodes);


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

  const canvasRef = useRef<HTMLDivElement>(null);

  const [minZoomVal, setMinZoomVal] = useState(0.1);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

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

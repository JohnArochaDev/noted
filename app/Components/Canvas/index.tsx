"use client";
import "@xyflow/react/dist/style.css";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Panel,
  useNodesState,
  applyNodeChanges,
  Node,
  PanOnScrollMode,
  OnNodesChange,
  useReactFlow,
  useViewport,
} from "@xyflow/react";

import { useCallback, useEffect, useRef, useState } from "react";

import { RecenterButton } from "./RecenterCanvasButton";

import styles from "./styles.module.scss";
import { TextNode } from "./TextNode";

type TextNodeData = { title: string; text: string };

type CustomTextNode = Node<TextNodeData, "textNode">;

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
  const nodeTypes = { textNode: TextNode };

  const initialNodes: CustomTextNode[] = [
    {
      id: "1",
      type: "textNode",
      position: { x: 250, y: 250 },
      data: { title: "My Title", text: "Centered content here" },
    },
  ];

  const [nodes, setNodes] = useNodesState<CustomTextNode>(initialNodes);

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

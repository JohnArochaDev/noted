"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Background,
  BackgroundVariant,
  Node,
  Panel,
  PanOnScrollMode,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useNodes } from "@/app/Context";

import { ViewportClamper } from "./helpers";
import { RecenterButton } from "./RecenterCanvasButton";
import styles from "./styles.module.scss";
import { TextNode } from "./TextNode";

export type CustomTextNode = Node<TextNodeData, "textNode">;

type TextNodeData = { text: string };

export const Canvas = () => {
  const { currentPageNodes: initialNodes, setCurrentPageNodes } = useNodes();

  // eslint-disable-next-line
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomTextNode>(initialNodes);

  const [minZoomVal, setMinZoomVal] = useState(0.1);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Memoize nodeTypes and other static props
  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);

  const syncNodesToContext = useCallback(() => {
    setCurrentPageNodes(nodes);
  }, [nodes, setCurrentPageNodes]);

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

  useEffect(() => {
    syncNodesToContext();

    // eslint-disable-next-line
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
              [0, 0],
              [5000, 5000],
            ]}
            nodeExtent={[
              [0, 0],
              [5000, 5000],
            ]}
            panOnScrollMode={PanOnScrollMode.Free}
            onNodeDragStop={syncNodesToContext}
            onlyRenderVisibleElements // Lazily render off-screen elements
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

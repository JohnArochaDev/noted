"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Background,
  BackgroundVariant,
  Panel,
  PanOnScrollMode,
  ReactFlow,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { usePathname, useSearchParams } from "next/navigation";

import "@xyflow/react/dist/style.css";
import { Nodule } from "@/app/Constants/types";
import { useNodes } from "@/app/Context";

import { ViewportClamper } from "./helpers";
import { NoduleComp } from "./Nodule";
import { RecenterButton } from "./RecenterCanvasButton";
import styles from "./styles.module.scss";

export const Canvas = () => {
  const { currentPageNodes, setCurrentPageNodes } = useNodes();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [nodes, setNodes, onNodesChange] =
    useNodesState<Nodule>(currentPageNodes);

  const [minZoomVal, setMinZoomVal] = useState(0.1);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  const nodeTypes = useMemo(() => ({ textNode: NoduleComp }), []);

  const syncNodesToContext = useCallback(() => {
    setCurrentPageNodes(nodes);
  }, [nodes, setCurrentPageNodes]);

  useEffect(() => {
    setNodes(currentPageNodes);
  }, [currentPageNodes, setNodes]);

  const handleNodeDragStop = useCallback(() => {
    syncNodesToContext();
  }, [syncNodesToContext]);

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

  const { fitView } = useReactFlow();

  // run fitview when the URL path changes to fit the new nodes
  useEffect(() => {
    if (nodes.length === 0) return;

    const timer = setTimeout(() => {
      fitView({
        padding: 0.2,
        duration: 800,
        maxZoom: 1.5,
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, nodes.length, fitView]);

  return (
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
        onNodeDragStop={handleNodeDragStop}
        onlyRenderVisibleElements
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
  );
};

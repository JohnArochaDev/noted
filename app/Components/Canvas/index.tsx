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
} from "@xyflow/react";

import { useCallback } from "react";

import { RecenterButton } from "./RecenterCanvasButton";

import styles from "./styles.module.scss";
import { TextNode } from "./TextNode";

type TextNodeData = { title: string; text: string };

type CustomTextNode = Node<TextNodeData, "textNode">;

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

  return (
    <>
      <ReactFlowProvider>
        <div className={styles.canvas}>
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
            minZoom={0.1}
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
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

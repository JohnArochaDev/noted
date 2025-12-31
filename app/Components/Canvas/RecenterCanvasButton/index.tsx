"use client";

import { useReactFlow } from "@xyflow/react";
import { SquareButton } from "../../SquareButton";

export const RecenterButton = () => {
  const { setViewport, getViewport, zoomTo } = useReactFlow();

  const recenterCanvas = () => {
    const currentViewport = getViewport();
    const viewportWidth = window.innerWidth; // Adjust if sidebar affects width
    const viewportHeight = window.innerHeight;
    const boardWidth = 5000;
    const boardHeight = 5000;

    const centerX = viewportWidth / 2 - boardWidth / 2;
    const centerY = viewportHeight / 2 - boardHeight / 2;

    setViewport({ x: centerX, y: centerY, zoom: currentViewport.zoom });
    zoomTo(1);
  };

  return (
    <SquareButton
      type="focus"
      onClick={recenterCanvas}
      customStyles={{ marginTop: "20px", marginRight: "20px" }}
    />
  );
};

"use client";

import { useReactFlow } from "@xyflow/react";
import { SquareButton } from "../../SquareButton";

export const RecenterButton = () => {
  const { setViewport, getViewport, setCenter } = useReactFlow();

  const recenterCanvas = () => {
    const currentViewport = getViewport();

    setViewport({ x: 2500, y: 2500, zoom: currentViewport.zoom });
    setCenter(2500, 2500)
  };

  return (
    <SquareButton
      type="focus"
      onClick={recenterCanvas}
      customStyles={{ marginTop: "20px", marginRight: "20px" }}
    />
  );
};

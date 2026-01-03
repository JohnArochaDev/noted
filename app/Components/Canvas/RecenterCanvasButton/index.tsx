"use client";

import { useReactFlow } from "@xyflow/react";

import { SquareButton } from "../../SquareButton";

export const RecenterButton = () => {
  const { fitView } = useReactFlow();

  const recenterCanvas = () => {
    fitView(); // Padding adds some margin; duration animates the transition
  };

  return (
    <SquareButton
      type="focus"
      onClick={recenterCanvas}
      customStyles={{ marginTop: "20px", marginRight: "20px" }}
    />
  );
};

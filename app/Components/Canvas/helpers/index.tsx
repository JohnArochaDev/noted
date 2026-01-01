import { useEffect } from "react";

import { useReactFlow } from "@xyflow/react";
import { useViewport } from "@xyflow/react";

export const ViewportClamper = ({
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
import { useState } from "react";
import { Renderer } from "./Renderer.js";
import { Tooltip } from "./Tooltip";
import React from "react";
export const Heatmap = ({ width, height, data }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <div>
      <Renderer
        width={width}
        height={height}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} width={width} height={height} />
    </div>
  );
};

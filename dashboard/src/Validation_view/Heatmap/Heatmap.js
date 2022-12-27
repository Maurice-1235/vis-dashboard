import { useState } from "react";
import { Renderer } from "./Renderer.js";
import { Tooltip } from "./Tooltip";
import React from "react";
const xAxisLabel = 'A'
const yAxisLabel = 'B'
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
      <text x={300} y={300}textAnchor="middle">
          {xAxisLabel}
        </text>
        <text x={-150} y={-40} textAnchor="middle" transform="rotate(-90)">
          {yAxisLabel}
        </text>
    </div>
    
  );
};

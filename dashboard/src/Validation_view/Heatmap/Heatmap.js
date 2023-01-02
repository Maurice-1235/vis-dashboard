import { useState } from "react";
import { Renderer } from "./Renderer.js";
import { Tooltip } from "./Tooltip";
import React from "react";
const xAxisLabel = "A";
const yAxisLabel = "B";
export const Heatmap = ({ width, height, data, src_name, trg_name }) => {
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
      <text x={width / 2} y={240} textAnchor="middle">
        {src_name}
      </text>
      <text x={-30} y={30} textAnchor="middle">
        {trg_name}
      </text>
    </div>
  );
};

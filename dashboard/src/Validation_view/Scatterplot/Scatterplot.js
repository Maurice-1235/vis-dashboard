import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import "./scatterplot.css"
import React, { useState } from "react";
import { Tooltip } from "./Tooltip";

const margin = { top: 40, right: 20, bottom: 90, left: 90 };

export const Scatterplot = ({ width, height, data, src_name, trg_name }) => {
  const [hovered, setHovered] = useState(null)
  const boundsWidth = width - margin.right - margin.left-30;
  const boundsHeight = height - margin.top - margin.bottom-10;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={2}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="#8EA8BA"
        fill="#8EA8BA"
        fillOpacity={0.5}
        strokeWidth={1}
        onMouseEnter={() =>
          setHovered({
            xPos: xScale(d.x),
            yPos: yScale(d.y),
            name: d.x+d.y,
          })
        }
        onMouseLeave={() => setHovered(null)}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>

        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>
          {/* label */}
          <text x={240} y={200} textAnchor="middle" className="axis">
            {src_name}
          </text>
          <text x={-35} y={-10} textAnchor="middle" className="axis">
            {trg_name}
          </text>
          {/* Circles */}
          {allShapes}
        </g>
      </svg>
      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: margin.left,
          marginTop: margin.top,
        }}
      >
        <Tooltip interactionData={hovered} />
      </div>
    </div>
  );
};

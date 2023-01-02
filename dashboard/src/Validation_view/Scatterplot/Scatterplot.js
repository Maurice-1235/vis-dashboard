import * as d3 from "d3";
import styles from "./scatterplot.module.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import React from "react";

const margin = { top: 0, right: 60, bottom: 90, left: 90 };

export const Scatterplot = ({ width, height, data, src_name, trg_name }) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

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
        stroke="#b0c8ed"
        fill="#b0c8ed"
        fillOpacity={0.2}
        strokeWidth={2}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {/* first group is for the violin and box shapes */}
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
          <text x={width / 2} y={240} textAnchor="middle">
            {src_name}
          </text>
          <text x={-30} y={30} textAnchor="middle">
            {trg_name}
          </text>
          {/* Circles */}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

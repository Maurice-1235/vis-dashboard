import * as d3 from "d3";
import styles from "./scatterplot.module.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import React from "react";

const margin = { top: 60, right: 60, bottom: 60, left: 60 };


export const Scatterplot = ({ width, height, data }) => {
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  const [hoveredGroup, setHoveredGroup] = useState(null);

  // Scales
  const yScale = d3.scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([-3000, 50000])
    .range([0, boundsWidth]);
  const allGroups = data.map((d) => String(d.group));
//   const colorScale = d3
//     .scaleOrdinal()
//     .domain(allGroups)
//     .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const className =
         styles.scatterplotCircle + " " +
         styles.scatterplotCircle;

    return (
      <circle
        key={i}
        r={5}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        className={className}
        stroke={'#9fc5e8'}
        fill={'#9fc5e8'}
        onMouseOver={() => setHoveredGroup(d.group)}
        onMouseLeave={() => setHoveredGroup(null)}
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

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

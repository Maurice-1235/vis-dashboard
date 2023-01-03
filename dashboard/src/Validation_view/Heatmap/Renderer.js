import { useMemo } from "react";
import * as d3 from "d3";
import React from "react";

const margin = { top: 5, right: 10, bottom: 20, left: 10 };

export const Renderer = ({ width, height, data, setHoveredCell }) => {
  //bounds
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const [min = 0, max = 0] = d3.extent(data.map((d) => d.value)); //[,]

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .paddingInner(0.01);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .paddingInner(0.01);
  }, [allYGroups, boundsHeight]);

  var colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max]);

  // Build the rectangles
  const allShapes = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
      return;
    }
  //color range
  let myColor = d3.scaleLinear()
  .range(["#ffffff","#FF9B4A" ])
  .domain([1,5])
    return (
      <rect
        key={i}
        r={2}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={ myColor(d.value)
        }
        rx={2}
        stroke={"white"}
        onMouseEnter={(e) => {
          setHoveredCell({
            xLabel:  d.x,
            yLabel:  d.y,
            xPos: x + xScale.bandwidth() + margin.left,
            yPos: y + xScale.bandwidth() / 2 ,
            // value: ?
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const y = xScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={i}
        x={40}
        y={y + yScale.bandwidth() / 2+15}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[margin.left, margin.top].join(",")})`}
      >
        {allShapes}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
};

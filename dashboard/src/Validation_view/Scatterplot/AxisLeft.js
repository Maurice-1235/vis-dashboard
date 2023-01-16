import { useMemo } from "react";
import React from "react";

const tick = 10;

export const AxisLeft = ({ yScale, pixelsPerTick, width }) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0, ${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x1={-tick}
            x2={width + tick}
            stroke="#000000"
            strokeWidth={1}
          />
          <text
            key={value}
            style={{
              fontSize: "12px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
              fill: "#000000",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

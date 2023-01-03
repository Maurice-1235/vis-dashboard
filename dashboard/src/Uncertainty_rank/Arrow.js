import React from "react";
export function Arrow({ x1, x2, y1, y2 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 20">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#000"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}

import React from "react";
import styles from "./tooltip.module.css";

export const Tooltip = ({ interactionData, width, height }) => {
  if (!interactionData) {
    return null;
  }

  return (
    // rectangle
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 380,
        left: 800,
        pointerEvents: "none",
      }}
    >
      {/* box */}
      <div
        className={styles.tooltip}
        style={{
          position: "absolute",
          left: interactionData.xPos,
          top: interactionData.yPos,
        }}
      >
        <TooltipRow label={"x"} value={interactionData.xLabel} />
        <TooltipRow label={"y"} value={interactionData.yLabel} />
        <TooltipRow label={"value"} value={String(interactionData.value)} />
      </div>
    </div>
  );
};


const TooltipRow = ({ label, value }) => (
  <div>
    <b>{label}</b>
    <span>: </span>
    <span>{value}</span>
  </div>
);

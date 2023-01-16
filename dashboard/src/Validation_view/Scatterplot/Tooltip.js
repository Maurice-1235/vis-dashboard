import React from "react";
import "./tooltip.css"

export const Tooltip = ({ interactionData }) => {
  console.log(interactionData)
  if (!interactionData) {
    return null;
  }

  return (
    <div
      className="tooltip"
      style={{
        left: interactionData.xPos+720,
        top: interactionData.yPos+450,
      }}
    >
      {interactionData.name}
    </div>
  );
};

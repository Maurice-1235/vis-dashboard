import React from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { useRef, useEffect } from "react";

export function FrontBar({ xScale, barHeight, data ,y}) {
  console.log(y)
  y = y*2
  const containerRef = useRef(null);
  useEffect(() => {
    let node = containerRef.current;
    if (node) {
      // console.log("init")
      select(node)
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", 22)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", data)
        .attr("height", barHeight);

      // select(node)
      //   .append("text")
      //   .attr("class", "amount")
      //   .attr("x", 0)
      //   .attr("y", barHeight)
      //   .attr("dx", -10)
      //   .attr("dy", 10);

      barTransition({ xScale, data });
    } else {
      barTransition({ xScale, data });
    }
  }, [barHeight, data, xScale]);
  function barTransition({ data, xScale }) {
    const t = transition().duration(800);
    select(".bar").transition(t).attr("width", xScale(data));
    select(".amount").transition(t).attr("x", xScale(data));
  }
  return <g ref={containerRef} className="expenditure-bar-group" />;
}

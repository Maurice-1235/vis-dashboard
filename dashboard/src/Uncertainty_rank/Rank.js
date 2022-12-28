import React from "react";
import { FrontBar } from "./Bar";
import { Arrow } from "./Arrow";
// import { scaleLinear } from 'd3-scale';
import * as d3 from "d3";
// import ViolinPlot from "../Validation_view/Violinplot";
let count=0;
export function Rank({ id,source_type,target_type,source, target, x, y,full,data }) {
  const total = full
  const width = 200;
  const barHeight = 5;
  // const data = Math.floor(Math.random() * total + 1);
  const xScale = d3.scaleLinear().domain([0, total]).range([0, width]);
  // console.log("mapped")
  count++;
  console.log(source)
  console.log(target)
  function check(source_type,target_type){
    if(source_type==="categorical"&&target_type==="numerical"){
      console.log("violin")
    }
    else if(source_type==="categorical"&&target_type==="categorical"){
      console.log("heatmap")
    }
    else if(source_type==="numerical"&&target_type==="numerical"){
      console.log("scatterplot")
    }
    else{
      console.log("?")
    }
  }
  return (
    //numerical to numerical ->scatterplot
    //categorical to numerical ->violinplot
    //categorical to categorical ->heatmap
    //numerical to categorical 
    //sympathy(categorical) -> impact(numerical)
    //imaginability(categorical) -> impact(numerical)
    // tangibilithy(categorical) -> sympathy(categorical)
    <>
    <svg height={50} width={500}>
      <g transform={`translate(${x}, ${y*id})`}>
      <rect x="0" y="-5" width={total} height="35" stroke="grey" stroke-width="2" fill="white"  onClick={() =>check(source_type,target_type)} >
        </rect>
        <text x="3" y="10">
          {source}
        </text>
        <Arrow x1={0} x2={50} y1={10} y2={10}></Arrow>
        <text x="160" y="10">
          {target}
        </text>
        <FrontBar
          {...{
            xScale,
            barHeight,
            data,
            y,
          }}
        ></FrontBar>
      </g>
    </svg>
    {/* <ViolinPlot></ViolinPlot> */}
    </>
  );
}

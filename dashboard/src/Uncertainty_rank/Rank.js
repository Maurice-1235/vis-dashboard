import React, { useContext } from "react";
import { TypeContext } from "../TypeContext";
import { FrontBar } from "./Bar";
import { Arrow } from "./Arrow";
import { drawViolinPlot } from "./ListRank";
import { drawScatterPlot } from "./ListRank";
import { drawHeatmap } from "./ListRank";
import { useEffect } from "react";
// import { scaleLinear } from 'd3-scale';
import * as d3 from "d3";
// import ViolinPlot from "../Validation_view/Violinplot";
let count = 0;
export function Rank({
  id,
  source_type,
  target_type,
  source,
  target,
  src_idx,
  trg_idx,
  x,
  y,
  full,
  data,
  typehandler,
}) {

  
  const {type,setType}= useContext(TypeContext)
  const total = full;
  const barHeight = 5;
  const xScale = d3.scaleLinear().domain([0,total]).range([0,250]);
  count++;
  console.log(source);
  console.log(target);
  console.log(data)
  // useEffect(() => {
  //   setType('changed in rank')
  //   // console.log(type.type)
  // },);
  function todo(){
    check(source_type,target_type)
    typehandler( src_idx,trg_idx)
  }
  function check(src_type,trg_type){
    if (src_type=== "categorical" && trg_type === "numerical") {
      // settype('violin');
      setType('violin')
      // forceUpdate();
    } else if (src_type=== "categorical" && trg_type === "categorical") {
      // console.log("heatmap");
      setType('heatmap')
    } else if (src_type=== "numerical" && trg_type === "numerical") {
      // console.log("scatterplot");
      setType('scatterplot')
    } else {
      // console.log("?");
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
        <g transform={`translate(${x}, ${y * id})`}>
          <rect
            x="0"
            y="-5"
            width={250}
            height="35"
            stroke="grey"
            stroke-width="2"
            fill="white"
            onClick={() =>todo()}
            // onClick={() => typehandler(source_type, src_idx,trg_type,trg_idx)}
          ></rect>
          <text x="3" y="10">
            {/* {type.type} */}
            {source}
          </text>
          <Arrow x1={0} x2={50} y1={10} y2={10}></Arrow>
          <text x="170" y="10">
            {target}
          </text>
          <FrontBar
            {...{
              xScale,
              barHeight,
              data,
            }}
          ></FrontBar>
        </g>
      </svg>
    </>
  );
}

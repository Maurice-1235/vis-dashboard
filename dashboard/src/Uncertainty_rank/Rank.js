import React from "react";
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

  // useEffect(() => {
  //   typehandler('changed in rank')
  // }, []);

  const total = full;
  const barHeight = 5;
  // const data = Math.floor(Math.random() * total + 1);
  const xScale = d3.scaleLinear().domain([0,total]).range([0,250]);
  // console.log("mapped")
  count++;
  console.log(source);
  console.log(target);
  console.log(data)
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
            onClick={() => typehandler(source_type, src_idx,target_type,trg_idx)}
            // onClick={() => typehandler(source_type)}
            // onClick={() => console.log('1')}
          ></rect>
          <text x="3" y="10">
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

import React, { useContext } from "react";
import { TypeContext } from "../TypeContext";
import { Arrow } from "./Arrow";
import './Rank.css'
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

  const xScale = d3.scaleLinear().domain([0,total]).range([0,250]);
  count++;
  // console.log(source);
  // console.log(target);
  // console.log(data)
  // useEffect(() => {
  //   setType('changed in rank')
  //   // console.log(type.type)
  // },);
  function todo(){
    check(source_type,target_type)
    typehandler( src_idx,trg_idx)
  }
  function check(src_type,trg_type){
    if (src_type=== "categorical" && trg_type === "numerical"||src_type=== "numerical" && trg_type === "categorical") {
      console.log("violin")
      setType('violin')
      // forceUpdate();
    } else if (src_type=== "categorical" && trg_type === "categorical") {
      console.log("heatmap");
      setType('heatmap')
    } else if (src_type=== "numerical" && trg_type === "numerical") {
      console.log("scatterplot");
      setType('scatterplot')
    } else {
      // console.log("?");
    }
  }
  const scale = data/120*100;
  return (
    //numerical to numerical ->scatterplot
    //categorical to numerical ->violinplot
    //categorical to categorical ->heatmap
    //numerical to categorical
    //sympathy(categorical) -> impact(numerical)
    //imaginability(categorical) -> impact(numerical)
    // tangibilithy(categorical) -> sympathy(categorical)
    <>
      <div className="rank-box" onClick={() =>todo()}>
        <div className="rank-box-title">
          <span title={`${source}`}>{source}</span>
          <Arrow x1={0} x2={50} y1={10} y2={10}></Arrow>
          <span title={`${target}`}>{target}</span>
        </div>
        <div className="rank-box-bar" style={{width: `${xScale(scale)}%`}}></div>
      </div>
    </>
  );
}

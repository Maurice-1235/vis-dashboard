import React from "react";
import { useDispatch } from 'react-redux'
import { Arrow } from "./Arrow";
import './Rank.css'
import * as d3 from "d3";
import { setSelectRank } from "../features/data/dataSlice";
export default function Rank({
  id,
  source,
  target,
  data,
}) {
  const dispatch = useDispatch()
  const total = 250;

  const xScale = d3.scaleLinear().domain([0,total]).range([0,250]);

  const scale = data/120*100;
  return (
    <>
      <div className="rank-box" onClick={() =>dispatch(setSelectRank(id))}>
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

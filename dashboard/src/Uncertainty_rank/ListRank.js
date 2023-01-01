import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Rank } from "./Rank";
import { graphData } from "../CasualGraph/ForceGraph";
import { Scatterplot } from "../Validation_view/Scatterplot/Scatterplot";
import { Heatmap } from "../Validation_view/Heatmap/Heatmap";

// import ViolinPlot from "../Validation_view/Violinplot";
// let data = require("../CasualGraph/ForceGraph")
let edgeCount;
export let drawViolinPlot = false;
export let drawHeatmap = false;
export let drawScatterPlot = false;
function test() {
  console.log(graphData);
}
export function ListRanks(props) {
  const [data, setData] = useState([]);
  const [graphLinks, setGraphlinks] = useState([]);
  let edges = [];
  const total = 250;

  useEffect(() => {

    const rank = async (id) => {
      const json = props.data;
      edgeCount = json.length;
      console.log("connections are", graphData, graphData.length);
      setGraphlinks(graphData);
      for (let x = 0; x < edgeCount; x++) {
        edges.push({
          source: graphData[parseInt(json[x].source)],
          target: graphData[parseInt(json[x].target)],
          source_idx:json[x].source,
          target_idx:json[x].target,
          //   random_number: Math.floor(Math.random() * total + 1),
          score: json[x].score,
          source_type: json[x].source_type,
          target_type: json[x].target_type,
          id: x + 1,
        });

        console.log(graphData);
        console.log("graphdata", graphData.length);
        console.log("edges", edges);
      }

      setData(edges);
    };
    rank();
  }, [graphData]);
  return (
    <>
      <Typography align="left"> #Edges:{edgeCount}</Typography>
      <div>
        {/* {edges[0].source} */}
        {data.map((edge) => (
          <Rank
            id={edge.id}
            source={edge.source}
            target={edge.target}
            src_idx = {edge.source_idx}
            trg_idx = {edge.target_idx}
            source_type={edge.source_type}
            target_type={edge.target_type}
            x={0}
            y={5}
            full={total}
            data={edge.score}
            typehandler={props.typehandler}
          ></Rank>
        ))}
      </div>
      {/* {drawViolinPlot ? <ViolinPlot data={data}></ViolinPlot>:<></>}
    {drawScatterPlot ? <Scatterplot></Scatterplot>:<></>}
    {drawHeatmap?<Heatmap></Heatmap>:<></>} */}
    </>
  );
}
//violinplot
// let data = []
// function violinData(idx1,idx2){
//     let obj1 = graphData[idx1];
//     let obj2 = graphData[idx2]
//     for(let x=0;x<value[0].length;x++){
//         data.push(
//             {
//                 obj1:value[idx1],
//                 obj2:value[idx2]
//             }
//         )
//     }
// }
//

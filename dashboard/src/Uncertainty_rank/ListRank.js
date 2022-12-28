import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Rank } from "./Rank";
import { graphData } from "../CasualGraph/ForceGraph";
import { Scatterplot } from "../Validation_view/Scatterplot/Scatterplot";
import { Heatmap } from "../Validation_view/Heatmap/Heatmap";
// import ViolinPlot from "../Validation_view/Violinplot";
// let data = require("../CasualGraph/ForceGraph")
let edgeCount;
function test(){
    console.log(graphData[0])
}
export function ListRanks() {
  const [data,setData] = useState([])
  const [graphLinks,setGraphlinks] = useState([])
  let edges = [];
  const total = 250;
 
  useEffect(() => {
    
    const rank = async (id) => {
      const response = await fetch(
        "http://127.0.0.1:5000/get_uncertainty_rank",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: (id) }),
        }
      );
      const json = await response.json();
      console.log("json", json);
        // setData(json);
       edgeCount = json.length;
       setGraphlinks(graphData)
      for (let x = 0; x < edgeCount; x++) {
        edges.push({
          source: graphData[parseInt(json[x].source)],
        // source:graphData[2],
          target: graphData[parseInt(json[x].target)],
        //   random_number: Math.floor(Math.random() * total + 1),
          score:json[x].score,
          source_type:json[x].source_type,
          target_type:json[x].target_type,
          id:x+1
        });
        // console.log({graphData})
        console.log(graphData)
        console.log(edges);

      }
      setData(edges);
    };
    rank();
  },[graphLinks]);
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
          source_type={edge.source_type}
          target_type={edge.target_type}
          x={0}
          y={5}
          full={250}
          data={edge.score}
        ></Rank>
      ))}
    </div>
    {/* {drawViolinPlot ? <ViolinPlot></ViolinPlot>:<></>}
    {drawScatterPlot ? <Scatterplot></Scatterplot>:<></>}
    {drawHeatmap?<Heatmap></Heatmap>:<></>} */}

    {/* <ViolinPlot></ViolinPlot> */}
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
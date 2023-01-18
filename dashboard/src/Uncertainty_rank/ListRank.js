import React, { useEffect, useState } from "react";
import Rank from "./Rank";
import { useSelector } from 'react-redux'

export let drawViolinPlot = false;
export let drawHeatmap = false;
export let drawScatterPlot = false;

export default function ListRanks() {
  const ranksData = useSelector(state => state.data.ranks)
  const dimensions = useSelector(state => state.data.dimensions)
  const [data, setData] = useState([]);
  let edges = [];

  useEffect(() => {
    if (!ranksData || ranksData.length === 0) {
      return
    }
    const rank = async () => {
      const json = ranksData;
      for (let x = 0; x < json.length; x++) {
        edges.push({
          source: dimensions[parseInt(json[x].source)].name,
          target: dimensions[parseInt(json[x].target)].name,
          source_idx: json[x].source,
          target_idx: json[x].target,
          score: json[x].score,
          id: x,
        });
      }
      setData(edges);
    };
    rank();
  }, [ranksData]);
  return (
    <>
      <div> #Edges:{ranksData.length}</div>
      <div>
        {data.map((edge) => (
          <Rank
            key={edge.id}
            id={edge.id}
            source={edge.source}
            target={edge.target}
            data={edge.score}
          ></Rank>
        ))}
      </div>
    </>
  );
}
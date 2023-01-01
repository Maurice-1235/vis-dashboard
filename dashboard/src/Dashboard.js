import * as React from "react";
import "./dashboard.css";
import picGraph from "./graph.png";
import File from "./file.png";
import Transfer from "./transfer.png";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ForceGraph } from "./CasualGraph/ForceGraph";
import { useState, useEffect } from "react";
import { Heatmap } from "./Validation_view/Heatmap/Heatmap";
import { Scatterplot } from "./Validation_view/Scatterplot/Scatterplot";
import Parallel from "./Validation_view/Parallel";
import { ListRanks } from "./Uncertainty_rank/ListRank";
import Dim_reduction from "./Validation_view/Dim_reduction";
import ViolinPlot from "../src/Validation_view/Violinplot";
import graphData from "./data.json";
import { TypeContext } from "./TypeContext";
import System from "./system.svg";
import Overview from "./overview.png";

export default function AutoGrid() {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    loadData();
  }, []);
  console.log("re-render");
  const loadData = async () => {
    const dataResponse = await fetch("http://127.0.0.1:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_name: "charity.csv" }),
    });
    const dataJson = await dataResponse.json();

    const dimReductionResponse = await fetch(
      "http://127.0.0.1:5000/get_dim_reduction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dimReductionJson = await dimReductionResponse.json();

    const graphResponse = await fetch("http://127.0.0.1:5000/get_graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected_id: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        ],
      }),
    });
    const graphJson = await graphResponse.json();

    const rankResponse = await fetch(
      "http://127.0.0.1:5000/get_uncertainty_rank",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rankJson = await rankResponse.json();

    setdata({
      data: dataJson,
      dimReduction: dimReductionJson,
      graph: graphJson,
      rank: rankJson,
    });

    console.log({
      data: dataJson,
      dimReduction: dimReductionJson,
      graph: graphJson,
      rank: rankJson,
    });

    setloaded(true);
  };

  function getSource(index, index1) {
    console.log(index, index1);
    let validationData = [];
    for (let x = 0; x < data.data.values.length; x++) {
      validationData.push({
        x: data.data.values[x][index],
        y: data.data.values[x][index1],
      });
    }
    console.log(validationData);
    console.log(type);
  }

  return (
    <>
      {loaded ? (
        <>
          <div className="header">
            <div className="icon">
              <img className="logo" src={System} alt="" />
              <span>CasualLens</span>
            </div>
            <GTranslateIcon
              className="translate"
              fontSize="medium"
            ></GTranslateIcon>
            <HelpOutlineIcon
              className="help"
              fontSize="medium"
            ></HelpOutlineIcon>
          </div>
          <div className="container">
            <div className="box">
              <div className="box-title">
                <img className="logo" src={Overview} alt="" />
                Data Overview
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <Dim_reduction data={data.dimReduction}></Dim_reduction>
                <Parallel data={data.data}></Parallel>
              </div>
            </div>
            <div className="box">
              <div className="box-title">
                <img className="logo" src={picGraph} alt="" />
                Casual Graph
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <ForceGraph data={data.graph} />
              </div>
            </div>
            <div>
              <div className="half-box">
                <div className="box-title">
                  <img className="logo" src={Transfer} alt="" />
                  Uncertainty rank
                </div>
                <div className="divider"></div>
                <div className="half-box-content">
                <TypeContext.Provider value={{ type, setType }}>
                  <ListRanks
                    data={data.rank}
                    typehandler={getSource}
                  ></ListRanks>

                </TypeContext.Provider>
                </div>
              </div>
              <div className="half-box">
                <div className="box-title">
                  <img className="logo" src={File} alt="" />
                  Validation view
                </div>
                <div className="divider"></div>
                <div className="half-box-content">
                  {

                    type == "violin" ? (
                      <ViolinPlot ></ViolinPlot>
                    ) : type == "heatmap" ? (
                      <Heatmap></Heatmap>
                    ) : (
                      type == "scatterplot" && <Scatterplot></Scatterplot>
                    )
                    // type
                  }
                  {/* <Heatmap data={graphData} width={500} height={300}></Heatmap> */}
                  {/* <ViolinPlot data={data}></ViolinPlot> */}
                  {/* <Scatterplot data={graphData} width={500} height={300} /> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>loading...</>
      )}
    </>
  );
}

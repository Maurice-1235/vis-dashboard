import * as React from "react";
import "./dashboard.css";
import picGraph from "./graph.png";
import File from "./file.png";
import Transfer from "./transfer.png";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ForceGraph } from "./CasualGraph/ForceGraph";
import { useState, useEffect } from "react";
// import { Heatmap } from "./Validation_view/Heatmap/Heatmap";
import Heatmap from "./Validation_view/Heatmap";
import { Scatterplot } from "./Validation_view/Scatterplot/Scatterplot";
import { graphData } from "./CasualGraph/ForceGraph";
import { ListRanks } from "./Uncertainty_rank/ListRank";
import ViolinPlot from "../src/Validation_view/Violinplot";
import DataOverview from "./DataOverview/Dataoverview";
import { TypeContext } from "./TypeContext";
import System from "./system.svg";
import Overview from "./overview.png";
import { Dropdown } from "./DataOverview/Dropdown";
import { IconButton, Tooltip } from "@mui/material";
export default function AutoGrid() {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState();
  const [type, setType] = useState();
  const [validationData, setValidationData] = useState([]);
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const [change, setChange] = useState(false);
  const [table, setTable] = useState("charity");
  const [dataChange, setDataChange] = useState(false);
  useEffect(() => {
    loadData(table);
  }, []);
  console.log("re-render");
  // let prevData;
  const loadData = async (filename) => {
    const body = filename.concat(".csv");
    const dataResponse = await fetch("http://127.0.0.1:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_name: body }),
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
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
          54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
          71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
          88, 89, 90, 91, 92, 93,
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
    setDataChange(!dataChange);
    setloaded(true);
  };
  let tmp = [];
  let prevIndex = -1,
    prevIndex1 = -1;
  function getSource(index, index1) {
    console.log(index, index1);
    if (
      index !== prevIndex ||
      index1 !== prevIndex1 ||
      (prevIndex == -1 && prevIndex1 == -1)
    )
      setChange(!change);
    setSource(graphData[index]);
    setTarget(graphData[index1]);
    // if (type === "heatmap") {
    //   for (let x = 0; x < data.data.values.length; x++) {
    //     tmp.push({
    //       x: String(data.data.values[x][index]),
    //       y: String(data.data.values[x][index1]),
    //       value: String(data.data.values[x][index1]),
    //     });
    //   }
    // } else {
      for (let x = 0; x < data.data.values.length; x++) {
        tmp.push({
          x: String(data.data.values[x][index]),
          y: String(data.data.values[x][index1]),
          value: String(data.data.values[x][index1]),
        });
      }
    // }

    setValidationData(tmp);
    console.log(validationData);
    console.log(type);
  }
  // prevData = data;

  return (
    <>
      {loaded ? (
        <>
          <div className="header">
            <div className="icon">
              <a href="/">
                <img className="logo" src={System} alt="" />
              </a>
              {/* <img className="logo" src={System} alt="" /> */}
              <span>CasualLens</span>
            </div>
            <IconButton color="info" sx={{ ml: "80%" }}>
              <GTranslateIcon
                // className="translate"
                fontSize="medium"
              ></GTranslateIcon>
            </IconButton>
            <Tooltip title="可视化大作业！">
              <IconButton color="info">
                <HelpOutlineIcon
                  // className="help"
                  fontSize="medium"
                ></HelpOutlineIcon>
              </IconButton>
            </Tooltip>
          </div>
          <div className="container">
            <div className="box">
              <div className="box-title">
                <img className="logo" src={Overview} alt="" />
                Data Overview
                <Dropdown key={table} table={table} tableHandler={loadData} />
              </div>

              <div className="divider"></div>
              <div className="box-content">
                <DataOverview
                  key={dataChange}
                  parallelData={data.data}
                  dimData={data.dimReduction}
                ></DataOverview>
              </div>
            </div>
            <div className="box">
              <div className="box-title">
                <img className="logo" src={picGraph} alt="" />
                Casual Graph
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <ForceGraph key={dataChange} data={data.graph} />
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
                  <TypeContext.Provider
                    key={dataChange}
                    value={{ type, setType }}
                  >
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
                  {/* {type} */}
                  {type == "violin" ? (
                    <ViolinPlot
                      key={change}
                      data={validationData}
                      src_name={source}
                      trg_name={target}
                      changeHandler={setChange}
                    ></ViolinPlot>
                  ) : //   <Scatterplot
                  //   key ={change}
                  //   data={validationData}
                  //   src_name={source}
                  //   trg_name={target}
                  //   width={400}
                  //   height={300}
                  //   changeHandler={setChange}
                  // ></Scatterplot>
                  type == "heatmap" ? (
                    // <Heatmap
                    //   key={change}
                    //   data={validationData}
                    //   src_name={source}
                    //   trg_name={target}
                    //   width={400}
                    //   height={300}
                    //   changeHandler={setChange}
                    // ></Heatmap>
                    <Heatmap data={validationData}src_name={source} trg_name={target}></Heatmap>
                  ) : (
                    type == "scatterplot" && (
                      <Scatterplot
                        key={change}
                        data={validationData}
                        src_name={source}
                        trg_name={target}
                        width={400}
                        height={300}
                        changeHandler={setChange}
                      ></Scatterplot>
                    )
                  )}

                  {
                    // type == "violin"? <Scatterplot data={validationData} src_name={source} trg_name={target} width={400} height={300}  ></Scatterplot>:<></>
                  }
                  {/* {
                    type == "violin"? <ViolinPlot data={validationData} src_name={source} trg_name={target}></ViolinPlot>:<></>
                  } */}
                  {/* <Heatmap data={graphData} width={500} height={300}></Heatmap> */}
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

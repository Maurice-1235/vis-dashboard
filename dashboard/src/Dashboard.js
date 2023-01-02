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
import { graphData } from "./CasualGraph/ForceGraph";
import { ListRanks } from "./Uncertainty_rank/ListRank";
import ViolinPlot from "../src/Validation_view/Violinplot";
import DataOverview from "./DataOverview/Dataoverview";
import { TypeContext } from "./TypeContext";
import System from "./system.svg";
import Overview from "./overview.png";
export default function AutoGrid() {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState();
  const [type, setType] = useState();
  const [validationData, setValidationData] = useState([]);
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const [change,setChange] = useState(false)
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
          0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
          38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
          72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92,
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
  // let validationData = [];
  let tmp = [];
  let prevIndex=-1,prevIndex1=-1
  function getSource(index, index1) {
    console.log(index, index1);
    if(index!==prevIndex||index1!==prevIndex1||(prevIndex==-1&&prevIndex1==-1))
      setChange(!change)
    setSource(graphData[index]);
    setTarget(graphData[index1]);
    for (let x = 0; x < data.data.values.length; x++) {
      tmp.push({
        x: String(data.data.values[x][index]),
        y: String(data.data.values[x][index1]),
      });
    }
    setValidationData(tmp);
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
                <DataOverview parallelData={data.data} dimData={data.dimReduction}></DataOverview>
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
                  {type}
                  {(type == "violin")? (
                    <ViolinPlot
                      key = {change}
                      data={validationData}
                      src_name={source}
                      trg_name={target}
                      changeHandler={setChange}
                    ></ViolinPlot>
                  ) : (type == "heatmap") ? (
                    <Heatmap
                      key = {change}
                      data={validationData}
                      src_name={source}
                      trg_name={target}
                      width={400}
                      height={300}
                      changeHandler={setChange}
                    ></Heatmap>
                  ) : (
                    (type == "scatterplot") &&(
                      <Scatterplot
                        key ={change}
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

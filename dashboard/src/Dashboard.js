import * as React from "react";
import Consequence from "./logo.png";
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

export default function AutoGrid() {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    //  const promises = [];

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
        // body: JSON.stringify({ id: 0 }),
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
        // body: JSON.stringify({ id: 0 }),
      }
    );
    const rankJson = await rankResponse.json();

    // console.log({
    //   data: dataJson,
    //   dimReduction: dimReductionJson,
    //   graph: graphJson,
    //   rank: rankJson,
    // });

    setdata({
      data: dataJson,
      dimReduction: dimReductionJson,
      graph: graphJson,
      rank: rankJson,
    });

    setloaded(true);
  };

  return (
    <>
      {loaded ? (
        <>
          <div className="header">
            <div className="icon">
              <img className="logo" src={Consequence} alt="" />
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
                <img className="logo" src={picGraph} alt="" />
                Casual Graph
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <ForceGraph data={data.graph} />
              </div>
            </div>
            <div className="box">
              <div className="box-title">
                <img className="logo" src={Transfer} alt="" />
                Uncertainty
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <Dim_reduction data={data.dimReduction}></Dim_reduction>
                <Parallel data={data.data}></Parallel>
              </div>
            </div>
            <div className="box">
              <div className="box-title">
                <img className="logo" src={File} alt="" />
                Validation View
              </div>
              <div className="divider"></div>
              <div className="box-content">
                <ListRanks data={data.rank}></ListRanks>
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

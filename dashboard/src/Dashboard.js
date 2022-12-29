import * as React from "react";
import Consequence from "./logo.png";
import "./dashboard.css";
import picGraph from "./graph.png";
import File from "./file.png";
import Transfer from "./transfer.png";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ForceGraph } from "./CasualGraph/ForceGraph";

import { Heatmap } from "./Validation_view/Heatmap/Heatmap";
import { Scatterplot } from "./Validation_view/Scatterplot/Scatterplot";
import Parallel from "./Validation_view/Parallel";
import { ListRanks } from "./Uncertainty_rank/ListRank";
import Dim_reduction from "./Validation_view/Dim_reduction";



export default function AutoGrid() {
  return (
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
            <ForceGraph  />
          </div>
        </div>
        <div className="box">
          <div className="box-title">
          <img className="logo" src={Transfer} alt="" />
          Uncertainty
          </div>
          <div className="divider"></div>
          <div className="box-content">
            <Dim_reduction></Dim_reduction>
            <Parallel></Parallel>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
          <img className="logo" src={File} alt="" />
          Validation View
          </div>
          <div className="divider"></div>
          <div className="box-content">
            <ListRanks></ListRanks>
          </div>
        </div>
      </div>
    </>
  );
}

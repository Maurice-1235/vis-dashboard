import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./dashboard.css";

import { requireGetData, requireGetDimReduction, requireGetGraph, requireGetRank } from './api'
import { setGraph } from "./features/data/dataSlice";

import ForceGraph from "./CasualGraph/ForceGraph";
import ListRanks from "./Uncertainty_rank/ListRank";
import DataOverview from "./DataOverview/Dataoverview";
import { Dropdown } from "./DataOverview/Dropdown";
import MyChart from "./Validation_view/MyChart";

import picGraph from "./graph.png";
import Transfer from "./transfer.png";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import System from "./system.svg";
import Overview from "./overview.png";
import File from "./file.png"

import { IconButton, Tooltip } from "@mui/material";


let globleSelectIds = []


export default function AutoGrid() {
  const dispatch = useDispatch()
  const selectIds = useSelector(state => state.data.selectIds)
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

  useEffect(() => {
    if (selectIds.length === 0) {
      return
    }
    globleSelectIds = selectIds
    requireGetGraph(dispatch, selectIds).then((res) => {
      if (res.code === 200) {
        if (globleSelectIds === selectIds) {
          dispatch(setGraph(res.graph))
          requireGetRank(dispatch)
        }
      }
    })
  }, [selectIds])

  const loadData = async (filename) => {
    let code = await (await requireGetData(dispatch, filename)).code
    if (code === 200)
      code = await (await requireGetDimReduction(dispatch)).code
  };

  return (
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
            <DataOverview />
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            <img className="logo" src={picGraph} alt="" />
            Casual Graph
          </div>
          <div className="divider"></div>
          <div className="box-content">
            <ForceGraph />
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
                <ListRanks></ListRanks>
            </div>
          </div>
          <div className="half-box">
            <div className="box-title">
              <img className="logo" src={File} alt="" />
              Validation view
            </div>
            <div className="divider"></div>
            <div className="half-box-content">
              <MyChart></MyChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

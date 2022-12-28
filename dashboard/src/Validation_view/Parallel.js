import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import styles from "./parallel.module.css";
const Parallel = (props) => {
  const [dim, setDim] = useState([]);
  const[value,setValue] = useState([]);
  const dimension = async (id) => {
    const response = await fetch("http://127.0.0.1:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_name: "charity.csv"}),
    });
    const json = await response.json();
    console.log("json", json);
    setDim(json.dimensions)
    setValue(json.values)
  };
  const initChart = () => {
    // console.log(dim)
    // console.log(value)
    let element = document.getElementById("chart");
    let myChart = echarts.init(element);
    myChart.clear();
    let option;
    option = {
      parallel: {
        left: "8%"
      },
      // grid:{
      //   left:"0%"
      // },
      parallelAxis: dim,
      series: {
        type: 'parallel',
        lineStyle: {
          width: 5
        },
        data: value
      }
    };
    option && myChart.setOption(option);
 
  };
  useEffect(() => {
    initChart();
  },);
  useEffect(() => {
    dimension()
  }, []);
  return (
    <div
      id="chart"
      className={ styles.container}
      style={{ width: "500px", height: "400px"}}
    />
  );
};
export default Parallel;

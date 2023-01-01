import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import styles from "./parallel.module.css";
const Parallel = (props) => {
  const defaultOption = {
    grid:{
      left: "13%",
      bottom: "10%",
      top: '5%'
    },
    parallelAxis: [],
    series: {
      type: 'parallel',
      lineStyle: {
        width: 5
      },
      data: []
    }
  }
  const [chart, setChart] = useState(null)
  const [option, setOption] = useState(defaultOption)
  const dimension = async (id) => {
    const json = props.data;
    let _option = { ...option }
    _option.series.data = json.values
    _option.parallelAxis = json.dimensions
    setOption(_option)
  };
  const initChart = () => {
    let element = document.getElementById("chart");
    let myChart = echarts.init(element);
    setChart(myChart)
    window.addEventListener("resize", myChart.resize);
  };
  useEffect(() => {
    chart && chart.setOption(option)
  },[option]);
  useEffect(() => {
    initChart();
    dimension()
  }, []);
  return (
    <div
      id="chart"
      className={ styles.container}
      style={{ width: "100%", height: "400px"}}
    />
  );
};
export default Parallel;

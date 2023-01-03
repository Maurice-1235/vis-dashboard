import React, { useEffect, useState } from "react";
import * as echarts from "echarts";

const DataOverview = (props) => {
  const [chart, setChart] = useState(null);
  const [option, setOption] = useState();
  const initChart = () => {
    let element = document.getElementById("overview");
    let myChart = echarts.init(element, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    setChart(myChart);
    window.addEventListener("resize", myChart.resize);
  };
  let arr = [];
  const generateGrids = () => {
    const grid = { height: '250px'};
    const xAxis = {};
    const yAxis = {};
    const series = {
      type: "scatter",
      symbolSize: 4,
      data: props.dimData,
    };
    return {
      grid,
      xAxis,
      yAxis,
      series,
    };
  };
  const gridOptions = generateGrids();
  const _option = {
    animation: false,
    color: '#8EA8BA',
    toolbox: {
      left: "60%",
      bottom: "95%",
      feature: {
        dataView: {
          readOnly: false,
        },
      },
    },
    brush: [{
      brushLink: "all",
      xAxisIndex: gridOptions.xAxis,
      yAxisIndex: gridOptions.yAxis,
      inBrush: {
        opacity: 1,
      },
    }],
    tooltip: {
      trigger: "item",
    },
    parallelAxis: props.parallelData.dimensions,
    parallel: {
      bottom: "5%",
      left: "10%",
      top: "400px",
      height: "30%",
      width: "80%",
      parallelAxisDefault: {
        type: "value",
        nameTextStyle: {
          fontSize: 14,
        },
        axisLine: {
          lineStyle: {
            color: "#555",
          },
        },
        axisTick: {
          lineStyle: {
            color: "#555",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#555",
        },
      },
    },
    xAxis: gridOptions.xAxis,
    yAxis: gridOptions.yAxis,
    grid: [{height:'250px'},gridOptions.grid],
    series: [
      {
        name: "parallel",
        type: "parallel",
        smooth: true,
        lineStyle: {
          width: 1,
          opacity: 0.3,
          color:'#8EA8BA'
        },
        data: props.parallelData.values,
      },
    ],
  };
  _option.series.push(gridOptions.series);
  //   setOption(option);
  useEffect(() => {
    console.log(1);
    chart && chart.setOption(option);
  }, [option]);
  useEffect(() => {
    // gridOptions.series = arr
    console.log(arr);
    initChart();
    // option.grid.series.data = arr
    gridOptions.series.data.push(arr);
    _option.series.push(gridOptions.series);
    setOption(_option);
    console.log(_option);
  }, []);
  return (
    <div
      className="chart"
      id="overview"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
export default DataOverview;

import React, { useEffect, useState } from "react";
import * as echarts from "echarts";

const Dim_reduction = (props) => {
  const [dim, setDim] = useState([]);

  const reduction = async (id) => {
    let arr = [];

    const response = await fetch("http://127.0.0.1:5000/get_dim_reduction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: parseInt(id) }),
    });
    const json = await response.json();
    // console.log("json", json);
    for (let x = 0; x < json.length; x++) {
      json[x].push(x + 1);
      arr.push(json[x]);
    }
    // console.log(arr);
    setDim(arr);
  };
  const initChart = () => {
    let element = document.getElementById("chart-container");
    let myChart = echarts.init(element, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    myChart.clear();
    // console.log("dim:", dim);
    let data = dim;
    let option;
    option = {
        grid:{
            left:"3%"
        },
      xAxis: {},
      yAxis: {},
      brush: {
        toolbox: ["rect", "clear"],
        xAxisIndex: 0,
      },
      toolbox: {
        left:"70%",
        feature: {
          dataView: {
            readOnly: false,
          },
        },
        
      },
      series: [
        {
          symbolSize: 15,
          data: data,
          type: "scatter",
        },
      ],
    };
    option && myChart.setOption(option);
    myChart.dispatchAction({
      type: "takeGlobalCursor",
      // 如果想变为“可刷选状态”，必须设置。不设置则会关闭“可刷选状态”。
      key: "brush",
      brushOption: {
        // 参见 brush 组件的 brushType。如果设置为 false 则关闭“可刷选状态”。
        brushType: "rect",
      },
    });
    myChart.on("brushEnd", function (params) {
      let range = params.areas[0].coordRange;
      let xRange = range[0];
      let yRange = range[1];

      let list = [];
      for (let d of data) {
        if (
          d[0] <= xRange[1] &&
          d[0] >= xRange[0] &&
          d[1] <= yRange[1] &&
          d[1] >= yRange[0]
        ) {
          list.push(d[2]);
        }
      }
      console.log("selected",list);
    });
    window.addEventListener("resize", myChart.resize);
  };
  useEffect(() => {
    initChart();
  });
  useEffect(() => {
    reduction();
  }, []);
  return (
    <div
      className="chart"
      id="chart-container"
      style={{ width: "500px", height: "300px" }}
    />
  );
};
export default Dim_reduction;

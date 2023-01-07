import React, { useEffect, useRef } from "react";
import echarts from "../../node_modules/echarts/lib/echarts";
export default function Heatmap({ data,src_name,trg_name }) {
  // console.log("data for heatmap is",data)
  let xValue = [];
  let yValue = [];
  console.log(data.length);
  for (let x = 0; x < data.length; x++) {
    xValue.indexOf(data[x].x) === -1
      ? xValue.push(data[x].x)
      : console.log("changed");
    yValue.indexOf(data[x].y) === -1 ? yValue.push(data[x].y) : console.log(1);
  }
  xValue.sort();
  yValue.sort();
  // console.log(xValue.length)
  // console.log(yValue)
  let array = Array(Math.max(xValue[xValue.length - 1] + 1))
    .fill()
    .map(() => Array(Math.max(yValue[yValue.length - 1]) + 1).fill(0));
  for (let x = 0; x < data.length; x++) {
    // console.log(data[x].x,data[x].y)
    array[data[x].x][data[x].y]++;
  }
  // console.log(array)
  let data1 = [];
  for (let x = 0; x < data.length; x++) {
    data1.push([data[x].x, data[x].y, array[data[x].x][data[x].y]]);
  }
  // console.log(data1)
  const chartRef = useRef(null);
  const draw = () => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        position: "top",
      },
      grid: {
        height: "50%",
        top: "15%",
        right:"5%",
        left:"5%",

      },
      xAxis: {
        type: "category",
        name:src_name,
        data: xValue,
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          fontSize:15,
          color:"black",
          align: 'right',
          verticalAlign: 'top',
          fontFamily:'sans-serif',
          padding: [15, 0, 0, 0],
        },
      },
      yAxis: {
        type: "category",
        name:trg_name,
        data: yValue,
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          fontSize:15,
          color: "black",
          padding: [20, 10, 0, 0],
          fontFamily:'sans-serif',
          align:'left'
        },
      },
      visualMap: {
        min: 0,
        max: 15,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
        inRange: {
          color: ["#FFFFFF", "#8EA8BA"], //From smaller to bigger value ->
        },
      },
      series: [
        {
          type: "heatmap",
          data: data1,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <div
      className="chart"
      ref={chartRef}
      style={{ width: "450px", height: "300px" }}
    />
  );
}

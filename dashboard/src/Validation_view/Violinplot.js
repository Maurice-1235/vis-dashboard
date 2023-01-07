import React, { Component, createRef } from "react";
import * as d3 from "d3";
import echarts from "../../node_modules/echarts/lib/echarts";
import "../../node_modules/echarts/lib/chart/custom";
import "../../node_modules/echarts/lib/component/tooltip";
import "../../node_modules/echarts/extension/dataTool";
import data from "../data/data.json"

function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(function (x) {
      return [
        x,
        d3.mean(V, function (v) {
          return kernel(x - v);
        }),
      ];
    });
  };
}
function kernelEpanechnikov(k) {
  return function (v) {
    // eslint-disable-next-line
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

class ViolinPlot extends Component {
  chartRef = createRef();

  draw = () => {
    // this.props.changeHandler(false)
    console.log(this.props.src_name)
    console.log(this.props.trg_name)
    console.log(this.props.data)
    const columns = [...new Set(this.props.data.map((v) => v.x))].sort((a, b) => a - b);
    const dataSource = columns.map((x) =>
      this.props.data.filter((item) => item.x === x).map((item) => item.y)
    );
    // console.log(data)
    // const columns = [...new Set(data.map((v) => v.date))].sort((a, b) => a - b);
    // const dataSource = columns.map((date) =>
    //   data.filter((item) => item.date === date).map((item) => item.value)
    // );
    console.log("columns",columns)
    console.log(dataSource)
    const tooltipData = echarts.dataTool.prepareBoxplotData(dataSource);
    const { boxData } = tooltipData;

    const myChart = echarts.init(this.chartRef.current);

    const option = {
      grid: {
        top: "15%",
        left: "15%",
        right: "30%",
        bottom: "30%"
      },
      tooltip: {
        formatter: function (param) {
          return [
            columns[param.dataIndex] + ": ",
            "upper: " + boxData[param.dataIndex][4],
            "Q3: " + boxData[param.dataIndex][3],
            "median: " + boxData[param.dataIndex][2],
            "Q1: " + boxData[param.dataIndex][1],
            "lower: " + boxData[param.dataIndex][0],
          ].join("<br/>");
        },
      },
      xAxis: {
        type: "category",
        name: this.props.src_name,
        data: columns,
        boundaryGap: true,
        nameLocation: 'end',
        nameTextStyle: {
          fontSize:15,
          color:"black",
          align: 'right',
          verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          padding: [25, 0, 0, 0],
        },
        nameGap: 0,
        splitArea: {
          show: false,
        },
        axisLabel: {
          color: "black",
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: ["#ccc"],
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        z: 2,
        name: this.props.trg_name,
        type: "value",
        nameTextStyle: {
          fontSize:15,
          color: "black",
          padding: [40, 40, 0, 0],
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: ["#EEE"],
          },
        },
        axisLabel: {
          color: "black",
        },
      },
      series: [
        {
          type: "custom",
          color: ["#B1D0FA"],
          name: "violin plot",
          renderItem: (params, api) => {
            const categoryIndex = api.value(0);

            const min = Math.min(...dataSource[categoryIndex]);
            const max = Math.max(...dataSource[categoryIndex]);
            console.log(min,max)
            const liner = d3
              .scaleLinear()
              .domain([min-1, max+1 ])//domain
              // .range([min,max])
              .ticks(100);//tick
            const density = kernelDensityEstimator(
              kernelEpanechnikov(1),//kernel
              liner
            )(dataSource[categoryIndex]);

            const maxDens = Math.max(...density.map((v) => v[1]));

            const points = density.map((v) => {
              const [y, dens] = v;
              const point = api.coord([categoryIndex, y]);
              point[0] += (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85;
              return point;
            });

            const points2 = density.map((v) => {
              const [y, dens] = v;
              const point = api.coord([categoryIndex, y]);
              point[0] -= (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85;
              return point;
            });

            const lineGenerator = d3.line().curve(d3.curveBasis);
            const pathData = lineGenerator(points);
            const pathData2 = lineGenerator(points2);

            return {
              z: 2,
              type: "path",
              shape: {
                pathData: pathData + pathData2,
              },
              style: api.style({
                fill: '#8EA8BA',
                stroke: "#8EA8BA",
                lineWidth: 1,
              }),
              styleEmphasis: api.style({
                fill: d3.color("#FF9B4A").darker(0.05),
                stroke: d3.color("#FF9B4A").darker(0.05),
                lineWidth: 1,
              }),
            };
          },
          encode: {
            x: 0,
            y: dataSource[
              d3.scan(dataSource, function (a, b) {
                return b.length - a.length;
              })
            ].map((v, i) => i + 1),
          },
          data: dataSource.map((v, i) => [i, ...v]),
        },
      ],
    };

    myChart.setOption(option);
  };

  componentDidMount() {
    this.draw();
  }

  render() {
    return (
      <div
        className="chart"
        ref={this.chartRef}
        style={{ width: "500px", height: "270px" }}
      />
    );
  }
}

export default ViolinPlot;

import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import echarts from "echarts";
import { useSelector } from 'react-redux'

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

export default function MyChart() {
  const dimensions = useSelector(state => state.data.dimensions)
  const values = useSelector(state => state.data.values)
  const dimData = useSelector(state => state.data.dimData)
  const ranks = useSelector(state => state.data.ranks)
  const selectRank = useSelector(state => state.data.selectRank)
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null)

  const violinOption = (data, xName, yName) => {
    const columns = [...new Set(data.map((v) => v.x))].sort((a, b) => a - b);
    const dataSource = columns.map((x) =>
      data.filter((item) => item.x === x).map((item) => item.value)
    );
    return {
      grid: {
        top: "15%",
        left: "15%",
        right: "30%",
        bottom: "30%"
      },
      tooltip: {
        formatter: function (param) {
          const data = dataSource[param.dataIndex];
          data.sort(function (a, b) {
            return a - b;
          });
          let len = data.length;
          const min = +data[0];
          const max = +data[len - 1];
          // 计算箱线图数据
          // 四分位数
          const Q1 = data[Math.floor(len / 4)];
          const Q2 = data[Math.floor(len / 2)];
          const Q3 = data[Math.floor((len / 4) * 3)];
          return [
            columns[param.dataIndex] + ': ',
            'max: ' + max,
            'Q3: ' + Q3,
            'Q2: ' + Q2,
            'Q1: ' + Q1,
            'min: ' + min,
          ].join('<br/>');
        },
      },
      xAxis: {
        type: "category",
        name: xName,
        data: columns,
        boundaryGap: true,
        nameLocation: 'end',
        nameTextStyle: {
          fontSize: 15,
          color: "black",
          align: 'right',
          verticalAlign: 'top',
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
        name: yName,
        type: "value",
        nameTextStyle: {
          fontSize: 15,
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
            const data = dataSource[categoryIndex]
            data.sort(function (a, b) {
              return a - b;
            });
            // let hilightKey = data.pop();
            let len = data.length;
            const min = +data[0];
            const max = +data[len - 1];
            // 计算箱线图数据
            // 四分位数
            const Q1 = +data[Math.floor(len / 4)];
            const Q2 = +data[Math.floor(len / 2)];
            const Q3 = +data[Math.floor((len / 4) * 3)];
            // 矩形位置
            const [rectX, rectY] = api.coord([categoryIndex, Q3]);
            const height = api.coord([categoryIndex, Q1])[1] - rectY;
            const width = api.size([0, 0])[0] / 4;
            // 中位线位置
            const [pathX, pathY] = api.coord([categoryIndex, Q2]);
            const r = api.size([0, 0])[0] / 12;
            const line = api.size([0, 0])[0] / 2;

            let ymin = min;
            let ymax = max;
            let maxNum = data.length;
            const y = d3
              .scaleLinear()
              .domain([ymin, ymax])
              .range([api.coord([categoryIndex, ymin])[1], api.coord([categoryIndex, ymax])[1]]);
            const x = d3.scaleLinear().range([-line, line]).domain([-maxNum, maxNum]);
            const histogram = d3
              .histogram()
              .domain(y.domain())
              .thresholds(y.ticks(20))
              .value((d) => d);
            let pathData1 = histogram(data);
            let deltaX = api.coord([categoryIndex, 0])[0];
            let path = d3
              .area()
              .x0(function (d) {
                return x(-d.length) + deltaX;
              })
              .x1(function (d) {
                return x(d.length) + deltaX;
              })
              .y(function (d) {
                return y(d.x0);
              })
              .curve(d3.curveCatmullRom);

            return {
              type: 'group',
              children: [
                {
                  z: 2,
                  type: 'path',
                  shape: {
                    pathData: path(pathData1),
                  },
                  style: {
                    fill: api.visual('color'),
                    stroke: '#8EA8BA',
                    lineWidth: 1,
                  },
                  styleEmphasis: {
                    fill: '#ff9845',
                    stroke: '#ff9845',
                    lineWidth: 2,
                  },
                },
                {
                  z: 3,
                  type: 'rect',
                  shape: {
                    x: rectX - width / 2,
                    y: rectY,
                    height: height,
                    width: width,
                  },

                  style: {
                    fill: '#9FACB255',
                    stroke: '#6E7C83',
                    lineWidth: 1,
                  },
                },
                {
                  z: 4,
                  type: 'line',
                  shape: {
                    x1: pathX - line / 2,
                    y1: pathY,
                    x2: pathX + line / 2,
                    y2: pathY,
                  },
                  style: {
                    stroke: '#000',
                    lineWidth: 1,
                  },
                },
                {
                  z: 5,
                  type: 'circle',
                  shape: {
                    cx: pathX,
                    cy: pathY,
                    r: r,
                  },
                  style: {
                    stroke: '#000',
                    fill: '#fff',
                    lineWidth: 1,
                  },
                },
              ],
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
  }

  const scatterOption = (data, xName, yName) => {
    return {
      color: ['#8EA8BA'],
      tooltip: {
        trigger: 'item',
        axisPointer: { type: 'cross' },
        showContent: false,
      },
      toolbox: {
        show: false,
      },
      brush: {
        toolbox: ['lineX', 'clear'],
        xAxisIndex: 0,
      },
      xAxis: {
        type: 'value',
        splitArea: {
          show: false,
        },
        scale: true,
        name: xName,
        nameTextStyle: {
          padding: [60, 0, 0, -50]
        }
      },
      yAxis: {
        type: 'value',
        splitArea: {
          show: false,
        },
        scale: true,
        name: yName
      },
      animation: false,
      series: [
        {
          symbolSize: 5,
          type: 'scatter',
          itemStyle: {
            opacity: 0.4,
          },
          large: true,
          largeThreshold: 500,
          data: data
        },
        {
          symbolSize: 5,
          type: 'scatter',
          large: true,
          largeThreshold: 500,
          itemStyle: {
            color: '#ff9845',
            borderColor: '#ff9845',
          },
          data: [],
        },
      ],
    };
  }

  const heatmapOption = (data, xName, yName, x, y, max) => {
    return {
      tooltip: {
        trigger: 'item',
        axisPointer: { type: 'cross' },
        showContent: false,
      },
      grid: {
        height: "50%",
        top: "15%",
        right: "5%",
        left: "5%",

      },
      xAxis: {
        type: "category",
        name: xName,
        data: x,
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          fontSize: 15,
          color: "black",
          align: 'right',
          verticalAlign: 'top',
          fontFamily: 'sans-serif',
          padding: [15, 0, 0, 0],
        },
      },
      yAxis: {
        type: "category",
        name: yName,
        data: y,
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          fontSize: 15,
          color: "black",
          padding: [20, 10, 0, 0],
          fontFamily: 'sans-serif',
          align: 'left'
        },
      },
      visualMap: {
        min: 0,
        max: max,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
        inRange: {
          color: ['#fff', '#92a8b8']
        },
      },
      series: [
        {
          type: "heatmap",
          data: data,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(255, 152, 69, 0.5)',
            },
          },
        },
      ],
    }
  }

  const init_chart = () => {
    const myChart = echarts.init(chartRef.current);
    window.addEventListener("resize", myChart.resize);
    setChart(myChart)
  }

  useEffect(() => {
    init_chart()
  }, [])

  useEffect(() => {
    if (ranks.length <= selectRank) {
      return
    }
    chart.setOption({}, {notMerge: true})
    let source_type = ranks[selectRank].source_type
    let target_type = ranks[selectRank].target_type
    let source_idx = +ranks[selectRank].source
    let target_idx = +ranks[selectRank].target
    if (source_type === "categorical" && target_type === "numerical" || source_type === "numerical" && target_type === "categorical") {
      // violin
      let data = []
      for (let x = 0; x < values.length; x++) {
        data.push({
          x: values[x][source_idx],
          value: values[x][target_idx],
        });
      }
      chart.setOption(violinOption(data, dimensions[source_idx].name, dimensions[target_idx].name))
    } else if (source_type === "categorical" && target_type === "categorical") {
      // heatmap
      let data = []
    let x = []
    let y = []
    let dicX = {}
    let dicY = {}
    let dic = {}
    for (let i = 0; i < values.length; i++) {
      let vx = values[i][source_idx]
      let vy = values[i][target_idx]
      if (!dicX[vx]) {
        dicX[vx] = 0
      }
      if (!dicY[vy]) {
        dicY[vy] = 0
      }
    }
    for (let key of Object.keys(dicX)) {
      x.push(key)
      dicX[key] = x.length - 1
    }
    for (let key of Object.keys(dicY)) {
      y.push(key)
      dicY[key] = y.length - 1
    }
    for (let i = 0; i < values.length; i++) {
      let vx = values[i][source_idx]
      let vy = values[i][target_idx]
      let key = dicX[vx] + '_' + dicY[vy]
      if (!dic[key]) {
        dic[key] = 0
      }
      dic[key]++
    }
    let arr = []
    for (let i in x) {
      for (let j in y) {
        if (dic[i + '_' + j]) {
          arr.push(dic[i + '_' + j])
          data.push([i, j, dic[i + '_' + j]])
        }
      }
    }
    arr.sort(function (a, b) { return a - b })
    chart.setOption(heatmapOption(data, dimensions[source_idx].name, dimensions[target_idx].name, x, y, arr[Math.floor(arr.length * 0.9)]))
    } else if (source_type === "numerical" && target_type === "numerical") {
      // scatterplot
      let data = []
      for (let x = 0; x < values.length; x++) {
        data.push([values[x][source_idx],values[x][target_idx]]);
      }
      chart.setOption(scatterOption(data, dimensions[source_idx].name, dimensions[target_idx].name))
    }
  }, [selectRank, ranks])

  return (
    <div
      className="chart"
      ref={chartRef}
      style={{ width: "500px", height: "270px" }}
    />
  );
}
import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectIds } from "../features/data/dataSlice";

const DataOverview = () => {
  const dimensions = useSelector(state => state.data.dimensions)
  const values = useSelector(state => state.data.values)
  const dimData = useSelector(state => state.data.dimData)
  const dispatch = useDispatch()
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

  useEffect(() => {
    initChart()
  }, [])
  
  useEffect(() => {
    chart && chart.setOption(option);
  }, [option]);
  useEffect(() => {
    if (values.length === 0 || dimData.length === 0) {
      return
    }
    const gridOptions = {
      grid: { height: '250px' },
      xAxis: {},
      yAxis: {},
      series: {
        type: "scatter",
        symbolSize: 4,
        data: dimData,
        emphasis: {
          itemStyle: {
            color:'#E5C07B'
          }
        }
      }
    };
    const _option = {
      animation: false,
      color: '#8EA8BA',
      tooltip: {
        trigger: "item",
      },
      parallelAxis: dimensions,
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
          data: values,
        },
      ],
    };
    _option.series.push(gridOptions.series);
    setOption(_option);
    chart.on('axisareaselected', function () {
      let series = chart.getModel().getSeries()[0];
      let indices = series.getRawIndicesByActiveState('active');
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1,
        dataIndex: [...(new Array(values.length)).keys()],
      });
      dispatch(setSelectIds(indices))
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 1,
        dataIndex: indices,
      });
    });
  }, [dimensions, values, dimData]);
  return (
    <div
      className="chart"
      id="overview"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
export default DataOverview;

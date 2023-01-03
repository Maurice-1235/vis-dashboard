import React, { useEffect, useRef } from "react";
import echarts from "../../node_modules/echarts/lib/echarts";



export default function Heatmap() {
  const chartRef = useRef(null)
  const draw = () => {
    // this.props.changeHandler(false)
    console.log(this.props.src_name)
    console.log(this.props.trg_name)
    console.log(this.props.data)
  

    const myChart = echarts.init(this.chartRef.current);

    const option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: [],
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: [],
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          type: 'heatmap',
          data: [],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  };

  useEffect(() => {
    draw()
  }, [])

  return (
    <div
      className="chart"
      ref={chartRef}
      style={{ width: "500px", height: "250px" }}
    />
  );
}


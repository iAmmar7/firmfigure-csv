import React from "react";
import ReactEcharts from "echarts-for-react";

function Doughnut(props) {
  const { labels, data } = props;

  const getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: labels,
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
      series: [
        {
          name: "Total sales",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data,
        },
      ],
    };
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={getOption()} />
    </React.Fragment>
  );
}
export default Doughnut;

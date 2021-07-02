import React from "react";
import ReactEcharts from "echarts-for-react";

function Pie(props) {
  const { labels, data } = props;

  const getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: labels,
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
      series: [
        {
          name: "Total services",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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
export default Pie;

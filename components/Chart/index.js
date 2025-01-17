import React, { useState, useEffect } from "react";
import { ChartWrapper } from "./styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import regression from "regression";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiTheme } from "../../styles/theme";

const chart = ({ data, label, isByYear, computingPower }) => {
  const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Loading...",
    },
  });
  const generateChart = (list, label) => {
    let data_points = [];
    let info_points = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element[label] && element[computingPower.value]) {
        let x, y;
        x = isByYear
          ? new Date(element.paper_publication_date).getFullYear()
          : Math.log10(element[computingPower.value]);
        y = Math.log10(1 / (1 - element[label] / 100));
        const point = [x, y];
        data_points.push(point);

        const info = {
          type: "scatter",
          data: [point],
          showInLegend: false,
          name: element.name,
          marker: {
            symbol: "circle",
            fillColor: "#9E1FFF",
            radius: 4,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        };
        info_points.push(info);
      }
    }

    const result = regression.linear(data_points);
    result.points.sort(([a, b], [c, d]) => c - a || b - d);

    const chart = {
      plotOptions: {
        scatter: {
          dataLabels: {
            enabled: false,
            format: "{series.name}",
          },
          enableMouseTracking: true,
          color: "#073b4c",
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormatter: function () {
              let y = (1 - 10 ** -this.y) * 100;
              y = Math.round(y * 100) / 100;
              let x = Math.round(this.x * 100) / 100;
              return `${label}: ${y}% - ${
                isByYear
                  ? `Year: ${x}`
                  : `Computation: 10e${x < 0 ? "" : "+"}${x.toFixed(1)}`
              } `;
            },
          },
        },
        line: {
          color: "#000000",
        },
      },

      series: [
        ...info_points,
        {
          type: "line",
          showInLegend: true,
          color: "#000000",
          name: isByYear
            ? `${label} = 1 - 10<span dy="-7"  style="font-size: 10px">${-result
                .equation[0]} &times Year ${
                result.equation[1]
              }</span><span dy="7">`
            : `${label} = 1 - 10<span dy="-7"  style="font-size: 10px">${-result
                .equation[1]}</span><span dy="7"> &times; (${
                computingPower.name
              })</span><span dy="-7" style="font-size: 10px">${-result
                .equation[0]}</span>`,
          data: [result.points[0], result.points[result.points.length - 1]],
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              lineWidth: 3,
            },
          },
          enableMouseTracking: false,
        },
      ],
      exporting: {
        width: 2000,
      },
      legend: {
        layout: "vertical",
        align: "center",
        verticalAlign: "top",
        fontSize: isMobile ? "8px" : "18px",
        symbolHeight: 0.001,
        symbolWidth: 0.001,
        symbolRadius: 0.001,
        fontFamily: "Montserrat, sans-serif",
      },
      subtitle: {
        // align: 'center',
        verticalAlign: "bottom",
        style: {
          fontSize: "10px",
        },
        x: 0,
        y: 10,
        useHTML: true,
        text:
          '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
          "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
          '<a target="_blank" href="https://dblp.uni-trier.de/rec/journals/corr/abs-2007-05558.html?view=bibtex">' +
          "  [CITE]</a>",
      },
      credits: {
        enabled: false,
        text:
          '<a target="_blank" href="https://arxiv.org/abs/2007.05558">' +
          "Ⓒ The Computational Limits of Deep Learning, N.C. THOMPSON, K. GREENEWALD, K. LEE, G.F. MANSO</a>" +
          '<a target="_blank" href="https://dblp.uni-trier.de/rec/journals/corr/abs-2007-05558.html?view=bibtex">' +
          "  [CITE]</a>",
        position: {
          align: "center",
          y: -2,
          x: 50,
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: isByYear ? "Year" : `Computation (${computingPower.name})`,
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: isMobile ? "10px" : "14px",
            fontFamily: "Montserrat, sans-serif",
          },
        },
        tickInterval: 1,
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif",
          },
          formatter: function () {
            return isByYear
              ? this.value
              : `10e${parseFloat(this.value) < 0 ? "" : "+"}` + this.value;
          },
        },
      },
      yAxis: {
        title: {
          text: "Accuracy (" + label + ")",
          margin: 20,
          style: {
            color: "#333",
            fontWeight: "bold",
            fontSize: isMobile ? "10px" : "14px",
            fontFamily: "Montserrat, sans-serif",
          },
        },
        labels: {
          style: {
            fontSize: 15,
            fontFamily: "Montserrat, sans-serif",
          },
          formatter: function () {
            let label = (1 - 10 ** -this.value) * 100;
            return `${this.value ? label.toFixed(1) : 0}%`;
          },
        },
      },
    };
    setChartOptions(chart);
  };

  useEffect(() => {
    generateChart(data, label);
  }, [data, label, isByYear, computingPower]);

  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};
export default chart;

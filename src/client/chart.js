import {
  Chart,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

const generateChartConfig = ({ title, range, displayXTicks = true }) => {
  return {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "n",
          },
          ticks: {
            display: displayXTicks,
          },
        },
        y: {
          title: {
            display: true,
            text: "Runtime",
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
};

const CHART_COLORS = [
  "#ff0000",
  "#ff8700",
  "#ffd300",
  "#0aff99",
  "#0aefff",
  "#147df5",
  "#580aff",
  "#be0aff",
];

export { CHART_COLORS, generateChartConfig };

export default Chart;

import {
  Chart,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js";
import { roundTo } from "../shared.js";

Chart.register(
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Title,
  Tooltip
);

export const generateChartConfig = ({
  title = "",
  displayXTicks = true,
} = {}) => {
  return {
    type: "scatter",
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: title,
        },
        tooltip: {
          callbacks: {
            label: ({ dataset, parsed }) => {
              return `${dataset.label}: (${parsed.x}, ${roundTo(3, parsed.y)})`;
            },
          },
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
            text: "Runtime (ms)",
          },
        },
      },
    },
  };
};

export const CHART_COLORS = [
  "rgb(80, 227, 133)",
  "rgb(102, 170, 255",
  "rgb(254, 118, 118)",
  "rgb(255, 209, 30)",
  "rgb(197 137 255)",
  "rgb(255 151 65)",
];

export default Chart;

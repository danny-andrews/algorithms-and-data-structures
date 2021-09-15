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

export const generateChartConfig = ({ title, displayXTicks = true }) => {
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
  "hsla(0, 100%, 50%, 50%)",
  "hsla(32, 100%, 50%, 50%)",
  "hsla(155, 100%, 52%, 50%)",
  "hsla(212, 92%, 52%, 50%)",
  "hsla(184, 100%, 52%, 50%)",
  "hsla(259, 100%, 52%, 50%)",
  "hsla(284, 100%, 52%, 50%)",
  "hsla(50, 100%, 50%, 50%)",
];

export default Chart;

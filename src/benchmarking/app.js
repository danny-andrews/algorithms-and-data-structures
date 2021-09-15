import * as R from "ramda";
import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import { WORKBENCHES } from "./workbenches";
import { render, html } from "uhtml";
import { noop, fromWorkerEvent } from "../shared.js";

const worker = new Worker("/benchmarking/worker.js", { type: "module" });

const postMessage = (type, data) => worker.postMessage({ type, data });

const canvas = document.getElementById("chart");
const controls = document.querySelector(".controls");

let chart = { destroy: noop };
let subscription = { unsubscribe: noop };

const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

const workbenches = Object.entries(WORKBENCHES).map(([name, workbench]) => ({
  ...workbench,
  name,
}));

const createDataset = ({ num, label, data }) => ({
  borderColor: CHART_COLORS[num],
  backgroundColor: CHART_COLORS[num],
  showLine: true,
  label,
  data,
});

const addMarksToChart = (marks) => {
  marks.forEach(({ name, duration, n }, i) => {
    const existingDatasetIndex = chart.data.datasets.findIndex(
      ({ label }) => label === name
    );
    const datapoint = { x: n, y: duration };
    if (existingDatasetIndex === -1) {
      chart.data.datasets.push(
        createDataset({ num: i, label: name, data: [datapoint] })
      );
    } else {
      chart.data.datasets[existingDatasetIndex].data.push(datapoint);
    }
  });
  chart.update();
};

const cleanup = () => {
  chart.destroy();
  subscription.unsubscribe();
};

const handleSubmit = (event) => {
  const workbenchName = new FormData(event.target).get("workbench");

  cleanup();

  postMessage("RUN_WORKBENCH", workbenchName);

  chart = new Chart(
    canvas.getContext("2d"),
    generateChartConfig({ title: WORKBENCHES[workbenchName].title })
  );
  subscription = newMarksObserver.subscribe(addMarksToChart);

  event.preventDefault();
};

const Workbench = (workbenches, selectedWorkbench = R.head(workbenches)) => {
  const NAME = "workbench";
  const handleInput = (e) => {
    render(controls, Workbench(workbenches, WORKBENCHES[e.target.value]));
  };

  return html`
    <form onsubmit=${handleSubmit}>
      <label for=${NAME}>Choose a workbench:</label>
      <select oninput=${handleInput} name=${NAME} id=${NAME}>
        ${workbenches.map(
          ({ name, title }) => html`<option value=${name}>${title}</option>`
        )}
      </select>
      <ul>
        ${selectedWorkbench.subjects.map(({ name }) => html`<li>${name}</li>`)}
      </ul>
      <button type="submit">Run!</button>
    </form>
  `;
};

render(controls, Workbench(workbenches));

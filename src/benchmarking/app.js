import * as R from "ramda";
import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import { WORKBENCHES } from "./workbenches";
import { render, html } from "uhtml";
import { noop, fromWorkerEvent } from "../shared.js";

const worker = new Worker("/benchmarking/worker.js", { type: "module" });

const postMessage = (type, data) => worker.postMessage({ type, data });

const canvas = document.getElementById("chart");

let chart = { destroy: noop };
let subscription = { unsubscribe: noop };

const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

const workbenches = Object.entries(WORKBENCHES).map(([name, workbench]) => ({
  ...workbench,
  name,
}));

const handleSubmit = (e) => {
  e.preventDefault();

  const workbenchName = new FormData(e.target).get("workbench");
  chart.destroy();
  subscription.unsubscribe();
  postMessage("RUN_WORKBENCH", workbenchName);
  const { title } = WORKBENCHES[workbenchName];
  chart = new Chart(canvas.getContext("2d"), generateChartConfig({ title }));
  subscription = newMarksObserver.subscribe((marks) => {
    marks.forEach(({ name, duration, n }, i) => {
      const existingDatasetIndex = chart.data.datasets.findIndex(
        ({ label }) => label === name
      );
      if (existingDatasetIndex === -1) {
        chart.data.datasets.push({
          borderColor: CHART_COLORS[i],
          backgroundColor: CHART_COLORS[i],
          label: name,
          showLine: true,
          data: [{ x: n, y: duration }],
        });
      } else {
        chart.data.datasets[existingDatasetIndex].data.push({
          x: n,
          y: duration,
        });
      }
    });
    chart.update();
  });
};

const controls = document.querySelector(".controls");

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

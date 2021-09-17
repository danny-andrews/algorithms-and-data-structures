import * as R from "ramda";
import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import { WORKBENCHES } from "./workbenches";
import { render, html } from "uhtml";
import { noop, fromWorkerEvent } from "../shared.js";
import { capitalCase } from "change-case";
import "./components.js";

const worker = new Worker("/benchmarking/worker.js", { type: "module" });

const postMessage = (type, data) => worker.postMessage({ type, data });

const canvas = document.getElementById("chart");
const controls = document.querySelector(".controls");

let chart = { destroy: noop };
let subscription = { unsubscribe: noop };

const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

const workbenches = Object.entries(WORKBENCHES).map(([name, workbench]) => ({
  ...workbench,
  subjects: workbench.subjects.map((subject) => ({
    ...(subject instanceof Function ? { fn: subject } : subject),
    name: capitalCase(subject.name),
  })),
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
  const workbenchName = event.detail.formData.get("workbench");

  cleanup();
  FormData;
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
    console.log("hey");
    render(
      controls,
      Workbench(
        workbenches,
        workbenches.find(({ name }) => name === e.target.value)
      )
    );
  };

  return html`
    <sl-card class="workbench-form-card">
      <sl-form class="workbench-form" onsl-submit=${handleSubmit}>
        <sl-select
          label="Choose a workbench"
          onsl-change=${handleInput}
          value=${selectedWorkbench.name}
          name=${NAME}
        >
          ${workbenches.map(
            ({ name, title }) =>
              html`<sl-menu-item value=${name}>${title}</sl-menu-item>`
          )}
        </sl-select>
        <sl-button submit type="primary">Run Benchmarks!</sl-button>
      </sl-form>
    </sl-card>
    <sl-card class="workbench-info-card">
      <ul>
        ${selectedWorkbench.subjects.map(({ name }) => html`<li>${name}</li>`)}
      </ul>
    </sl-card>
  `;
};

render(controls, Workbench(workbenches));

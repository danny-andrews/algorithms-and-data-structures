import * as R from "ramda";
import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import { WORKBENCHES } from "./workbenches";
import { render, html } from "uhtml";
import {
  noop,
  fromWorkerEvent,
  reduceObservable,
  mapUpdate,
} from "../shared.js";
import { capitalCase } from "change-case";
import "./components.js";

const worker = new Worker("/benchmarking/worker.js", { type: "module" });

const postMessage = (name, data) => worker.postMessage({ name, data });

const canvas = document.getElementById("chart");
const controls = document.querySelector(".controls");

const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

const numberFormat = new Intl.NumberFormat("en-US", { style: "decimal" });

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

const markToDataPoint = ({ n, duration }) => ({ x: n, y: duration });

const addMarkToChart = (mark, num, chart) => {
  const { name } = mark;
  const existingDatasetIndex = chart.data.datasets.findIndex(
    ({ label }) => label === name
  );
  const datapoint = markToDataPoint(mark);
  if (existingDatasetIndex === -1) {
    chart.data.datasets.push(
      createDataset({ num, label: name, data: [datapoint] })
    );
  } else {
    chart.data.datasets[existingDatasetIndex].data.push(datapoint);
  }
};

const addMarksToChart = (marks, chart) => {
  marks.forEach((mark, i) => {
    addMarkToChart(mark, i, chart);
  });
  chart.update();
};

let chart = new Chart(canvas.getContext("2d"), generateChartConfig());
let subscriptions = [];

const cleanup = () => {
  chart.destroy();
  subscriptions.forEach((subscription) => subscription.unsubscribe());
  subscriptions = [];
};

const runWorkbench = (workbenchName) => {
  cleanup();
  postMessage("RUN_WORKBENCH", workbenchName);

  chart = new Chart(
    canvas.getContext("2d"),
    generateChartConfig({ title: WORKBENCHES[workbenchName].title })
  );
  subscriptions = [
    reduceObservable(
      (values, markSet) => {
        markSet.forEach(({ name, n, duration }) => {
          const newMark = { n, duration };
          mapUpdate(name, [newMark], (marks) => marks.concat(newMark), values);
        });
        return values;
      },
      new Map(),
      newMarksObserver
    ).subscribe((result) => {
      const stuff = [...result.entries()].map(([name, marks], i) => {
        return createDataset({
          num: i,
          label: name,
          data: marks.map(markToDataPoint),
        });
      });
      console.log(stuff, "all marks");
    }),
    newMarksObserver.subscribe({
      next: (marks) => addMarksToChart(marks, chart),
    }),
  ];
};

const Workbench = (workbenches, selectedWorkbench = R.head(workbenches)) => {
  const { name: workbenchName, subjects, range } = selectedWorkbench;
  const NAME = "workbench";
  const handleInput = (e) => {
    render(
      controls,
      Workbench(
        workbenches,
        workbenches.find(({ name }) => name === e.target.value)
      )
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    runWorkbench(event.detail.formData.get("workbench"));
  };
  const endpointStr = [R.head(range), R.last(range)]
    .filter((num) => Boolean(num))
    .map((num) => numberFormat.format(num))
    .join(" - ");

  return html`
    <sl-card class="panel">
      <sl-form class="workbench-form" onsl-submit=${handleSubmit}>
        <sl-select
          label="Choose a workbench"
          onsl-change=${handleInput}
          value=${workbenchName}
          name=${NAME}
        >
          ${workbenches.map(
            ({ name, title }) =>
              html`<sl-menu-item value=${name}>${title}</sl-menu-item>`
          )}
        </sl-select>
        <sl-button submit type="success">Run</sl-button
        ><sl-button type="danger" disabled>Stop</sl-button>
      </sl-form>
      <table class="workbench-info-table">
        <tbody>
          <tr>
            <th>Functions</th>
            <td>${subjects.map(({ fn }) => fn.name).join(", ")}</td>
          </tr>
          <tr>
            <th>Iterations</th>
            <td>1000</td>
          </tr>
          <tr>
            <th>n-Values</th>
            <td>
              <sl-dropdown>
                <sl-button slot="trigger" caret>${endpointStr}</sl-button>
                <sl-menu>
                  ${range.map(
                    (number) => html`
                      <sl-menu-item value=${number}>
                        <sl-format-number value=${number}> </sl-format-number>
                      </sl-menu-item>
                    `
                  )}
                </sl-menu>
              </sl-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </sl-card>
  `;
};

render(controls, Workbench(workbenches));

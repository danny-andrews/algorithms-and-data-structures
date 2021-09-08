import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import Observable from "core-js-pure/features/observable";
import { WORKBENCHES } from "../testing/benchmarks.js";
import { render, html } from "uhtml";
import { noop } from "../shared.js";

const worker = new Worker("/client/worker.js", { type: "module" });
const canvas = document.getElementById("chart");

const fromWorkerEvent = (worker, eventType) =>
  new Observable((emitter) => {
    const listener = (e) => {
      const { type, data } = e.data;
      if (type === eventType) {
        emitter.next(data);
      }
    };
    worker.addEventListener("message", listener);

    return () => {
      worker.removeEventListener("message", listener);
    };
  });

const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

let chart = { destroy: noop };
const Workbench = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const workbenchName = formData.get("workbench");
    worker.postMessage({
      type: "RUN_WORKBENCH",
      data: workbenchName,
    });
    const { title } = WORKBENCHES[workbenchName];
    chart.destroy();
    chart = new Chart(canvas.getContext("2d"), generateChartConfig({ title }));
    newMarksObserver.subscribe((marks) => {
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

  return html`
    <form onsubmit=${handleSubmit}>
      <label for="workbench">Choose a workbench:</label>
      <select name="workbench" id="workbench">
        ${Object.entries(WORKBENCHES).map(
          ([name]) => html`<option value=${name}>${name.toLowerCase()}</option>`
        )}
      </select>
      <button type="submit">Run!</button>
    </form>
  `;
};

const controls = document.querySelector(".controls");
render(controls, Workbench());

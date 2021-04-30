import Chart, { generateChartConfig, CHART_COLORS } from "./chart";
import Observable from "core-js-pure/features/observable";

const worker = new Worker("/client/worker.js", { type: "module" });

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

const initObserver = fromWorkerEvent(worker, "INIT");
const newMarksObserver = fromWorkerEvent(worker, "NEW_MARKS");

initObserver.subscribe({
  next: ({ title, range }) => {
    const config = generateChartConfig({ title, range });
    const canvas = document.getElementById("chart");
    const chart = new Chart(canvas.getContext("2d"), config);

    newMarksObserver.subscribe((marks) => {
      chart.data.labels.push(marks[0].n);
      marks.forEach(({ name, duration, n }, i) => {
        const existingDatasetIndex = chart.data.datasets.findIndex(
          ({ label }) => label === name
        );
        if (existingDatasetIndex === -1) {
          chart.data.datasets.push({
            borderColor: CHART_COLORS[i],
            backgroundColor: CHART_COLORS[i],
            label: name,
            data: [duration],
          });
        } else {
          chart.data.datasets[existingDatasetIndex].data.push(duration);
        }
      });
      chart.update();
    });
  },
});

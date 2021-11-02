import { LitElement, html, css } from "lit";
import * as R from "ramda";

import { fromWorkerEvent } from "../../shared.js";

const markToDataPoint = ({ n, duration }) => ({ x: n, y: duration });

class App extends LitElement {
  static properties = {
    isRunning: { state: true },
    selectedWorkbench: { state: true },
    workbenches: {},
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    :host > * + * {
      margin-top: var(--sl-spacing-small);
    }

    workbench-table,
    workbench-form {
      --border: 1px solid var(--border-color);
      --border-radius: var(--sl-input-border-radius-medium);
    }

    .workbench-controls {
      max-width: 800px;
      width: 100%;
    }

    .workbench-controls::part(body) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      grid-gap: var(--sl-spacing-large);
      align-items: center;
    }

    sl-card.full-width,
    sl-card.full-width::part(body) {
      width: 100%;
    }

    @media (min-width: 900px) {
      .workbench-controls::part(body) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
    }
  `;

  #chartEl;

  #addMarksToChart = (marks) => {
    marks.forEach((mark) => {
      this.#chartEl.addDatapointFor(mark.name, markToDataPoint(mark));
    });
  };

  #postMessage = (name, payload) => {
    this.worker.postMessage({ name, payload });
  };

  #clearChart = () => {
    this.#chartEl.reset();
  };

  #handleStop = () => {
    this.#postMessage("STOP_WORKBENCH");
    this.#clearChart();
    this.isRunning = false;
  };

  #handleWorkbenchChange = (event) => {
    const workbenchName = event.detail;
    this.selectedWorkbench = this.workbenches.find(
      ({ name }) => workbenchName === name
    );
  };

  #handleStart = () => {
    this.#postMessage("RUN_WORKBENCH", this.selectedWorkbench.name);
    this.#clearChart();
    this.isRunning = true;
  };

  connectedCallback() {
    super.connectedCallback();

    this.worker = new Worker("/benchmarking/worker.js", { type: "module" });
    this.isRunning = false;
    this.selectedWorkbench = R.head(this.workbenches);
    const newMarksObserver = fromWorkerEvent(this.worker, "NEW_MARKS");
    fromWorkerEvent(this.worker, "MARKSET_COMPLETE").subscribe(() => {
      // Render form for running asymptotic benchmarks
      this.isRunning = false;
    });

    newMarksObserver.subscribe(this.#addMarksToChart);
  }

  firstUpdated() {
    this.#chartEl = this.renderRoot.querySelector("my-chart");
  }

  render() {
    const { name: workbenchName, subjects, range } = this.selectedWorkbench;

    return html`
      <h1>Asymptotic Analysis</h1>
      <sl-card class="workbench-controls full-width">
        <workbench-form
          @start=${this.#handleStart}
          @stop=${this.#handleStop}
          @workbench-change=${this.#handleWorkbenchChange}
          .workbenches=${this.workbenches}
          .workbenchName=${workbenchName}
          ?isRunning=${this.isRunning}
        >
        </workbench-form>
        <workbench-table .subjects=${subjects} .range=${range}>
        </workbench-table>
      </sl-card>
      <sl-card class="full-width">
        <div>
          <my-chart .title=${workbenchName}></my-chart>
        </div>
      </sl-card>
    `;
  }
}

customElements.define("abm-app", App);

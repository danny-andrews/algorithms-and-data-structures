import { LitElement, html } from "lit";
import styles from "./styles.js";

const SELECT_NAME = "workbench";

class WorkbenchForm extends LitElement {
  static styles = styles;

  static properties = {
    workbenches: { type: Array },
    subjects: { type: Array },
    range: { type: Array },
    isRunning: { type: Boolean, reflect: true },
    workbenchName: { type: String, reflect: true },
    selectedWorkbench: { type: Object },
  };

  dispatch(name, data = null) {
    this.dispatchEvent(new CustomEvent(name, data ? { detail: data } : null));
  }

  #handleSubmit = () => {
    this.dispatch("start");
  };

  #handleWorkbenchChange = (event) => {
    this.dispatch("workbench-change", event.target.value);
  };

  render() {
    const options = [{ name: "", title: "---" }, ...this.workbenches];
    const {
      name: workbenchName,
      subjects,
      range,
    } = this.selectedWorkbench || { name: "" };
    const shouldShowWorkbenchTable = Boolean(this.selectedWorkbench);

    const header = html`
      <sl-select
        @sl-change=${this.#handleWorkbenchChange}
        value=${workbenchName}
        name=${SELECT_NAME}
        label="Select a workbench"
        ?disabled=${this.isRunning}
      >
        ${options.map(
          ({ name, title }) =>
            html`<sl-menu-item value=${name}>${title}</sl-menu-item>`
        )}
      </sl-select>
    `;

    return html`
      <sl-form class="form" @sl-submit=${this.#handleSubmit}>
        <sl-card class="workbench-controls">
          ${shouldShowWorkbenchTable
            ? html`
                <div slot="header">
                  ${header}
                  <div class="button-container">
                    <sl-button
                      type="danger"
                      @click=${() => this.dispatch("stop")}
                      ?disabled=${!this.isRunning}
                    >
                      Stop
                    </sl-button>
                    <sl-button
                      submit
                      type="success"
                      ?loading=${this.isRunning}
                      ?disabled=${this.isRunning}
                    >
                      Start
                    </sl-button>
                  </div>
                </div>
                <workbench-table
                  .subjects=${subjects}
                  .range=${range}
                ></workbench-table>
              `
            : header}
        </sl-card>
      </sl-form>
    `;
  }
}

customElements.define("workbench-form", WorkbenchForm);

import { LitElement, html, css } from "lit";

const SELECT_NAME = "workbench";

class WorkbenchForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .button-container {
      display: flex;
      gap: var(--sl-spacing-small);
      margin-top: var(--sl-spacing-small);
      flex-wrap: wrap;
    }

    .button-container sl-button {
      width: 100%;
    }

    @media (min-width: 900px) {
      .button-container {
        flex-wrap: nowrap;
      }
    }
  `;

  static properties = {
    workbenches: { type: Array },
    workbenchName: { type: String, reflect: true },
    isRunning: { type: Boolean, reflect: true },
  };

  dispatch(name, data = null) {
    this.dispatchEvent(new CustomEvent(name, data ? { detail: data } : null));
  }

  render() {
    return html`
      <sl-form
        class="workbench-form inner-spacing-small"
        @sl-submit=${() => this.dispatch("start")}
      >
        <sl-select
          label="Choose a workbench"
          @sl-change=${(e) => this.dispatch("workbench-change", e.target.value)}
          value=${this.workbenchName}
          name=${SELECT_NAME}
          ?disabled=${this.isRunning}
        >
          ${this.workbenches.map(
            ({ name, title }) =>
              html`<sl-menu-item value=${name}>${title}</sl-menu-item>`
          )}
        </sl-select>
        <div class="button-container">
          <sl-button
            submit
            type="success"
            ?loading=${this.isRunning}
            ?disabled=${this.isRunning}
          >
            Run
          </sl-button>
          <sl-button
            type="danger"
            @click=${() => this.dispatch("stop")}
            ?disabled=${!this.isRunning}
          >
            Stop
          </sl-button>
        </div>
      </sl-form>
    `;
  }
}

customElements.define("workbench-form", WorkbenchForm);

import { LitElement, html } from "lit";
import * as R from "ramda";
import styles from "./styles.js";
import { formatNumber } from "../../../shared.js";

class WorkbenchTable extends LitElement {
  static styles = styles;

  static properties = {
    subjects: { type: Array },
    range: { type: Array },
  };

  render() {
    const rangeStr = [R.head(this.range), R.last(this.range)]
      .filter(Boolean)
      .map(formatNumber)
      .join(" - ");

    return html`
      <table class="workbench-details">
        <thead>
          <tr>
            <th class="heading" colspan="2">Workbench Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Functions</th>
            <td class="tag-cell">
              ${this.subjects.map(
                ({ fn }) =>
                  html`<sl-tag size="small" type="neutral">${fn.name}</sl-tag>`
              )}
            </td>
          </tr>
          <tr>
            <th>Iterations</th>
            <td>1000</td>
          </tr>
          <tr>
            <th>n-Values</th>
            <td class="tag-cell">
              <sl-dropdown>
                <sl-button size="small" slot="trigger" caret
                  >${rangeStr}</sl-button
                >
                <sl-menu>
                  ${this.range.map(
                    (number) => html`
                      <sl-menu-item value=${number} disabled>
                        ${formatNumber(number)}
                      </sl-menu-item>
                    `
                  )}
                </sl-menu>
              </sl-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define("workbench-table", WorkbenchTable);

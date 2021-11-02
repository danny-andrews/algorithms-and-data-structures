import { LitElement, html, css } from "lit";
import * as R from "ramda";
import { formatNumber } from "../../shared.js";

class WorkbenchTable extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    h2 {
      margin: 0;
    }

    .workbench-details th {
      /* Ensures th shrinks to smallest possible size. */
      width: 1px;
      text-align: right;
    }

    sl-tag::part(base) {
      line-height: 1;
      user-select: auto;
    }

    .tag-cell {
      display: flex;
      gap: var(--sl-spacing-2x-small);
      flex-wrap: wrap;
    }

    table {
      border: var(--border);
      border-radius: var(--border-radius);
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
    }

    th + td {
      border-left: var(--border);
    }

    tr + tr > th,
    tr + tr > td {
      border-top: var(--border);
    }

    th,
    td {
      padding: var(--sl-spacing-x-small);
    }

    tr:nth-child(even) {
      background: rgb(var(--sl-color-neutral-50));
    }
  `;

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
        <tbody>
          <tr>
            <th>Functions</th>
            <td class="tag-cell">
              ${this.subjects.map(
                ({ fn }) =>
                  html`<sl-tag size="medium" type="neutral">${fn.name}</sl-tag>`
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
                <sl-button slot="trigger" caret>${rangeStr}</sl-button>
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

import { css } from "lit";

export default css`
  :host {
    --border: 1px solid var(--border-color);
    --border-radius: var(--sl-input-border-radius-medium);

    display: block;
  }

  h2 {
    margin: 0;
  }

  .workbench-details th {
    /* Ensures th shrinks to smallest possible size. */
    width: 1px;
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
    border-spacing: 0;
    border: var(--border);
    border-radius: var(--border-radius);
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

  .heading {
    background: rgb(var(--sl-color-neutral-50));
    border-bottom: var(--border);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
`;

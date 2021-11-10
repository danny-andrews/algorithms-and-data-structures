import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  .heading {
    text-align: center;
  }

  .form > * + * {
    margin-top: var(--sl-spacing-small);
  }

  .form::part(base) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container {
    display: flex;
    gap: var(--sl-spacing-x-small);
    flex-wrap: wrap;
    margin-top: var(--sl-spacing-x-small);
  }

  .button-container sl-button {
    width: 100%;
  }

  @media (min-width: 900px) {
    .button-container {
      flex-wrap: nowrap;
    }
  }

  .workbench-controls {
    max-width: 500px;
    width: 100%;
  }

  .workbench-controls::part(body) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    align-items: center;
  }

  .workbench-controls::part(header) {
    padding: var(--sl-spacing-large);
    border-bottom: dashed var(--border-width) var(--border-color);
  }
`;

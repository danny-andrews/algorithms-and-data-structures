import { css } from "lit";

export default css`
  :host > * + * {
    margin-top: var(--sl-spacing-small);
  }

  .heading {
    margin-bottom: var(--sl-spacing-small);
    text-align: center;
  }

  sl-card.full-width,
  sl-card.full-width::part(body) {
    width: 100%;
  }
`;

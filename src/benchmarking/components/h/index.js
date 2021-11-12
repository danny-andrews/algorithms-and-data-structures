import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import styles from "./styles.js";

class H extends LitElement {
  static styles = styles;

  static properties = {
    level: { type: Number, reflect: true },
    as: { type: Number, reflect: true },
  };

  render() {
    const as = this.as || this.level;
    const tag = `h${this.level}`;
    const className = `h${as}`;

    return unsafeHTML(
      `<${tag} class=${className}>
        <slot></slot>
      </${tag}>`
    );
  }
}

customElements.define("abm-h", H);

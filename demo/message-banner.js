import { LitElement, css, html } from 'lit'
import { withStore } from 'lit-reatom'
import { messageAtom } from './message.js'

export class MessageBanner extends withStore(LitElement) {
  static properties = {
    value: { type: String, store: messageAtom },
  }

  static styles = css`
    h1 {
      border-width: 1px;
      background-color: green;
      color: white;
    }
  `

  render() {
    return html`<h1>${this.value}</h1> `
  }
}

window.customElements.define('message-banner', MessageBanner)

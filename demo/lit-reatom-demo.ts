import { LitElement, css, html } from 'lit'
import { Atom } from '@reatom/core'
import { updateMessage } from './message.js'
import './message-banner.js'

declare module 'lit' {
  interface PropertyDeclaration {
    store?: Atom
  }
}

export class LitReatomDemo extends LitElement {
  static styles = css`
    h1 {
      line-height: 1.1;
    }
  `

  inputChange(e: InputEvent) {
    const target = e.target as HTMLInputElement
    updateMessage(target.value)
  }

  render() {
    return html`<h1>Lit Reatom Demo</h1>

      <label>Set message</label>
      <input @change=${this.inputChange} />

      <message-banner></message-banner>

      <message-banner></message-banner> `
  }
}

window.customElements.define('lit-reatom-demo', LitReatomDemo)

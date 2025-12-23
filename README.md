# lit-reatom

> Integrates [reatom](https://www.reatom.dev/) with [Lit](https://lit.dev)

### Features

&nbsp; &nbsp; ✓ Hooks into Lit property system<br>
&nbsp; &nbsp; ✓ Easy to implement unit tests. Same as components without app state<br>

### Install

```sh
npm install lit @reatom/core lit-reatom
```

or

```sh
yarn add lit @reatom/core lit-reatom
```

> Requires Reatom v1000 or higher. For Reatom v3 use lit-reatom v0.2.x

### Usage

`withStore` is mixin / class decorator that extends LitElement components allowing to define store in property definition

```javascript
import { atom } from '@reatom/core'
import { LitElement, html } from 'lit'
import { withStore } from 'lit-reatom'

const propAtom = atom('world')

class MyComponent extends withStore(LitElement) {
  static properties = {
    // declaring store in a property definition will set the property to the atom value
    // and re render the component when atom is updated
    myProp: { type: String, store: propAtom },
  }

  render() {
    return html` <div>Hello ${this.myProp}</div> `
  }
}

// component will be rendered with 'Hello Jon'
propAtom.set('Jon')
```

optionally use decorator syntax

```javascript
@withStore
class MyComponent extends LitElement {}
```

#### With TypeScript

Same as above, just declare the PropertyDeclaration interface once so store property is recognized

```typescript
// in a setup file or at the top of your component file
import { Atom } from '@reatom/core'

declare module 'lit' {
  interface PropertyDeclaration {
    store?: Atom
  }
}

// then use as usual, with static properties like vanilla js example or property decorator
import { atom } from '@reatom/core'
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { withStore } from 'lit-reatom'

const propAtom = atom('world')

class MyComponent extends withStore(LitElement) {
  @property({ type: String, store: propAtom })
  myProp: string

  render() {
    return html` <div>Hello ${this.myProp}</div> `
  }
}
```

### Remarks

- Keeps the basic structure of how Lit component is written: declare a property and use it in render.
  - Its easy to create unit tests or demo (like storybook): just set the property / attribute as any other component. See testing example [here](demo/message-banner.test.ts)
  - Its easy to add (or remove) integration with app state (reatom)

### License

MIT
Copyright © 2024 - 2025 Luiz Américo Pereira Câmara

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

### Usage

`withStore` is mixin / class decorator that extends LitElement components allowing to define store in property definition

```javascript
import { atom, createCtx } from '@reatom/core'
import { LitElement, html } from 'lit'
import { withStore, getDefaultCtx, setDefaultCtx } from 'lit-reatom'

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

// elsewhere in the app
const ctx = getDefaultCtx()

// component will be rendered with 'Hello Jon'
propAtom(ctx, 'Jon')

// or set default context for another one
const appCtx = createCtx()
setDefaultCtx(appCtx)
```

optionally use decorator syntax

```javascript
@withStore
class MyComponent extends LitElement {}
```

### Remarks

- Keeps the basic structure of how Lit component is written: declare a property and use it in render.
  - Its easy to create unit tests or demo (like storybook): just set the property / attribute as any other component. See testing example [here](demo/message-banner.test.js)
  - Its easy to add (or remove) integration with app state (reatom)
- It will not work with Lit `property` decorator whe using typescript

### License

MIT
Copyright © 2024 Luiz Américo Pereira Câmara

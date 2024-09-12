const storeDefsKey = Symbol('storeDefsKey')
const storeUnsubscribesKey = Symbol('storeUnsubscribesKey')

/**
 * @import { Ctx } from '@reatom/core'
 */

/**
 * @type {Ctx | undefined}
 */
let defaultCtx

/**
 * @returns {Ctx | undefined}
 */
export function getDefaultCtx() {
  return defaultCtx
}

/**
 * @param {Ctx} ctx
 */
export function setDefaultCtx(ctx) {
  defaultCtx = ctx
}

function subscribeStores(element, storeDefs) {
  if (!defaultCtx) {
    console.warn('lit-reatom: setDefaultCtx must be called before using withStore')
    return
  }

  return storeDefs.map(({ store, name }) => {
    return defaultCtx.subscribe(store, (value) => {
      element[name] = value
    })
  })
}

/**
 * @template {typeof HTMLElement} BaseClass
 * @param {BaseClass} BaseClass
 * @returns {BaseClass}
 */
export function withStore(BaseClass) {
  return class extends BaseClass {
    static finalize() {
      const result = super.finalize()

      // todo: instead of an array save the stores as a object where the key is the property name
      // this allows to override store in sub classes
      const storeDefs = []

      this.elementProperties.forEach(({ store }, name) => {
        if (store) {
          storeDefs.push({ store, name })
        }
      })

      if (storeDefs.length) {
        const classStoreDefs = this[storeDefsKey] || (this[storeDefsKey] = [])
        classStoreDefs.push(...storeDefs)
      }

      return result
    }

    constructor() {
      super()

      const storeDefs = this.constructor[storeDefsKey]
      if (storeDefs) {
        this[storeUnsubscribesKey] = subscribeStores(this, storeDefs)
      }
    }

    connectedCallback() {
      super.connectedCallback()
      const storeUnsubscribes = this[storeUnsubscribesKey]
      // re subscribe stores
      if (storeUnsubscribes && storeUnsubscribes.length === 0) {
        this[storeUnsubscribesKey] = subscribeStores(this, this.constructor[storeDefsKey])
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback()
      const storeUnsubscribes = this[storeUnsubscribesKey]
      // unsubscribe stores
      if (storeUnsubscribes) {
        storeUnsubscribes.forEach((unsubscribe) => {
          unsubscribe()
        })
        // reset to empty array, so check can be simplified in connectedCallback
        this[storeUnsubscribesKey] = []
      }
    }
  }
}

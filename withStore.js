const storeDefsKey = Symbol('storeDefsKey')
const storeUnsubscribesKey = Symbol('storeUnsubscribesKey')

/**
 * @import {Atom} from '@reatom/core'
 */

/**
 * @typedef StoreDef
 * @property {Atom} store
 * @property {string} name
 */

/**
 *
 * @param {HTMLElement} element
 * @param {StoreDef[]} storeDefs
 * @returns
 */

function subscribeStores(element, storeDefs) {
  return storeDefs.map(({ store, name }) => {
    return store.subscribe((value) => {
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

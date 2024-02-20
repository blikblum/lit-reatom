import { describe, it } from 'vitest'
import { fixture, expect } from '@open-wc/testing'

import './message-banner.js'

describe('message-banner', () => {
  it('should accept value attribute', async () => {
    const el = await fixture(`<message-banner value="xx"></message-banner>`)
    expect(el).shadowDom.to.equal('<h1>xx</h1>')
  })
})

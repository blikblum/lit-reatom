import { createCtx } from '@reatom/core'
import { setDefaultCtx } from 'lit-reatom'

export const appContext = createCtx()
setDefaultCtx(appContext)

import { atom } from '@reatom/core'
import { appContext } from './appState.js'

export const messageAtom = atom('Hello World!')

export function updateMessage(message) {
  messageAtom(appContext, message)
}

import { atom } from '@reatom/core'

export const messageAtom = atom('Hello World!')

export function updateMessage(message) {
  messageAtom.set(message)
}

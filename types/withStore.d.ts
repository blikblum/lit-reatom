/**
 * @template {typeof HTMLElement} BaseClass
 * @param {BaseClass} BaseClass
 * @returns {BaseClass}
 */
export function withStore<BaseClass extends typeof HTMLElement>(BaseClass: BaseClass): BaseClass;
export type StoreDef = {
    store: Atom;
    name: string;
};
import type { Atom } from '@reatom/core';
//# sourceMappingURL=withStore.d.ts.map
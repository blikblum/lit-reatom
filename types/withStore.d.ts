/**
 * @returns {Ctx | undefined}
 */
export function getDefaultCtx(): Ctx | undefined;
/**
 * @param {Ctx} ctx
 */
export function setDefaultCtx(ctx: Ctx): void;
/**
 * @template {typeof HTMLElement} BaseClass
 * @param {BaseClass} BaseClass
 * @returns {BaseClass}
 */
export function withStore<BaseClass extends typeof HTMLElement>(BaseClass: BaseClass): BaseClass;
import type { Ctx } from '@reatom/core';
//# sourceMappingURL=withStore.d.ts.map
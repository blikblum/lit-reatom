/**
 * @returns {import('@reatom/core').Ctx}
 */
export function getDefaultCtx(): import('@reatom/core').Ctx;
/**
 * @param {import('@reatom/core').Ctx} ctx
 */
export function setDefaultCtx(ctx: import('@reatom/core').Ctx): void;
/**
 * @template {typeof HTMLElement} BaseClass
 * @param {BaseClass} BaseClass
 * @returns {BaseClass}
 */
export function withStore<BaseClass extends {
    new (): HTMLElement;
    prototype: HTMLElement;
}>(BaseClass: BaseClass): BaseClass;
//# sourceMappingURL=withStore.d.ts.map
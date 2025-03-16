import type { AnyFn } from "../types/common.ts";

/**
 * Redefines the target method to use the given `this` argument.
 * @param target - The method to redefine.
 * @param thisArg - The `this` argument to use for the new method.
 * @returns A new function that calls the original method with the given `this` argument.
 */
export function redefineTargetMethod(target: AnyFn, thisArg: any) {
  const newTarget = function (this: any, ...args: any[]) {
    return target.apply(thisArg, args);
  };

  return newTarget;
}

/**
 * Protects the context kind from being changed.
 * @param context - The context to protect.
 * @param kind - The kind of context to protect.
 */
export function protectContextKind(
  context: ClassMethodDecoratorContext,
  kind: typeof context.kind,
) {
  if (context.kind !== kind) {
    throw new Error("ActivateOnEnter can only be used on methods");
  }
}

/**
 * Adds a flag property to the target function.
 * @param target - The function to add the flag property to.
 * @param key - The key of the flag property.
 * @returns The target function.
 */
export function addFunctionFlagProperty(target: AnyFn, key: string) {
  Object.defineProperty(target, key, {
    value: true,
    writable: false,
    enumerable: true,
    configurable: false,
  });
  return target;
}

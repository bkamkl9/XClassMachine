import {
  addFunctionFlagProperty,
  protectContextKind,
  redefineTargetMethod,
} from "./utils.ts";

/**
 * Decorator that activates an action on enter to the state it was assigned to.
 * @param this - The `this` argument to use for the new method.
 * @param target - The method to activate on enter.
 * @param context - The context of the method.
 * @returns The target method.
 */
export function ActivateOnEnter<T extends (...args: any[]) => any>(
  this: any,
  target: T,
  context: ClassMethodDecoratorContext,
): T {
  protectContextKind(context, "method");
  const newTarget = redefineTargetMethod(target, this);
  addFunctionFlagProperty(newTarget, "_activate_on_enter");
  return newTarget as T;
}

/**
 * Decorator that activates an action on exit from the state it was assigned to.
 * @param this - The `this` argument to use for the new method.
 * @param target - The method to activate on exit.
 * @param context - The context of the method.
 * @returns The target method.
 */
export function ActivateOnExit<T extends (...args: any[]) => any>(
  this: any,
  target: T,
  context: ClassMethodDecoratorContext,
): T {
  protectContextKind(context, "method");
  const newTarget = redefineTargetMethod(target, this);
  addFunctionFlagProperty(newTarget, "_activate_on_exit");
  return newTarget as T;
}

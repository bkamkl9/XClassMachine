import { reactive } from "vue-demi";

/**
 * Create a reactive state from an initial schema
 * @param initial_schema_reactive - The initial state of the reactive object
 * @returns The reactive state
 */
export function createReactiveState<R>(initial_schema_reactive?: R) {
  const reactiveState = reactive(
    initial_schema_reactive
      ? JSON.parse(JSON.stringify(initial_schema_reactive))
      : {},
  );
  return reactiveState as R extends object ? R : never;
}

/**
 * Reset the reactive state to the initial state
 * @param initial_schema_reactive - The initial state of the reactive object
 * @param reactiveState - The reactive state to reset
 */
export function resetReactiveState<R extends object>(
  initial_schema_reactive: R,
  reactiveState: R,
) {
  Object.assign(
    reactiveState,
    JSON.parse(JSON.stringify(initial_schema_reactive)),
  );
}

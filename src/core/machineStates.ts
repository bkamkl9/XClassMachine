import type { Ref } from "vue-demi";

/**
 * Change the state of the machine
 * @param currentState - The current state of the machine
 * @param newState - The new state to change to
 * @param states - The states of the machine
 */
export function changeMachineState<S extends object>(
  currentState: Ref<keyof S>,
  newState: keyof S,
  states: S,
) {
  if (!(newState in states)) {
    throw new Error(`State ${String(newState)} is not valid`);
  }
  currentState.value = newState;
}

/**
 * Get the current state of the machine as a ref
 * @param activeState - The active state of the machine
 * @returns The current state of the machine
 */
export function getMachineState<S extends object>(
  activeState: Ref<keyof S>,
): Ref<keyof S> {
  return activeState;
}

import type { MachineTemplate } from "../types/machine.ts";
import { ref } from "vue-demi";
import { createReactiveState, resetReactiveState } from "./reactiveState.ts";
import { changeMachineState, getMachineState } from "./machineStates.ts";

export function createStateMachine<
  S extends object,
  R,
>(
  schema: MachineTemplate<S, R extends object ? R : never>,
) {
  const reactiveState = createReactiveState<R>(schema.reactive);
  const activeState = ref(schema.initial);

  return {
    reactive: reactiveState,
    resetReactive: () =>
      resetReactiveState(schema.reactive ?? {}, reactiveState),
    get currentState() {
      return getMachineState(activeState);
    },
    changeState: (state: keyof S) =>
      // Todo: get rid of type casting "as S"
      changeMachineState(activeState, state, schema.states as S),
  };
}

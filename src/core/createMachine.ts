import type { MachineTemplate } from "../types/machine.ts";
import { reactive } from "vue-demi";

class Machine<S extends object, R extends object> {
  private schema: MachineTemplate<S, R>;
  private computedState: keyof Machine<S, R>["schema"]["states"];

  constructor(schema: MachineTemplate<S, R>) {
    this.schema = schema;
    this.computedState = schema.initial;
  }

  public changeState(state: keyof Machine<S, R>["schema"]["states"]) {
    if (!(state in this.schema.states)) {
      throw new Error(`State ${String(state)} is not valid`);
    }
    this.computedState = state;
  }

  public get currentState() {
    return this.computedState;
  }
}

function _createReactiveState<R>(initial_schema_reactive?: R) {
  const reactiveState = reactive(
    initial_schema_reactive
      ? JSON.parse(JSON.stringify(initial_schema_reactive))
      : {},
  );
  return reactiveState as R extends object ? R : never;
}

function _resetReactiveState<R extends object>(
  initial_schema_reactive: R,
  reactiveState: R,
) {
  Object.assign(
    reactiveState,
    JSON.parse(JSON.stringify(initial_schema_reactive)),
  );
}

export function createStateMachine<
  S extends object,
  R,
>(
  schema: MachineTemplate<S, R extends object ? R : never>,
) {
  const machine = new Machine(schema);
  const reactiveState = _createReactiveState<R>(schema.reactive);

  return {
    changeState: (
      state: keyof Machine<S, R extends object ? R : never>["schema"]["states"],
    ) => machine.changeState(state),
    get currentState() {
      return machine.currentState;
    },
    reactive: reactiveState,
    resetReactive: () =>
      _resetReactiveState(schema.reactive ?? {}, reactiveState),
  };
}

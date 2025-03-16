import type { MachineTemplate } from "../types/machine.ts";

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

export function createStateMachine<
  S extends object,
  R extends object,
>(
  schema: MachineTemplate<S, R>,
) {
  const machine = new Machine(schema);

  return {
    changeState: (state: keyof Machine<S, R>["schema"]["states"]) =>
      machine.changeState(state),
    get currentState() {
      return machine.currentState;
    },
  };
}

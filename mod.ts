type MachineTemplate__state<T extends object> = {
  [key_state in keyof T]: {
    [key_action in keyof T[key_state]]: T[key_state][key_action] extends
      Function ? T[key_state][key_action] : never;
  };
};

type MachineStatesTemplate<T extends object, R extends object> = {
  states: MachineTemplate__state<T>;
  initial: keyof T;
};

type MachineTemplate__reactive<R extends object> = R extends object ? R : never;

export function createStateMachine<
  States extends object,
  Reactive extends object,
>(
  machine: MachineStatesTemplate<States, Reactive> & {
    reactive: MachineTemplate__reactive<Reactive>;
  },
) {
  // actual machine logic goes here
  return machine as typeof machine;
}

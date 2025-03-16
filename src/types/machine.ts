import type { AnyFn } from "./common.ts";

export type MachineTemplateStates<T extends object> = {
  [key_state in keyof T]: {
    [key_action in keyof T[key_state]]: T[key_state][key_action] extends AnyFn
      ? T[key_state][key_action]
      : never;
  };
};

type MachineStatesTemplate<T extends object> = {
  states: MachineTemplateStates<T>;
  initial: keyof T;
};

type MachineTemplate__reactive<R extends object> = R extends object ? R : never;

export type MachineTemplate<States extends object, Reactive extends object> =
  & MachineStatesTemplate<States>
  & {
    reactive: MachineTemplate__reactive<Reactive>;
  };

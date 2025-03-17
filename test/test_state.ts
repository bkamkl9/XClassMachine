import { assert, assertThrows } from "jsr:@std/assert";
import { createStateMachine } from "../src/core/createMachine.ts";

const machine = createStateMachine({
  initial: "InitialState",
  reactive: {},
  states: {
    InitialState: {},
    ProcessingState: {},
    CompletedState: {},
  },
});

Deno.test("Initial state is assigned when created", () => {
  assert(machine.currentState.value === "InitialState");
});

Deno.test("Change state to ProcessingState", () => {
  machine.changeState("ProcessingState");
  assert(machine.currentState.value === "ProcessingState");
});

Deno.test("Cannot change state to invalid state", () => {
  assertThrows(
    // @ts-ignore deno-lint-ignore ban-ts-comment
    () => machine.changeState("InvalidState"),
    Error,
    "State InvalidState is not valid",
  );
});

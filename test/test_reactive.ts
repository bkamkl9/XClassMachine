import { createStateMachine } from "../mod.ts";
import { assert } from "@std/assert";

function defineNewStateMachine() {
  return createStateMachine({
    initial: "InitialState",
    states: {
      InitialState: {},
      ProcessingState: {},
      CompletedState: {},
    },
    reactive: {
      test: 0,
      hello: "world",
      deep: {
        object: "value",
      },
    },
  });
}

Deno.test("test reacive object is accessible", () => {
  const machine = defineNewStateMachine();
  assert(machine.reactive.test === 0);
  assert(machine.reactive.hello === "world");
  assert(machine.reactive.deep.object === "value");
});

Deno.test("test reactive object is muttable", () => {
  const machine = defineNewStateMachine();
  machine.reactive.test = 1;
  assert(machine.reactive.test === 1);
});

Deno.test("test reactive object is not shared between machines", () => {
  const machine1 = defineNewStateMachine();
  const machine2 = defineNewStateMachine();
  machine1.reactive.test = 1;
  assert(machine2.reactive.test === 0);
});

Deno.test("test reactive object is reset when resetReactive is called", () => {
  const machine = defineNewStateMachine();
  machine.reactive.test = 1;
  machine.resetReactive();
  assert(machine.reactive.test === 0);
});

Deno.test("test reactive is deep reset when resetReactive is called", () => {
  const machine = defineNewStateMachine();
  machine.reactive.test = 1;
  machine.reactive.deep.object = "new value";
  machine.resetReactive();
  assert(machine.reactive.test === 0);
  assert(machine.reactive.deep.object === "value");
});

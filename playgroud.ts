import { createStateMachine } from "./mod.ts";
import { ActivateOnEnter } from "./src/decorators/stateHooks.decorators.ts";

const stateMachine = createStateMachine({
  initial: "InitialState",
  reactive: {
    hello: "world",
  },
  states: {
    InitialState: {
      welcomeInState() {
        console.log("Welcome in state");
      },
    },
    ProcessingState: new class {
      @ActivateOnEnter
      processingInState(hello: string) {
        console.log("Processing in state", hello);
      }

      processingOutState() {
        console.log("Processing out state");
      }
    }(),
    CompletedState: {
      completedInState() {
        console.log("Completed in state");
      },
    },
  },
});

stateMachine.states.ProcessingState.processingInState("hello");

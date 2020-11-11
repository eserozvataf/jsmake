import type { JsmakeContext } from "../abstractions/context.ts";

function init(): JsmakeContext {
  return {
    commands: {},
    utils: {},
  };
}

export { init };

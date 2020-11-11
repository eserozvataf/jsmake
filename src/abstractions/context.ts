import type { JsmakeFunction } from "./function.ts";

interface JsmakeContext {
  commands: Record<string, JsmakeFunction>;
  // deno-lint-ignore ban-types
  utils: Record<string, Function>;
  // utils: {
  //   shell: (...args: string[]) => void,
  // },
}

export type { JsmakeContext };

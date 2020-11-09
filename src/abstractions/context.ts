import type { JsmakeFunction } from "./function.ts";

interface JsmakeContext {
  commands: Record<string, JsmakeFunction>;
}

export type { JsmakeContext };

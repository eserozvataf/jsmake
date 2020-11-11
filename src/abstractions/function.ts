import type { JsmakeContext } from "./context.ts";

type JsmakeFunction = (context: JsmakeContext, ...args: string[]) => void;

export type { JsmakeFunction };

import * as fs from "https://deno.land/std/fs/mod.ts";
import type { JsmakeContext } from "./abstractions/context.ts";
import { init } from "./context/init.ts";
import { loadFromFile } from "./context/loadFromFile.ts";
import { shell } from "./utils/shell.ts";

async function run(context: JsmakeContext, commandName: string, ...args: string[]) {
  const targetCommand = context.commands[commandName];

  if (targetCommand === undefined) {
    throw new Error(`command not found - ${commandName}`);
  }

  targetCommand(context, ...args);
}

function bindUtils(context: JsmakeContext): JsmakeContext {
  return {
    ...context,
    utils: {
      shell: shell,
    },
  };
}

async function jsmake(args: string[]): Promise<void> {
  const cwd = Deno.cwd();

  let context = init();

  context = await loadFromFile(context, `${cwd}/makefile.ts`);

  context = bindUtils(context);

  const [ commandName, ...restOfArgs ] = args;
  await run(context, commandName, ...restOfArgs);
}

export {
  jsmake,
};

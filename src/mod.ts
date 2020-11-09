import * as fs from "https://deno.land/std/fs/mod.ts";
import type { JsmakeFunction } from "./abstractions/function.ts";
import type { JsmakeContext } from "./abstractions/context.ts";

function init(): JsmakeContext {
  return {
    commands: {},
  };
}

async function loadMakefileIfExists(context: JsmakeContext, filepath: string): Promise<JsmakeContext> {
  if (await fs.exists(filepath)) {
    const mod = await import(filepath);

    const newCommands = Object.entries(mod) // [0] = key, [1] = value
      .filter(x => x[0].startsWith("command_"))
      .reduce((acc, cur) => ({
        ...acc, [cur[0].substr(8)]: cur[1],
      }), {});

    return {
      commands: { ...context.commands, ...newCommands },
    };
  }

  return context;
}

async function run(context: JsmakeContext, commandName: string, ...args: string[]) {
  const targetCommand = context.commands[commandName];

  if (targetCommand === undefined) {
    throw new Error(`command not found - ${commandName}`);
  }

  targetCommand();
}

async function jsmake(args: string[]): Promise<void> {
  const cwd = Deno.cwd();

  let context = init();

  context = await loadMakefileIfExists(context, `${cwd}/makefile.ts`);

  const [ commandName, ...restOfArgs ] = args;
  await run(context, commandName, ...restOfArgs);
}

export {
  jsmake,
};

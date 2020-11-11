import type { JsmakeContext } from "../abstractions/context.ts";
import type { JsmakeFunction } from "../abstractions/function.ts";

// TODO type
// deno-lint-ignore no-explicit-any
async function fetchMakefile(filepath: string): Promise<any> {
  // TODO existence check
  // if (await fs.exists(filepath)) {
  const mod = await import(filepath);

  return mod;
}

// deno-lint-ignore no-explicit-any
function loadCommands(mod: any) {
  return Object.entries(mod) // [0] = key, [1] = value
    .filter(x => x[0].startsWith("command_"))
    .reduce((acc, cur) => ({
      ...acc, [cur[0].substr(8)]: cur[1] as JsmakeFunction,
    }), {});
}

async function loadFromFile(context: JsmakeContext, filepath: string): Promise<JsmakeContext> {
  const makefile = await fetchMakefile(filepath);

  const newCommands = loadCommands(makefile);

  return {
    ...context,
    commands: { ...context.commands, ...newCommands },
  };
}

export { loadFromFile };

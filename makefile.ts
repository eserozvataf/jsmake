import { JsmakeContext } from "./src/abstractions/context.ts";

function command_dir(ctx: JsmakeContext, dir: string) {
  console.log(`listing directories: ${dir}`);
  ctx.utils.shell('bash', '-c', `"ls -l ${dir}"`);
}

function command_test() {
  console.log("testing");
}

function command_lint() {
  console.log("linting");
}

export {
  command_dir,
  command_test,
  command_lint,
};

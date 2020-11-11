async function shell(...args: string[]) {
  const p = Deno.run({
    cmd: args,
    // stdout: "piped",
    // stderr: "piped",
  });

  const { code } = await p.status();
}

export { shell };

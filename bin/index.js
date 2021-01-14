#!/usr/bin/env node

const { program } = require("commander");

const publishNpm = require("./commands/publish");

program.version("0.0.3");

program
  .option("-p, --publish [target]", "发布npm包")
  .description("发布npm包")
  .action(p => {
    if (p.publish) {
      const target = typeof p.publish === "boolean" ? "/" : `/${p.publish}/`;
      publishNpm(target);
    }
  });

program.parse(process.argv);

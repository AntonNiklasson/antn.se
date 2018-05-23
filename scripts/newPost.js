#!/usr/bin/env node

const path = require("path");
const prompts = require("prompts");
const slugify = require("slugify");
const mkdir = require("mkdirp-promise");
const writeFile = require("fs-writefile-promise");
const moment = require("moment");

(async () => {
  let { title } = await prompts({
    type: "text",
    name: "title",
    message: "What's the title of your new post?"
  });
  let slug = slugify(title);
  let folder = path.resolve("./src/pages", slug);

  await mkdir(folder);
  await writeFile(
    path.resolve(folder, "index.md"),
    `---
title: ${title}
date: ${moment().format()}
    ---

Change me, dude!
`
  );

  console.log("\nPost created!");
})();

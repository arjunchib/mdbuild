#!/usr/bin/env node

const marked = require("marked");
const fg = require("fast-glob");
const fs = require("fs");
const path = require("path");

marked.setOptions({ gfm: true });
fs.mkdirSync("./dist", { recursive: true });

fg(["**/*.md"]).then((entries) => {
  entries.forEach((entry) => {
    fs.readFile(entry, "utf8", (err, data) => {
      if (err) throw err;
      const file = path.basename(entry, ".md");
      const dir = path.dirname(entry);
      const outDir = path.join(".", "dist", dir);
      const outFile = path.join(outDir, `${file}.html`);
      fs.mkdir(outDir, { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFile(outFile, marked.parse(data), (err) => {
          if (err) throw err;
        });
      });
    });
  });
});

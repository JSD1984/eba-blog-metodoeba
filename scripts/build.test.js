const assert = require("node:assert/strict");
const test = require("node:test");
const {
  markdownToHtml,
  parseFrontMatter,
  slugify
} = require("./build");

test("parseFrontMatter reads scalar values and tags", () => {
  const parsed = parseFrontMatter(`---
title: "Titulo"
tags: ["IA", "Proceso"]
sources: ["https://example.com/uno", "https://example.com/dos"]
---
Texto`);

  assert.equal(parsed.data.title, "Titulo");
  assert.deepEqual(parsed.data.tags, ["IA", "Proceso"]);
  assert.deepEqual(parsed.data.sources, ["https://example.com/uno", "https://example.com/dos"]);
  assert.equal(parsed.body, "Texto");
});

test("slugify normalizes Spanish titles", () => {
  assert.equal(slugify("Articulo con IA y decision rapida"), "articulo-con-ia-y-decision-rapida");
});

test("markdownToHtml escapes raw html", () => {
  const html = markdownToHtml("Hola <script>alert(1)</script>");
  assert.equal(html, "<p>Hola &lt;script&gt;alert(1)&lt;/script&gt;</p>");
});

test("markdownToHtml renders headings and lists", () => {
  const html = markdownToHtml("## Titulo\n\n- Uno\n- Dos");
  assert.match(html, /<h2>Titulo<\/h2>/);
  assert.match(html, /<ul>\n<li>Uno<\/li>\n<li>Dos<\/li>\n<\/ul>/);
});

const fs = require("node:fs");
const path = require("node:path");
const { slugify } = require("./build");

const rootDir = path.resolve(__dirname, "..");
const defaultPostsDir = path.join(rootDir, "content", "posts");
const defaultCover = "/assets/hero-ai-blog.png";

function usage() {
  return `Usage: npm run publish:post -- <post.json|-> [--overwrite]

Input JSON fields:
  title, category, evidence, excerpt, tags, sources, body
Optional:
  date, slug, author, readingTime, reviewedBy, status, cover
`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function todayLocal() {
  const date = new Date();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function requireText(input, field) {
  const value = input[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required text field: ${field}`);
  }
  if (value.includes("\n")) {
    throw new Error(`Front matter field cannot contain line breaks: ${field}`);
  }
  return value.trim();
}

function optionalText(input, field, fallback) {
  const value = input[field];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid text field: ${field}`);
  }
  if (value.includes("\n")) {
    throw new Error(`Front matter field cannot contain line breaks: ${field}`);
  }
  return value.trim();
}

function requireArray(input, field) {
  if (!Array.isArray(input[field]) || input[field].length === 0) {
    throw new Error(`Missing required array field: ${field}`);
  }
  const values = input[field].map((item) => {
    if (typeof item !== "string" || !item.trim()) {
      throw new Error(`Invalid array item in: ${field}`);
    }
    if (item.includes("\n")) {
      throw new Error(`Array items cannot contain line breaks: ${field}`);
    }
    return item.trim();
  });
  return [...new Set(values)];
}

function requireBody(input) {
  const value = input.body;
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Missing required text field: body");
  }
  return value.trim();
}

function normalizeDate(value) {
  const date = value || todayLocal();
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("date must use YYYY-MM-DD");
  }
  return date;
}

function quoteScalar(value) {
  return JSON.stringify(String(value));
}

function quoteArray(values) {
  return `[${values.map(quoteScalar).join(", ")}]`;
}

function normalizePost(input) {
  const title = requireText(input, "title");
  const body = requireBody(input);
  const date = normalizeDate(input.date);
  const slug = slugify(optionalText(input, "slug", title));
  const status = optionalText(input, "status", "draft");

  if (!slug) {
    throw new Error("slug cannot be empty");
  }
  if (!["draft", "published"].includes(status)) {
    throw new Error("status must be draft or published");
  }

  return {
    title,
    date,
    author: optionalText(input, "author", "Jesus + IA"),
    category: requireText(input, "category"),
    evidence: requireText(input, "evidence"),
    excerpt: requireText(input, "excerpt"),
    readingTime: optionalText(input, "readingTime", "4 min"),
    reviewedBy: optionalText(input, "reviewedBy", "Pendiente de revision clinica"),
    tags: requireArray(input, "tags"),
    sources: requireArray(input, "sources"),
    status,
    cover: optionalText(input, "cover", defaultCover),
    slug,
    body: body.trim()
  };
}

function renderPost(post) {
  return `---
title: ${quoteScalar(post.title)}
date: ${quoteScalar(post.date)}
author: ${quoteScalar(post.author)}
category: ${quoteScalar(post.category)}
evidence: ${quoteScalar(post.evidence)}
excerpt: ${quoteScalar(post.excerpt)}
readingTime: ${quoteScalar(post.readingTime)}
reviewedBy: ${quoteScalar(post.reviewedBy)}
tags: ${quoteArray(post.tags)}
sources: ${quoteArray(post.sources)}
status: ${quoteScalar(post.status)}
cover: ${quoteScalar(post.cover)}
---

${post.body}
`;
}

function writePost(input, options = {}) {
  const post = normalizePost(input);
  const postsDir = options.postsDir || defaultPostsDir;
  const filename = `${post.date}-${post.slug}.md`;
  const filePath = path.join(postsDir, filename);

  if (fs.existsSync(filePath) && !options.overwrite) {
    throw new Error(`Post already exists: ${filename}. Use --overwrite to replace it.`);
  }

  fs.mkdirSync(postsDir, { recursive: true });
  fs.writeFileSync(filePath, renderPost(post));
  return { post, filename, filePath };
}

function readInput(inputPath) {
  const source = inputPath === "-" ? fs.readFileSync(0, "utf8") : fs.readFileSync(inputPath, "utf8");
  return JSON.parse(source);
}

function parseCli(argv) {
  const overwrite = argv.includes("--overwrite");
  const inputPath = argv.find((arg) => !arg.startsWith("--"));
  return { inputPath, overwrite };
}

function main(argv = process.argv.slice(2)) {
  const { inputPath, overwrite } = parseCli(argv);
  if (!inputPath) {
    process.stderr.write(usage());
    process.exitCode = 1;
    return;
  }

  try {
    const input = readInput(inputPath);
    const result = writePost(input, { overwrite });
    process.stdout.write(`Created ${path.relative(rootDir, result.filePath)}\n`);
    process.stdout.write(`Status: ${result.post.status}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  normalizePost,
  renderPost,
  writePost
};

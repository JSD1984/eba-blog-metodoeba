const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  normalizePost,
  renderPost,
  writePost
} = require("./publish-post");

function validInput(overrides = {}) {
  return {
    title: "Escaner intraoral: guia para pacientes",
    date: "2026-07-13",
    category: "Dental innovador",
    evidence: "Guia clinica",
    excerpt: "Que debe saber un paciente antes de una primera visita con escaner intraoral.",
    tags: ["Escaner", "Odontologia digital", "Diagnostico"],
    sources: ["https://www.ada.org/"],
    status: "published",
    body: "## Que es\n\nEl escaner intraoral ayuda a tomar registros digitales.\n\n- Rapido\n- Comodo",
    ...overrides
  };
}

test("normalizePost creates defaults and slug", () => {
  const post = normalizePost(validInput({ status: undefined }));

  assert.equal(post.slug, "escaner-intraoral-guia-para-pacientes");
  assert.equal(post.author, "Jesus + IA");
  assert.equal(post.readingTime, "4 min");
  assert.equal(post.reviewedBy, "Pendiente de revision clinica");
  assert.equal(post.status, "draft");
});

test("renderPost writes compatible front matter", () => {
  const markdown = renderPost(normalizePost(validInput()));

  assert.match(markdown, /^---\n/);
  assert.match(markdown, /title: "Escaner intraoral: guia para pacientes"/);
  assert.match(markdown, /tags: \["Escaner", "Odontologia digital", "Diagnostico"\]/);
  assert.match(markdown, /status: "published"/);
  assert.match(markdown, /## Que es/);
});

test("writePost refuses overwrite by default", () => {
  const postsDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-posts-"));

  const first = writePost(validInput(), { postsDir });
  assert.equal(first.filename, "2026-07-13-escaner-intraoral-guia-para-pacientes.md");
  assert.ok(fs.existsSync(first.filePath));

  assert.throws(
    () => writePost(validInput(), { postsDir }),
    /Post already exists/
  );
});

test("writePost allows explicit overwrite", () => {
  const postsDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-posts-"));

  writePost(validInput(), { postsDir });
  writePost(validInput({ excerpt: "Version revisada." }), { postsDir, overwrite: true });

  const source = fs.readFileSync(
    path.join(postsDir, "2026-07-13-escaner-intraoral-guia-para-pacientes.md"),
    "utf8"
  );
  assert.match(source, /Version revisada/);
});

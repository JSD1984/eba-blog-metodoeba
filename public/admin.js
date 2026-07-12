const form = document.querySelector("#post-form");
const preview = document.querySelector("#preview");
const dateInput = document.querySelector("#date");
const titleInput = document.querySelector("#title");
const excerptInput = document.querySelector("#excerpt");
const categoryInput = document.querySelector("#category");
const tagsInput = document.querySelector("#tags");
const bodyInput = document.querySelector("#body");
const downloadButton = document.querySelector("#download");
const copyAgentButton = document.querySelector("#copy-agent");
const fillExampleButton = document.querySelector("#fill-example");

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownPreview(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (!line.trim()) return "";
      if (line.startsWith("## ")) return `<h2>${inlineMarkdown(line.slice(3))}</h2>`;
      if (line.startsWith("- ")) return `<p class="preview-list">- ${inlineMarkdown(line.slice(2))}</p>`;
      return `<p>${inlineMarkdown(line)}</p>`;
    })
    .join("");
}

function getPost() {
  const date = dateInput.value || new Date().toISOString().slice(0, 10);
  const title = titleInput.value.trim() || "Nuevo articulo";
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    title,
    date,
    category: categoryInput.value.trim() || "General",
    excerpt: excerptInput.value.trim(),
    tags,
    body: bodyInput.value.trim(),
    filename: `${date}-${slugify(title)}.md`
  };
}

function toMarkdown(post) {
  const tags = post.tags.map((tag) => `"${tag.replaceAll('"', '\\"')}"`).join(", ");
  return `---
title: "${post.title.replaceAll('"', '\\"')}"
date: "${post.date}"
author: "Jesus + Neo"
category: "${post.category.replaceAll('"', '\\"')}"
excerpt: "${post.excerpt.replaceAll('"', '\\"')}"
tags: [${tags}]
status: "published"
cover: "/assets/hero-ai-blog.png"
---

${post.body}
`;
}

function updatePreview() {
  const post = getPost();
  preview.innerHTML = `
    <p class="meta">${escapeHtml(post.category)} · ${escapeHtml(post.date)}</p>
    <h2>${escapeHtml(post.title)}</h2>
    <p>${escapeHtml(post.excerpt || "Resumen del articulo.")}</p>
    <div class="tags">${post.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="preview-body">${markdownPreview(post.body || "Empieza a escribir el articulo.")}</div>
  `;
}

function downloadMarkdown() {
  const post = getPost();
  const blob = new Blob([toMarkdown(post)], { type: "text/markdown;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = post.filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function copyForAgent() {
  const post = getPost();
  const text = `Neo, publica este post en blog-ia. Guarda el Markdown como content/posts/${post.filename}, ejecuta npm run build, npm test y npm run check.\\n\\n${toMarkdown(post)}`;
  await navigator.clipboard.writeText(text);
  copyAgentButton.textContent = "Copiado";
  window.setTimeout(() => {
    copyAgentButton.textContent = "Copiar para agente";
  }, 1400);
}

function fillExample() {
  titleInput.value = "Como voy a usar IA para publicar mejor";
  categoryInput.value = "IA y negocio";
  excerptInput.value = "Un criterio practico para convertir ideas en articulos utiles con ayuda de un agente.";
  tagsInput.value = "IA, Publicacion, Proceso";
  bodyInput.value = `## Idea principal
La IA no sustituye el criterio. Lo acelera cuando hay una direccion clara.

## Flujo
- Apunto la idea.
- El agente prepara un borrador.
- Yo reviso y decido.
- El blog guarda la version final.`;
  updatePreview();
}

dateInput.value = new Date().toISOString().slice(0, 10);
form.addEventListener("input", updatePreview);
downloadButton.addEventListener("click", downloadMarkdown);
copyAgentButton.addEventListener("click", copyForAgent);
fillExampleButton.addEventListener("click", fillExample);
updatePreview();


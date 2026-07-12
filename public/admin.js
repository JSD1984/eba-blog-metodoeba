const form = document.querySelector("#post-form");
const preview = document.querySelector("#preview");
const dateInput = document.querySelector("#date");
const titleInput = document.querySelector("#title");
const excerptInput = document.querySelector("#excerpt");
const categoryInput = document.querySelector("#category");
const evidenceInput = document.querySelector("#evidence");
const reviewedByInput = document.querySelector("#reviewed-by");
const tagsInput = document.querySelector("#tags");
const sourcesInput = document.querySelector("#sources");
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
  const sources = sourcesInput.value
    .split(/\r?\n/)
    .map((source) => source.trim())
    .filter(Boolean);

  return {
    title,
    date,
    category: categoryInput.value.trim() || "General",
    evidence: evidenceInput.value.trim() || "Divulgativo",
    excerpt: excerptInput.value.trim(),
    reviewedBy: reviewedByInput.value.trim() || "Pendiente de revision clinica",
    tags,
    sources,
    body: bodyInput.value.trim(),
    filename: `${date}-${slugify(title)}.md`
  };
}

function toMarkdown(post) {
  const tags = post.tags.map((tag) => `"${tag.replaceAll('"', '\\"')}"`).join(", ");
  const sources = post.sources.map((source) => `"${source.replaceAll('"', '\\"')}"`).join(", ");
  return `---
title: "${post.title.replaceAll('"', '\\"')}"
date: "${post.date}"
author: "Jesus + Neo"
category: "${post.category.replaceAll('"', '\\"')}"
evidence: "${post.evidence.replaceAll('"', '\\"')}"
excerpt: "${post.excerpt.replaceAll('"', '\\"')}"
readingTime: "4 min"
reviewedBy: "${post.reviewedBy.replaceAll('"', '\\"')}"
tags: [${tags}]
sources: [${sources}]
status: "published"
cover: "/assets/hero-ai-blog.png"
---

${post.body}
`;
}

function updatePreview() {
  const post = getPost();
  preview.innerHTML = `
    <p class="meta">${escapeHtml(post.category)} · ${escapeHtml(post.evidence)} · ${escapeHtml(post.date)}</p>
    <h2>${escapeHtml(post.title)}</h2>
    <p>${escapeHtml(post.excerpt || "Resumen del articulo.")}</p>
    <p class="clinical-note">Revisado por: ${escapeHtml(post.reviewedBy)}</p>
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
  titleInput.value = "Escaner intraoral: que cambia para el paciente";
  categoryInput.value = "Dental innovador";
  evidenceInput.value = "Consenso profesional";
  reviewedByInput.value = "Pendiente de revision clinica";
  excerptInput.value = "Una guia sencilla sobre impresiones digitales, comodidad y limites del escaner intraoral.";
  tagsInput.value = "Escaner intraoral, Dental digital, Pacientes";
  sourcesInput.value = "https://adanews.ada.org/ada-news/2022/june/digital-dentistry-what-to-know-about-a-few-popular-technologies/";
  bodyInput.value = `## Que es
El escaner intraoral captura una imagen digital de dientes y encias para planificar tratamientos o fabricar restauraciones.

## Que mejora
- Evita muchas impresiones con pasta.
- Facilita explicar el caso en pantalla.
- Puede acortar tiempos cuando clinica y laboratorio trabajan digitalmente.

## Limites
No sustituye el diagnostico completo. En algunos casos siguen haciendo falta radiografias, exploracion periodontal o pruebas adicionales.`;
  updatePreview();
}

dateInput.value = new Date().toISOString().slice(0, 10);
form.addEventListener("input", updatePreview);
downloadButton.addEventListener("click", downloadMarkdown);
copyAgentButton.addEventListener("click", copyForAgent);
fillExampleButton.addEventListener("click", fillExample);
updatePreview();

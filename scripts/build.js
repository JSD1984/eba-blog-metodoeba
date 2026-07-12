const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const postsDir = path.join(rootDir, "content", "posts");
const publicDir = path.join(rootDir, "public");
const site = {
  title: "Estetica y Dental al Dia",
  description: "Actualidad seria sobre estetica medica, odontologia innovadora y nuevas tecnicas explicadas para pacientes.",
  url: "https://esteticaydentalaldia.com"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => parseScalar(item))
      .filter(Boolean);
  }
  return trimmed;
}

function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: source.trim() };
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) {
      data[pair[1]] = parseScalar(pair[2]);
    }
  }

  return { data, body: match[2].trim() };
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g,
    '<a href="$2">$1</a>'
  );
  return html;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let listOpen = false;
  let codeOpen = false;
  let codeLines = [];

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  function closeCode() {
    if (codeOpen) {
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      codeOpen = false;
      codeLines = [];
    }
  }

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (codeOpen) {
        closeCode();
      } else {
        closeList();
        codeOpen = true;
      }
      continue;
    }

    if (codeOpen) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^-\s+(.+)$/);
    if (listItem) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(listItem[1])}</li>`);
      continue;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  closeCode();
  return html.join("\n");
}

function readPosts() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDir, file), "utf8");
      const parsed = parseFrontMatter(source);
      const fallbackSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      const slug = slugify(parsed.data.slug || fallbackSlug || parsed.data.title || file);
      const tags = Array.isArray(parsed.data.tags)
        ? parsed.data.tags
        : String(parsed.data.tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
      const sources = Array.isArray(parsed.data.sources)
        ? parsed.data.sources
        : String(parsed.data.sources || "")
            .split(",")
            .map((source) => source.trim())
            .filter(Boolean);

      return {
        file,
        slug,
        title: parsed.data.title || "Sin titulo",
        date: parsed.data.date || "1970-01-01",
        author: parsed.data.author || "Jesus + IA",
        category: parsed.data.category || "General",
        evidence: parsed.data.evidence || "Divulgativo",
        excerpt: parsed.data.excerpt || "",
        readingTime: parsed.data.readingTime || "3 min",
        reviewedBy: parsed.data.reviewedBy || "Pendiente de revision clinica",
        status: parsed.data.status || "published",
        tags,
        sources,
        cover: parsed.data.cover || "/assets/hero-ai-blog.png",
        body: parsed.body,
        html: markdownToHtml(parsed.body)
      };
    })
    .filter((post) => post.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

function formatDate(date) {
  const [year, month, day] = String(date).split("-");
  return `${day}/${month}/${year}`;
}

function layout({ title, description, body, active = "blog" }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escapeHtml(description || site.description)}">
<title>${escapeHtml(title)} · ${escapeHtml(site.title)}</title>
<link rel="stylesheet" href="/styles.css">
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.title)}" href="/feed.xml">
</head>
<body>
<header class="site-header">
  <a class="brand" href="/" aria-label="Inicio">${escapeHtml(site.title)}</a>
  <nav class="site-nav" aria-label="Principal">
    <a ${active === "blog" ? 'class="active"' : ""} href="/">Blog</a>
    <a ${active === "catalog" ? 'class="active"' : ""} href="/catalogo.html">Catalogo</a>
  </nav>
</header>
${body}
<footer class="site-footer">
  <span>${escapeHtml(site.title)}</span>
  <span>Divulgacion con fuentes, revision y criterio clinico.</span>
</footer>
</body>
</html>`;
}

function renderTagList(tags) {
  if (!tags.length) {
    return "";
  }
  return `<div class="tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderSourceList(sources) {
  if (!sources.length) {
    return "";
  }
  return `<section class="source-box" aria-labelledby="sources-title">
    <h2 id="sources-title">Fuentes consultadas</h2>
    <ul>
      ${sources.map((source) => `<li><a href="${escapeHtml(source)}">${escapeHtml(source)}</a></li>`).join("")}
    </ul>
  </section>`;
}

function renderPostCard(post, index) {
  return `<article class="post-card ${index === 0 ? "featured" : ""}">
  <a href="${post.url}" class="post-link">
    <span class="meta">${escapeHtml(post.category)} · ${escapeHtml(post.evidence)} · ${formatDate(post.date)}</span>
    <h2>${escapeHtml(post.title)}</h2>
    <p>${escapeHtml(post.excerpt)}</p>
    ${renderTagList(post.tags)}
  </a>
</article>`;
}

function renderIndex(posts) {
  const latest = posts[0];
  const body = `<main>
  <section class="hero" style="background-image: linear-gradient(90deg, rgba(12,22,24,.78), rgba(12,22,24,.28), rgba(12,22,24,.06)), url('/assets/hero-ai-blog.png')">
    <div class="hero-copy">
      <p class="eyebrow">Estetica medica + dental innovador</p>
      <h1>Estetica y Dental al Dia</h1>
      <p>Actualidad, nuevas tecnicas y tratamientos explicados con evidencia, seguridad y lenguaje claro para pacientes.</p>
      ${latest ? `<a class="hero-action" href="${latest.url}">Leer ultimo articulo</a>` : ""}
    </div>
  </section>

  <section class="focus-strip" aria-label="Lineas editoriales">
    <div>
      <span>01</span>
      <strong>Estetica medica</strong>
      <p>Rellenos, toxina, lasers y seguridad.</p>
    </div>
    <div>
      <span>02</span>
      <strong>Dental innovador</strong>
      <p>Implantes, escaner, ortodoncia y 3D.</p>
    </div>
    <div>
      <span>03</span>
      <strong>Nuevas tecnicas</strong>
      <p>Avances utiles, limites y preguntas clave.</p>
    </div>
  </section>

  <section class="posts-section" aria-labelledby="posts-title">
    <div class="section-head">
      <div>
        <p class="eyebrow">Archivo</p>
        <h2 id="posts-title">Actualidad y guias</h2>
      </div>
    </div>
    <div class="post-grid">
      ${posts.map(renderPostCard).join("\n")}
    </div>
  </section>
</main>`;
  return layout({ title: "Blog", description: site.description, body });
}

function renderCatalog(posts) {
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const topics = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const body = `<main>
  <section class="catalog-hero" aria-labelledby="catalog-title">
    <p class="eyebrow">Catalogo</p>
    <h1 id="catalog-title">Articulos por tema</h1>
    <p>Busca por tratamiento, tecnica, categoria o palabra clave.</p>
  </section>

  <section class="catalog-panel" aria-label="Buscador de articulos">
    <div class="catalog-controls">
      <label>Buscar
        <input id="catalog-search" type="search" placeholder="Implantes, escaner, rellenos...">
      </label>
      <label>Categoria
        <select id="catalog-category">
          <option value="">Todas</option>
          ${categories.map((category) => `<option>${escapeHtml(category)}</option>`).join("")}
        </select>
      </label>
    </div>
    <div class="topic-row" id="topic-row">
      <button class="topic-chip active" type="button" data-topic="">Todos</button>
      ${topics.map((topic) => `<button class="topic-chip" type="button" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join("")}
    </div>
    <p class="result-count" id="result-count">${posts.length} articulos</p>
    <div class="catalog-grid" id="catalog-grid"></div>
  </section>
</main>
<script src="/catalogo.js"></script>`;
  return layout({ title: "Catalogo", description: "Catalogo de articulos por tema, categoria y tratamiento.", body, active: "catalog" });
}

function renderPost(post) {
  const body = `<main>
  <article class="article">
    <header class="article-header">
      <a class="back-link" href="/">Volver al blog</a>
      <p class="meta">${escapeHtml(post.category)} · ${escapeHtml(post.evidence)} · ${formatDate(post.date)} · ${escapeHtml(post.readingTime)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.excerpt)}</p>
      ${renderTagList(post.tags)}
      <div class="clinical-meta">
        <span>Revisado por: ${escapeHtml(post.reviewedBy)}</span>
        <span>Autor: ${escapeHtml(post.author)}</span>
      </div>
    </header>
    <div class="article-cover">
      <img src="${escapeHtml(post.cover)}" alt="">
    </div>
    <aside class="notice-box">
      Informacion divulgativa. No sustituye una valoracion medica u odontologica individual ni una indicacion profesional.
    </aside>
    <div class="article-body">
      ${post.html}
    </div>
    ${renderSourceList(post.sources)}
  </article>
</main>`;
  return layout({ title: post.title, description: post.excerpt, body });
}

function renderFeed(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeHtml(site.title)}</title>
<link>${site.url}</link>
<description>${escapeHtml(site.description)}</description>
${posts
  .map(
    (post) => `<item>
<title>${escapeHtml(post.title)}</title>
<link>${site.url}${post.url}</link>
<guid>${site.url}${post.url}</guid>
<pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
<description>${escapeHtml(post.excerpt)}</description>
</item>`
  )
  .join("\n")}
</channel>
</rss>`;
}

function renderSitemap(posts) {
  const urls = ["/", "/catalogo.html", ...posts.map((post) => post.url)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<url><loc>${site.url}${url}</loc></url>`).join("\n")}
</urlset>`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function buildSite() {
  const posts = readPosts().map((post) => ({
    ...post,
    url: `/posts/${post.slug}/`
  }));

  fs.rmSync(path.join(publicDir, "posts"), { recursive: true, force: true });
  writeFile(path.join(publicDir, "index.html"), renderIndex(posts));
  writeFile(path.join(publicDir, "catalogo.html"), renderCatalog(posts));
  writeFile(path.join(publicDir, "posts.json"), JSON.stringify(posts.map(({ body, html, ...post }) => post), null, 2));
  writeFile(path.join(publicDir, "feed.xml"), renderFeed(posts));
  writeFile(path.join(publicDir, "sitemap.xml"), renderSitemap(posts));

  for (const post of posts) {
    writeFile(path.join(publicDir, "posts", post.slug, "index.html"), renderPost(post));
  }

  console.log(`Built ${posts.length} post(s) into ${publicDir}`);
}

if (require.main === module) {
  buildSite();
}

module.exports = {
  buildSite,
  escapeHtml,
  inlineMarkdown,
  markdownToHtml,
  parseFrontMatter,
  slugify
};

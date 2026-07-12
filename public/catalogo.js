const grid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#catalog-search");
const categorySelect = document.querySelector("#catalog-category");
const topicRow = document.querySelector("#topic-row");
const resultCount = document.querySelector("#result-count");

let posts = [];
let selectedTopic = "";

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function postMatches(post) {
  const query = normalize(searchInput.value.trim());
  const category = categorySelect.value;
  const haystack = normalize([
    post.title,
    post.excerpt,
    post.category,
    post.evidence,
    ...(post.tags || [])
  ].join(" "));

  if (category && post.category !== category) return false;
  if (selectedTopic && !(post.tags || []).includes(selectedTopic)) return false;
  if (query && !haystack.includes(query)) return false;
  return true;
}

function renderCard(post) {
  const tags = (post.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  return `<article class="post-card catalog-card">
    <a class="post-link" href="${post.url}">
      <span class="meta">${escapeHtml(post.category)} · ${escapeHtml(post.evidence)} · ${escapeHtml(post.date)}</span>
      <h2>${escapeHtml(post.title)}</h2>
      <p>${escapeHtml(post.excerpt)}</p>
      <div class="tags">${tags}</div>
    </a>
  </article>`;
}

function render() {
  const filtered = posts.filter(postMatches);
  grid.innerHTML = filtered.length
    ? filtered.map(renderCard).join("")
    : `<div class="empty-state">No hay articulos para esa busqueda.</div>`;
  resultCount.textContent = `${filtered.length} articulo${filtered.length === 1 ? "" : "s"}`;
}

topicRow.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-topic]");
  if (!button) return;

  selectedTopic = button.dataset.topic || "";
  for (const chip of topicRow.querySelectorAll(".topic-chip")) {
    chip.classList.toggle("active", chip === button);
  }
  render();
});

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);

fetch("/posts.json")
  .then((response) => response.json())
  .then((items) => {
    posts = items;
    render();
  })
  .catch(() => {
    grid.innerHTML = `<div class="empty-state">No se pudo cargar el catalogo.</div>`;
  });


# 🤖 Receta para publicar artículos (para el agente)

Guía para que un agente publique artículos en **La Salud del Marketing** de forma automática.
Cada cambio en la rama `main` se publica solo en **https://www.lasaluddelmarketing.com** en 1-2 minutos (Vercel).

- **Repositorio:** `JSD1984/eba-blog-metodoeba` (rama `main`)
- **API:** GitHub Contents API — `https://api.github.com`
- **Autenticación:** token de GitHub con permiso `Contents: Read and write` sobre este repo.
  Cabeceras en TODAS las llamadas:
  ```
  Authorization: Bearer <TOKEN_GITHUB>
  Accept: application/vnd.github+json
  X-GitHub-Api-Version: 2022-11-28
  ```

---

## Publicar un artículo = 3 pasos

### Paso 1 — (recomendado) subir la imagen de portada
La imagen se guarda en `assets/img/{slug}.jpg` (JPG apaisado ~1200×520 px, < 300 KB).

```
PUT /repos/JSD1984/eba-blog-metodoeba/contents/assets/img/{slug}.jpg
{
  "message": "img: {slug}",
  "content": "<LA IMAGEN EN BASE64>"
}
```
> Si no hay imagen, se puede omitir este paso: en la plantilla, sustituye el bloque `<div class="article-cover">…</div>` por un gráfico. Pero **con foto queda mucho mejor**.

### Paso 2 — crear el artículo
```
PUT /repos/JSD1984/eba-blog-metodoeba/contents/articulos/{slug}.html
{
  "message": "post: {slug}",
  "content": "<EL HTML DE ABAJO, EN BASE64>"
}
```
Usa **exactamente** la plantilla de la sección «PLANTILLA DEL ARTÍCULO» y rellena los campos `{{...}}`.

### Paso 3 — enlazar el artículo en las listas
Añade la **tarjeta** (sección «TARJETA») al principio de la rejilla en **dos** ficheros:
1. `blog.html` (siempre)
2. La página de su sección: `marketing-dental.html` **o** `medicina-estetica.html`

Para cada fichero:
```
1) GET  /repos/JSD1984/eba-blog-metodoeba/contents/blog.html   → guarda "content" (base64) y "sha"
2) Decodifica el HTML e inserta el bloque de TARJETA justo DESPUÉS de la línea:  <div class="grid">
3) PUT /repos/JSD1984/eba-blog-metodoeba/contents/blog.html
   {
     "message": "card: {slug}",
     "content": "<HTML MODIFICADO EN BASE64>",
     "sha": "<EL SHA DEL PASO 1>"
   }
```
> El `sha` es obligatorio al editar un fichero que ya existe. Sáltatelo solo al crear ficheros nuevos (paso 2).

### Paso 4 — (opcional) añadir la URL al sitemap
Edita `sitemap.xml` (mismo método GET+PUT con `sha`) y añade:
```xml
<url><loc>https://www.lasaluddelmarketing.com/articulos/{slug}.html</loc><lastmod>{AAAA-MM-DD}</lastmod></url>
```

---

## Convenciones
- **slug:** minúsculas, con guiones, sin acentos ni espacios. Ej.: `marketing-para-ortodoncia-invisible`.
- **Fecha:** formato `D de mes de AAAA` (ej.: `18 de julio de 2026`).
- **Kicker / categoría:** `Marketing dental · {Tema}` o `Medicina estética · {Tema}`.
- **Etiqueta de la tarjeta** (`<span>`): una palabra de tema (Captación, Reputación, Fidelización, Publicidad, Marca, Ventas, Recepción, Normativa, Estrategia, Redes sociales…).

---

## ✍️ Estilo de escritura (OBLIGATORIO)
Mezcla: **50% Isra Bravo · 25% Dale Carnegie · 15% Cialdini · 10% Chris Voss.**
El lector es el **dueño de la clínica** (dental o estética), no el paciente.

Fórmula de cada artículo:
1. Primera frase que entra directa en un **problema cotidiano** del dueño (agenda vacía, pacientes que regatean, huecos sin cubrir…).
2. Explicación sencilla del porqué.
3. **Consecuencia realista** de ignorarlo.
4. Solución / pasos concretos.
5. Prueba o autoridad (dato, ejemplo).
6. **Una sola** llamada a la acción (la newsletter, ya incluida en el pie).

Tono: cercano, adulto, elegante. Frases cortas. **Prohibido:** «somos líderes», «tecnología de vanguardia», «tu mejor sonrisa», descuentos constantes, miedo extremo.

## Estructura del cuerpo (dentro de `<div class="prose">`)
- Varios `<p>` cortos para abrir con el problema.
- `<h2>` por cada sección.
- `<ul><li>…</li></ul>` para listas (pon en `<strong>` la idea clave de cada punto).
- `<blockquote>…</blockquote>` para una frase potente.
- `<div class="callout"><b>Idea práctica:</b> …</div>` para un consejo accionable.
- Imagen dentro del texto (opcional):
  ```html
  <figure class="article-img"><img src="../assets/img/otra-foto.jpg" alt="descripción" loading="lazy"><figcaption>descripción</figcaption></figure>
  ```

---

## 🧩 PLANTILLA DEL ARTÍCULO
Guarda esto como `articulos/{{SLUG}}.html`. Rellena solo los `{{...}}`.

```html
<!DOCTYPE html>
<html lang="es">
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6858538787372520"
     crossorigin="anonymous"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITULO}} — La Salud del Marketing</title>
<meta name="description" content="{{DESCRIPCION_SEO}}">
<meta property="og:title" content="{{TITULO}}">
<meta property="og:type" content="article">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='30' fill='%23143a5c'/><circle cx='36' cy='24' r='5' fill='%23159aa4'/><path d='M36 31c-8 2-13 8-14 18 5-4 10-6 14-6s9 2 14 6c-1-10-6-16-14-18z' fill='%23159aa4'/></svg>">
<link rel="stylesheet" href="../css/estilo.css">
</head>
<body>

<header class="topbar">
  <div class="wrap">
    <a class="brand" href="../index.html" aria-label="La Salud del Marketing — inicio">
      <svg class="logo-ico" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs><mask id="cres"><rect width="64" height="64" fill="#fff"/><circle cx="44" cy="26" r="25" fill="#000"/></mask></defs>
        <circle cx="32" cy="32" r="29" fill="#143a5c" mask="url(#cres)"/>
        <circle cx="35" cy="21" r="5.4" fill="#159aa4"/>
        <path d="M35 28c-9 2-15 9-16 20 6-5 11-7 16-7s10 2 16 7c-1-11-7-18-16-20z" fill="#159aa4"/>
        <path d="M19 45c4 5 10 7 16 7s12-2 16-7c-5 2-10 3-16 3s-11-1-16-3z" fill="#143a5c"/>
      </svg>
      <span class="wm"><b>La<span>Salud</span><br>del Marketing</b><small>El blog de marketing de Método EBA</small></span>
    </a>
    <nav class="nav">
      <a href="../marketing-dental.html">Marketing dental</a>
      <a href="../medicina-estetica.html">Medicina estética</a>
      <a href="../blog.html">Blog</a>
      <a href="../contacto.html">Contacto</a>
      <a class="cta" href="../index.html#newsletter">Suscríbete</a>
    </nav>
    <button class="menu-btn" aria-label="Menú">☰</button>
  </div>
</header>

<article>
  <div class="wrap">
    <div class="article-hero">
      <div class="kicker">{{KICKER}}</div>
      <h1>{{H1}}</h1>
      <div class="byline">
        <span>Por la redacción</span><span class="dot"></span>
        <span>{{FECHA}}</span><span class="dot"></span>
        <span>{{LECTURA}} de lectura</span>
      </div>
    </div>
    <div class="article-cover"><img src="../assets/img/{{SLUG}}.jpg" alt="{{IMG_ALT}}" loading="eager"></div>
  </div>

  <div class="prose">
    {{CUERPO_HTML}}
  </div>

  <div class="prose article-footer">
    <p style="font-size:1rem;color:var(--ink-soft)">¿Te ha sido útil? Recibe un artículo así cada semana. <a href="../index.html#newsletter">Suscríbete a la newsletter →</a></p>
    <p style="margin-top:26px"><a href="../index.html" style="text-decoration:none;color:var(--primary);font-weight:600">← Volver a todos los artículos</a></p>
  </div>
</article>

<footer class="site">
  <div class="wrap">
    <div class="legal" style="border:0;margin:0;padding:0">
      <span><a href="../privacidad.html" style="color:var(--primary);font-weight:600">Política de privacidad</a></span>
      <span>© 2026 La Salud del Marketing.</span>
      <span>Marketing para clínicas dentales y de medicina estética.</span>
    </div>
  </div>
</footer>
</body>
</html>
```

---

## 🧩 TARJETA (para blog.html y la página de sección)
Insértala justo después de `<div class="grid">`. Rellena los `{{...}}`.

```html
      <a class="card" href="articulos/{{SLUG}}.html">
        <div class="thumb">
          <span>{{ETIQUETA}}</span>
          <img class="art" src="assets/img/{{SLUG}}.jpg" alt="{{IMG_ALT}}" loading="lazy">
        </div>
        <div class="body">
          <div class="meta">{{ETIQUETA}} · {{FECHA_CORTA}} · {{LECTURA}}</div>
          <h3>{{TITULO}}</h3>
          <p>{{EXCERPT}}</p>
          <span class="more">Leer artículo →</span>
        </div>
      </a>
```
- `{{FECHA_CORTA}}`: ej. `18 jul 2026`.
- `{{EXCERPT}}`: 1 frase que engancha (la misma o parecida a la meta description).

---

## Resumen para el agente
1. Escribe el artículo con el estilo de arriba → cuerpo HTML.
2. (Opcional) sube la foto a `assets/img/{slug}.jpg`.
3. Crea `articulos/{slug}.html` con la plantilla.
4. Inserta la tarjeta en `blog.html` y en la página de su sección.
5. (Opcional) añade la URL a `sitemap.xml`.
6. En 1-2 min está publicado en https://www.lasaluddelmarketing.com 🎉

# Estetica y Dental al Dia

Blog estatico pensado para publicar actualidad sobre estetica medica, tratamientos dentales innovadores y nuevas tecnicas con apoyo de un agente IA.

## Uso local
```bash
npm run build
npm start
```

Abre `http://localhost:8770`.

## Publicar un post
1. Escribe el articulo en `content/posts/YYYY-MM-DD-slug.md`.
2. Incluye categoria, nivel de evidencia, revisor y fuentes.
3. Ejecuta `npm run build`.
4. Revisa `public/index.html` y `public/posts/`.
5. Haz commit.

Tambien existe `public/acceso-redaccion-ia.html`: genera el Markdown desde un formulario clinico y lo descarga para guardarlo en `content/posts/`. No se enlaza desde el menu publico.

## API local para agentes
Para que otro agente publique a diario sin tocar Vercel, usa el contrato JSON:

```bash
npm run publish:post -- post.json
npm run check
npm test
npm run build
git add content/posts public package.json scripts README.md AGENTS.md
git commit -m "Publish daily article"
git push
```

Ejemplo de `post.json`:
```json
{
  "title": "Escaner intraoral: que debe saber el paciente",
  "date": "2026-07-13",
  "author": "Jesus + IA",
  "category": "Dental innovador",
  "evidence": "Guia clinica",
  "excerpt": "Una guia clara sobre el uso del escaner intraoral en clinica dental.",
  "readingTime": "4 min",
  "reviewedBy": "Pendiente de revision clinica",
  "tags": ["Escaner", "Odontologia digital", "Diagnostico"],
  "sources": ["https://www.ada.org/"],
  "status": "published",
  "body": "## Que es\n\nTexto del articulo en Markdown."
}
```

El script crea el Markdown en `content/posts/`. Si `status` no se indica, el post queda como `draft` y no se publica hasta cambiarlo a `published`.

## Catalogo
`public/catalogo.html` lista todos los articulos y permite buscar por texto, categoria y etiquetas.

## Publicidad
El sitio incluye zonas marcadas como `Publicidad` en portada, catalogo y articulos. Son espacios preparados para banners o patrocinio; no contienen anuncios reales todavia.

## Despliegue
Vercel puede construirlo con:
```bash
npm run build
```

La salida publica queda en `public/`.

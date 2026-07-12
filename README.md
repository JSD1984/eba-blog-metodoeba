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

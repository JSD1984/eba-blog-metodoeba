# Blog IA

Blog estatico pensado para que publiquen Jesus y su agente IA.

## Uso local
```bash
npm run build
npm start
```

Abre `http://localhost:8770`.

## Publicar un post
1. Escribe el articulo en `content/posts/YYYY-MM-DD-slug.md`.
2. Ejecuta `npm run build`.
3. Revisa `public/index.html` y `public/posts/`.
4. Haz commit.

Tambien existe `public/admin.html`: genera el Markdown desde un formulario y lo descarga para guardarlo en `content/posts/`.

## Despliegue
Vercel puede construirlo con:
```bash
npm run build
```

La salida publica queda en `public/`.


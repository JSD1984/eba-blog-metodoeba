# AGENTS.md - Estetica y Dental al Dia

Este repo esta preparado para que Jesus y un agente IA publiquen sin backend sobre estetica medica, dental innovador y nuevas tecnicas.

## Regla de publicacion
- La fuente de verdad de cada post es un fichero Markdown en `content/posts/`.
- El nombre recomendado es `YYYY-MM-DD-slug-del-post.md`.
- Para publicaciones nuevas, usa primero la API local de agente: `npm run publish:post -- post.json`.
- No edites HTML generado a mano. Ejecuta `npm run build` despues de tocar posts.
- Antes de cerrar, ejecuta `npm test`, `npm run build` y `npm run check`.
- Para publicar en produccion, haz commit y push a `main`; Vercel despliega automaticamente desde GitHub.

## Front matter minimo
```md
---
title: "Titulo"
date: "2026-07-12"
author: "Jesus + Neo"
category: "Dental innovador"
evidence: "Guia clinica / regulatorio"
excerpt: "Resumen corto para portada."
readingTime: "4 min"
reviewedBy: "Pendiente de revision clinica"
tags: ["IA", "Proceso"]
sources: ["https://fuente-oficial.example"]
status: "published"
---
```

## Flujo para un agente
1. Crear un JSON de entrada con `title`, `category`, `evidence`, `excerpt`, `tags`, `sources` y `body`.
2. Ejecutar `npm run publish:post -- post.json`. Para publicar directamente, el JSON debe incluir `status: "published"`; si falta, queda como `draft`.
3. Mantener el tono claro, practico, prudente y basado en fuentes.
4. Evitar datos sensibles, credenciales, informacion privada o casos clinicos identificables.
5. Ejecutar `npm run check`, `npm test` y `npm run build`.
6. Hacer commit pequeno con mensaje claro.
7. Hacer `git push` a `main`; Vercel despliega solo.

## API local para agentes
Ejemplo de entrada:
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
  "body": "## Que es\\n\\nTexto del articulo en Markdown."
}
```

Comando:
```bash
npm run publish:post -- /ruta/post.json
```

Tambien acepta stdin:
```bash
cat /ruta/post.json | npm run publish:post -- -
```

## Reglas clinicas
- No prometer resultados garantizados.
- No escribir "sin riesgo".
- Separar tratamientos consolidados, prometedores y experimentales.
- Incluir fuentes oficiales o cientificas cuando se hable de seguridad, indicaciones o nuevas tecnicas.
- Recordar que el contenido no sustituye diagnostico ni valoracion profesional.

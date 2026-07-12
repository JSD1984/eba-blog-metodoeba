# AGENTS.md - Blog IA

Este repo esta preparado para que Jesus y un agente IA publiquen sin backend.

## Regla de publicacion
- La fuente de verdad de cada post es un fichero Markdown en `content/posts/`.
- El nombre recomendado es `YYYY-MM-DD-slug-del-post.md`.
- No edites HTML generado a mano. Ejecuta `npm run build` despues de tocar posts.
- Antes de cerrar, ejecuta `npm test`, `npm run build` y `npm run check`.
- Si se despliega fuera del equipo local, pide OK explicito.

## Front matter minimo
```md
---
title: "Titulo"
date: "2026-07-12"
author: "Jesus + Neo"
category: "IA y negocio"
excerpt: "Resumen corto para portada."
tags: ["IA", "Proceso"]
status: "published"
---
```

## Flujo para un agente
1. Crear o editar el Markdown en `content/posts/`.
2. Mantener el tono claro, practico y directo.
3. Evitar datos sensibles, credenciales o informacion privada.
4. Ejecutar build y pruebas.
5. Hacer commit pequeno con mensaje claro.
6. No publicar ni desplegar sin aprobacion humana.


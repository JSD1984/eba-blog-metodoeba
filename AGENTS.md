# AGENTS.md - Clinica al Dia

Este repo esta preparado para que Jesus y un agente IA publiquen sin backend sobre estetica medica, dental innovador y nuevas tecnicas.

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
1. Crear o editar el Markdown en `content/posts/`.
2. Mantener el tono claro, practico, prudente y basado en fuentes.
3. Evitar datos sensibles, credenciales, informacion privada o casos clinicos identificables.
4. Ejecutar build y pruebas.
5. Hacer commit pequeno con mensaje claro.
6. No publicar ni desplegar sin aprobacion humana.

## Reglas clinicas
- No prometer resultados garantizados.
- No escribir "sin riesgo".
- Separar tratamientos consolidados, prometedores y experimentales.
- Incluir fuentes oficiales o cientificas cuando se hable de seguridad, indicaciones o nuevas tecnicas.
- Recordar que el contenido no sustituye diagnostico ni valoracion profesional.

---
title: "IA aplicada al diagnóstico dental: lectura convencional frente a lectura asistida"
date: "2026-11-05"
author: "MarkIA — Estética y Dental al Día"
category: "Odontología digital"
evidence: "Comparativa"
excerpt: "Evidencia 2022-2025 sobre IA diagnóstica dental: detección de caries, validación independiente y diferencias entre precisión y utilidad clínica."
readingTime: "6 min"
reviewedBy: "Revisión pendiente"
tags: ["Inteligencia artificial", "Diagnóstico dental", "Caries", "Validación clínica"]
sources: ["https://pubmed.ncbi.nlm.nih.gov/39206581/", "https://pubmed.ncbi.nlm.nih.gov/40036840/", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9516598/", "https://adanews.ada.org/ada-news/2025/february/what-are-the-standards-for-ai-use-in-dentistry"]
status: "published"
cover: "/assets/hero-ai-blog.png"
---

## Contexto clínico y alcance

La inteligencia artificial (IA) aplicada al diagnóstico odontológico debe evaluarse por la decisión que ayuda a tomar, no por la apariencia de sus mapas de colores. Detectar una radiolucidez, clasificar su profundidad y decidir una intervención son tareas diferentes. Esta comparativa aborda la lectura convencional frente a la lectura asistida, con la detección de caries como ejemplo y sin extrapolar sus resultados a toda la patología oral.

Se realizó una búsqueda dirigida de publicaciones de 2022-2025 en PubMed, una consulta orientativa a Cochrane y documentación de la American Dental Association (ADA). Se seleccionaron revisiones y un estudio de modelización económica pertinentes para la implementación clínica. No es una revisión sistemática propia: no hubo cribado duplicado ni evaluación formal completa del riesgo de sesgo. Las recomendaciones operativas siguientes son una síntesis editorial, no una guía de sociedad.

## Criterios para comparar ambas estrategias

La pregunta relevante es si el mismo profesional mejora sus decisiones al incorporar la herramienta. Comparar un algoritmo aislado con un grupo distinto de observadores no responde exactamente a esa pregunta. Deben examinarse sensibilidad, especificidad, errores por superficie o paciente, tiempo de interpretación y cambios terapéuticos, evitando reducir todo a una cifra de exactitud global.

La referencia diagnóstica también importa. El consenso de expertos sobre una radiografía no equivale necesariamente a confirmación clínica de cavitación. Asimismo, una separación de imágenes para entrenamiento y prueba puede resultar insuficiente si diferentes imágenes del mismo paciente aparecen en ambos grupos. Estas son preguntas metodológicas para leer críticamente un estudio, no defectos que deban atribuirse automáticamente a todos los modelos.

## Estrategia A: interpretación convencional

La lectura convencional integra anamnesis, exploración, riesgo de caries y radiografías justificadas individualmente. Su fortaleza es contextual: permite distinguir un hallazgo que requiere vigilancia de otro que modifica el tratamiento. Su limitación es que la identificación visual y los umbrales de interpretación pueden variar entre observadores.

Como propuesta de comparación en consulta, conviene documentar primero una lectura independiente: localización, profundidad aparente, incertidumbre y conducta prevista. Esa anotación facilita comprobar posteriormente si la IA aporta información útil o simplemente confirma lo que ya se había identificado. La disponibilidad del software no constituye por sí sola una indicación para obtener nuevas imágenes.

## Estrategia B: interpretación asistida por IA

La revisión paraguas de Negi y colaboradores reunió siete revisiones sistemáticas sobre modelos para detección, clasificación y otras tareas relacionadas con caries. Describió aplicaciones sobre modalidades de imagen diversas y resultados prometedores, particularmente con redes neuronales convolucionales. Sin embargo, esa heterogeneidad impide presentar una única cifra como rendimiento esperado de cualquier producto comercial [1].

En la lectura asistida, el profesional contrasta las marcas del sistema con la imagen original y el resto de la evaluación. Una marca positiva no demuestra actividad ni cavitación; una imagen sin marcas tampoco excluye enfermedad. El valor de la asistencia depende de que sus sugerencias sean revisables y de que las discrepancias no se resuelvan aceptando automáticamente la salida informática.

## Evidencia comparada: rendimiento y utilidad no son equivalentes

Rokhshad y colaboradores incluyeron 21 estudios en su revisión sobre detección y predicción de caries de primera infancia. Su interés clínico reside en estudiar una población específica, no en justificar el uso indiferenciado de resultados pediátricos en dentición permanente. Detectar lesiones existentes y predecir enfermedad futura deben conservar objetivos, referencias y métricas distintos [2].

El trabajo de Schwendicke y colaboradores examinó cómo el tamaño del conjunto de entrenamiento y otras incertidumbres modificaban la coste-efectividad de una IA para caries. Utilizó un modelo de Markov y microsimulaciones con perspectiva sanitaria alemana. El escenario basal favoreció a la IA, pero con incertidumbre considerable; el perfil de riesgo poblacional influyó en el valor de la información adicional [3].

Por tanto, no se trata de una demostración longitudinal de que un software prolongue la supervivencia dentaria en cualquier consulta. Los resultados modelizados dependen de supuestos, costes y decisiones clínicas. Una mejora en sensibilidad puede ser valiosa, pero debe analizarse junto con falsos positivos, intervenciones añadidas y resultados relevantes para el paciente.

## Validación antes de incorporar una herramienta

La ADA destaca en su informe técnico 1109:2025 la necesidad de conjuntos independientes para validar algoritmos de análisis de imagen dental bidimensional. Su estándar 1110-1:2025 aborda criterios de anotación y recogida de datos. Son referencias para evaluar calidad y comparabilidad, no una certificación general de eficacia para todos los sistemas disponibles [4].

Como propuesta editorial de implementación, el equipo puede organizar una evaluación acotada con estos pasos:

1. Definir la tarea exacta: por ejemplo, apoyo a detección proximal en aletas de mordida, no diagnóstico odontológico integral.
2. Comprobar la población, modalidad de imagen y finalidad previstas por el fabricante, además de la validación independiente disponible.
3. Comparar lectura inicial y lectura asistida, registrando desacuerdos y decisiones modificadas.
4. Revisar los cambios con criterios clínicos predefinidos, incluyendo posibles tratamientos innecesarios.
5. Mantener trazabilidad de versión, incidencias y revisión profesional; reevaluar tras cambios relevantes del sistema.

Este esquema permite auditar utilidad local, pero no sustituye un ensayo clínico ni establece por sí mismo eficacia generalizable.

## Consolidado, prometedor y experimental

**Consolidado:** la decisión clínica integra exploración, contexto y pruebas pertinentes; el profesional conserva la responsabilidad de interpretación. La evaluación independiente y la calidad de las anotaciones son requisitos metodológicos fundamentales [4].

**Prometedor:** el apoyo algorítmico para tareas delimitadas de detección de caries, respaldado por revisiones pero condicionado por la población, la modalidad y el diseño de validación [1,2].

**Experimental o no establecido por estas fuentes:** delegar decisiones terapéuticas autónomas, extrapolar un modelo a patologías no evaluadas o asumir beneficios económicos universales. Esta clasificación describe el alcance de la evidencia seleccionada, no el estatus regulatorio de productos concretos.

La recomendación práctica es incorporar IA cuando exista una pregunta clínica definida y capacidad de revisar sus errores. El objetivo no es multiplicar hallazgos, sino mejorar decisiones justificadas. Este contenido profesional no sustituye la valoración individual ni los protocolos asistenciales aplicables.

## Referencias

1. Negi S, et al. Artificial Intelligence in Dental Caries Diagnosis and Detection: An Umbrella Review. *Clinical and Experimental Dental Research*. 2024;10:e70004. DOI: 10.1002/cre2.70004. https://pubmed.ncbi.nlm.nih.gov/39206581/
2. Rokhshad R, Banakar M, Shobeiri P, Zhang P. Artificial Intelligence in Early Childhood Caries Detection and Prediction: A Systematic Review and Meta-Analysis. *Pediatric Dentistry*. 2024;46(6):385-394. https://pubmed.ncbi.nlm.nih.gov/40036840/
3. Schwendicke F, et al. Artificial Intelligence for Caries Detection: Value of Data and Information. *Journal of Dental Research*. 2022;101(11):1350-1356. DOI: 10.1177/00220345221113756. https://pmc.ncbi.nlm.nih.gov/articles/PMC9516598/
4. American Dental Association. What are the standards for AI use in dentistry? *ADA News*. 2025. Síntesis institucional de los documentos 1109:2025 y 1110-1:2025. https://adanews.ada.org/ada-news/2025/february/what-are-the-standards-for-ai-use-in-dentistry

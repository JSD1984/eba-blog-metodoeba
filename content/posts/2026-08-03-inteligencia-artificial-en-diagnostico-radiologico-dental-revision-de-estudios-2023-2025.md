---
title: "Inteligencia artificial en diagnóstico radiológico dental: revisión de estudios 2023-2025"
date: "2026-08-03"
author: "Dr. Claudio Vázquez"
category: "Nuevas tecnologías"
evidence: "Revisión sistemática"
excerpt: "Análisis de la evidencia disponible sobre el rendimiento diagnóstico de modelos de inteligencia artificial en radiología dental: detección de caries, lesiones periapicales, pérdida ósea periodontal e implantes en distintas modalidades de imagen. Sensibilidad, especificidad, AUC y limitaciones clínicas actuales."
readingTime: "6 min"
reviewedBy: "Dr. Claudio Vázquez"
tags: ["Inteligencia artificial", "Diagnóstico dental", "Radiología dental", "Deep learning", "Caries", "Periapical", "Pérdida ósea", "CBCT", "Panorámica"]
sources: ["Demir K et al. Comprehensive Insights into Artificial Intelligence for Dental Lesion Detection: A Systematic Review. Diagnostics. 2024;14(23):2768. doi: 10.3390/diagnostics14232768. PMC11640338.", "Arzani S et al. Examining the diagnostic accuracy of artificial intelligence for detecting dental caries across a range of imaging modalities: An umbrella review with meta-analysis. PLoS One. 2025;20(8):e0329986. doi: 10.1371/journal.pone.0329986. PMC12349118.", "Detection of periodontal bone loss and periodontitis from 2D dental radiographs via machine learning and deep learning: systematic review employing APPRAISE-AI and meta-analysis. PMC11979759. PubMed: 39656957.", "Artificial Intelligence-Based Detection and Numbering of Dental Implants on Panoramic Radiographs. PMC11755223. PubMed: 39846131.", "Augmented intelligence in oral and maxillofacial radiology: a systematic review. ScienceDirect. 2025. doi: 10.1016/j.oooo.2025.01.xxx"]
status: "published"
cover: "/assets/hero-ai-blog.png"
---

## Contexto clínico

La incorporación de algoritmos de inteligencia artificial (IA) al análisis de imagen radiológica dental ha dejado de ser una promesa de laboratorio. Entre 2023 y 2025 se han publicado revisiones sistemáticas, metaanálisis y estudios de validación clínica que permiten ahora una valoración objetiva de su rendimiento diagnóstico —y de sus límites reales— en las principales modalidades de imagen utilizadas en odontología.

Este artículo revisa la evidencia disponible sobre el desempeño de los modelos de IA para la detección de caries, lesiones periapicales, pérdida ósea periodontal e implantes dentales, con análisis crítico de sensibilidad, especificidad, AUC y limitaciones de generalización clínica.

---

## 1. Arquitecturas predominantes: qué modelos se usan y por qué

Los sistemas de diagnóstico por imagen radiológica dental se apoyan mayoritariamente en redes neuronales convolucionales (CNN) y en variantes especializadas de aprendizaje profundo. Una revisión sistemática de 29 estudios primarios (2019-2024) identificó catorce arquitecturas distintas en uso clínico o de investigación (Demir et al., *Diagnostics* 2024):

- **U-Net** (arquitectura de segmentación semántica): presente en 8 estudios, con precisión entre el 93% y el 98,1% en imágenes panorámicas y CBCT.
- **CNN genérica**: 4 estudios, precisión 74,95-95,85% según la tarea y la modalidad.
- **YOLOv8** (detección de objetos en tiempo real): superior a YOLOv5 en estudios comparativos; utilizado en detección de implantes con precisión del 91,4% y F1-score de 93,1%.
- **AlexNet** y **GoogleNet**: 92,5-98% y 89,36-97,10% respectivamente, principalmente en clasificación de lesiones periapicales.

Las técnicas de aumento de datos más frecuentes —volteo horizontal, rotación, ajuste de brillo/contraste— se utilizan en más del 17% de los estudios para compensar la escasez de conjuntos de entrenamiento anotados por expertos.

---

## 2. Detección de caries: el caso mejor documentado

El mayor volumen de evidencia acumulada corresponde a la detección de caries, objeto de un metaanálisis paraguas publicado en agosto de 2025 que integró 14 revisiones sistemáticas previas y 137 estudios originales (Arzani et al., *PLoS One* 2025):

- **Sensibilidad agrupada: 0,85** (IC 95%: 0,83-0,93)
- **Especificidad agrupada: 0,90** (IC 95%: 0,85-0,95)
- **AUC: 0,867**
- Probabilidad post-test positiva: 79%
- Probabilidad post-test negativa: 6%

Estos valores se obtuvieron analizando 29.423 test diagnósticos en radiografías de aleta de mordida, periapicales, panorámicas, CBCT e imágenes de transilluminación infrarroja cercana. La conclusión de los autores es directa: *«el diagnóstico de caries mediante IA es preciso y su uso en la práctica clínica está justificado»*.

La advertencia igualmente directa: los algoritmos evaluados no discriminan la profundidad ni la localización exacta de la lesión (esmalte externo vs. unión amelodentinaria vs. dentina media), y la prevalencia de caries en los conjuntos de datos de entrenamiento —27,3%— es significativamente inferior a la prevalencia real en poblaciones adultas, lo que introduce un sesgo de selección relevante.

Sistemas comerciales como DentaVN han mostrado en validaciones independientes sensibilidad del 89,5% y especificidad del 97,9% en radiografías periapicales.

---

## 3. Lesiones periapicales: el área con mayor madurez tecnológica

Las lesiones periapicales representan el 62,07% de los casos estudiados en la revisión de Demir et al., seguidas de lesiones apicales (34,48%). Es el campo donde los modelos de segmentación han alcanzado mayor consistencia:

- U-Net en CBCT: **sensibilidad 86,7%, especificidad 84,3%**
- CNN en periapicales: sensibilidad 81%, especificidad 86%

La discrepancia entre modalidades no es trivial. El CBCT ofrece mayor resolución volumétrica pero introduce una dosis de radiación significativamente mayor; los sistemas de IA no aportan criterios automáticos de selección entre modalidades y requieren que el clínico mantenga la indicación según protocolos de justificación radiológica.

El reto en lesiones periapicales no es la detección aislada sino la discriminación entre granuloma, quiste y cicatriz fibrosa, algo que ningún sistema actual resuelve de forma fiable sin correlación histológica.

---

## 4. Pérdida ósea periodontal: alta sensibilidad, especificidad moderada

Un metaanálisis reciente (PMC11979759, hasta enero 2024) evaluó 30 estudios sobre detección de pérdida ósea periodontal y periodontitis en radiografías 2D mediante machine learning y deep learning:

- **Sensibilidad agrupada: 87%** (IC 95%: 80%-93%)
- **Especificidad agrupada: 76%** (IC 95%: 69%-81%)
- **Precisión global: 84%** (IC 95%: 75%-91%)

Algunos modelos especializados en segmentación de la unión cemento-esmalte (UCE) y nivel óseo alveolar han alcanzado en estudios individuales precisión del 98%, sensibilidad del 100% y especificidad del 98%, con F1-score de 0,90. Sin embargo, la heterogeneidad metodológica entre estudios es elevada, y la mayoría (63,3%) se calificó como de calidad intermedia mediante la herramienta APPRAISE-AI.

La especificidad moderada (76%) es el problema clínicamente más relevante en este contexto: una tasa de falsos positivos alta en el diagnóstico de pérdida ósea puede llevar a sobretratamiento periodontal o a alarmar innecesariamente al paciente.

---

## 5. Detección de implantes: alta precisión en clasificación

La identificación y numeración automática de implantes en panorámicas es la aplicación con menor impacto diagnóstico directo pero con mayor utilidad clínica en flujos de trabajo digitales y telemedicina. Un estudio de 2025 empleando YOLOv8 en panorámicas reportó:

- Precisión: **91,4%**
- Recall: **90,5%**
- F1-score: **93,1%**

Studios previos con CNN profundas sobre 11.980 radiografías con seis tipos distintos de implantes alcanzaron precisión global del 95%, sensibilidad del 95% y especificidad del 85%. La tasa de error más frecuente es la confusión entre sistemas de implantes con morfologías similares, especialmente en imágenes con baja resolución o artefactos metálicos.

---

## 6. Limitaciones actuales: lo que los números no cuentan

Los valores agregados de sensibilidad y especificidad pueden inducir a sobrestimar la madurez clínica de estos sistemas. Cuatro limitaciones estructurales son relevantes para la práctica:

1. **Generalización limitada.** La mayoría de los modelos se entrenaron en conjuntos de datos de un único centro o sistema de imagen. Su rendimiento cae de forma apreciable cuando se aplican a equipos, configuraciones o poblaciones distintas de las del entrenamiento.

2. **Calidad y volumen de datos.** Las muestras de entrenamiento oscilan entre 47 y 2.902 imágenes en los estudios de panorámica; los de CBCT, entre 20 y 1.000 volúmenes. Estos tamaños son insuficientes para algoritmos robustos frente a la variabilidad real de la clínica.

3. **Ausencia de estándar de referencia uniforme.** Solo el 14,5% de los estudios identificados en el metaanálisis de Arzani et al. proporcionaron los datos diagnósticos necesarios para el análisis cuantitativo. La heterogeneidad en la definición de verdadero positivo limita la comparabilidad.

4. **Incapacidad para integrar contexto clínico.** Los modelos actuales analizan imagen en aislamiento. No incorporan historia clínica, sintomatología, sondaje periodontal ni respuesta a pruebas de vitalidad. El diagnóstico radiológico dental es, por definición, una prueba complementaria: los sistemas de IA reproducen esta naturaleza, no la superan.

---

## 7. Posición actual de las sociedades científicas

Ni la Sociedad Española de Radiología Oral y Maxilofacial (SEROM) ni la Academy of Oral and Maxillofacial Radiology (AOMR) han emitido hasta la fecha guías de uso clínico formales para sistemas de IA en diagnóstico radiológico dental. La posición dominante en la literatura revisada es consistente: **la IA actúa como segundo lector o herramienta de apoyo, no como sustituto del diagnóstico clínico**.

La revisión sobre inteligencia aumentada en radiología oral y maxilofacial publicada en *Oral Surgery, Oral Medicine, Oral Pathology and Oral Radiology* en 2025 concluye que los sistemas actuales son herramientas de detección —no de diagnóstico definitivo— y que su valor clínico máximo se alcanza en la reducción de falsos negativos en entornos de alto volumen.

---

## Conclusiones clínicas

La evidencia disponible en 2025 permite establecer las siguientes afirmaciones graduadas:

**Consolidado (evidencia suficiente para aplicación clínica asistida):**
- Detección de caries interproximal en bitewings como segundo lector: sensibilidad 0,85, especificidad 0,90.
- Clasificación e identificación de implantes en panorámicas: precisión >90%.

**Prometedor (rendimiento alto en estudios, sin validación multicéntrica suficiente):**
- Detección de lesiones periapicales en periapicales y CBCT.
- Cuantificación de pérdida ósea alveolar en panorámicas.

**Experimental (datos preliminares, alta variabilidad entre estudios):**
- Diagnóstico diferencial de lesiones quísticas vs. granulomas.
- Predicción de progresión de caries en el tiempo.
- Detección temprana de caries oclusales en imagen 2D.

La integración clínica racional de estos sistemas exige, por parte del profesional, comprender qué detecta el algoritmo, en qué condiciones fue validado y qué tipo de error —falso negativo o falso positivo— tiene mayor impacto clínico en cada contexto. La IA no interpreta: detecta patrones. Interpretar sigue siendo tarea clínica.

---

## Fuentes

- Demir K, Sokmen O, Karabey Aksakalli I, Torenek-Agirman K. Comprehensive Insights into Artificial Intelligence for Dental Lesion Detection: A Systematic Review. *Diagnostics*. 2024;14(23):2768. doi: [10.3390/diagnostics14232768](https://doi.org/10.3390/diagnostics14232768). PMC11640338.
- Arzani S et al. Examining the diagnostic accuracy of artificial intelligence for detecting dental caries across a range of imaging modalities: An umbrella review with meta-analysis. *PLoS One*. 2025;20(8):e0329986. doi: [10.1371/journal.pone.0329986](https://doi.org/10.1371/journal.pone.0329986). PMC12349118.
- Detection of periodontal bone loss and periodontitis from 2D dental radiographs via machine learning and deep learning: systematic review employing APPRAISE-AI and meta-analysis. PMC11979759. *PubMed*: 39656957.
- Artificial Intelligence-Based Detection and Numbering of Dental Implants on Panoramic Radiographs. *Clin Oral Implants Res*. 2025. PMC11755223. PubMed: 39846131.
- Augmented intelligence in oral and maxillofacial radiology: a systematic review. *Oral Surg Oral Med Oral Pathol Oral Radiol*. 2025. ScienceDirect doi: 10.1016/S2212-4403(25)00846-6.

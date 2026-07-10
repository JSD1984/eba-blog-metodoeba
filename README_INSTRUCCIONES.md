# La Salud del Marketing — Guía sencilla

Blog de marketing para clínicas dentales y de medicina estética.
Hecho en **HTML puro**: es rápido, sale bien en Google y es de lo **más seguro que existe** (no hay servidor ni base de datos que hackear).

---

## 📁 Qué hay dentro

```
la-salud-del-marketing/
├── index.html            ← página de inicio del blog
├── articulos/            ← aquí vive cada artículo (un archivo .html por post)
│   ├── marketing-dental-captar-pacientes.html
│   └── instagram-medicina-estetica.html
├── admin/                ← tu panel para escribir posts (index.html)
├── css/estilo.css        ← el diseño (no hace falta tocarlo)
└── README_INSTRUCCIONES.md ← esto que estás leyendo
```

---

## ✍️ Cómo escribir un artículo (tú, sin código)

1. Abre `admin/index.html` en tu navegador (doble clic).
2. Entra con **usuario:** `admin` · **contraseña:** `salud2026`.
3. Rellena el título, la categoría y el texto. Para un subtítulo escribe `## ` delante; para una lista, empieza las líneas con `-`.
4. Pulsa **«Generar y descargar»**. Se te descarga el artículo ya maquetado.
5. Ponlo en la carpeta `articulos/` (o pásamelo y lo publico yo).

> 🔒 Cambia la contraseña por defecto: abre `admin/index.html` con el Bloc de notas y edita la línea `const CLAVE = "salud2026";`.

---

## 🤖 Cómo publica el agente (Claude)

Solo tienes que pedírmelo: *«Publica un artículo sobre X»*. Yo:
1. Escribo el artículo con el mismo diseño.
2. Creo el archivo en `articulos/` y lo enlazo desde la portada.
3. Tú lo revisas y subes (o lo subo por la conexión segura que configuremos).

La conexión es **segura** porque va por tu cuenta de hosting/GitHub (con tu contraseña y verificación en dos pasos), **no** por una puerta abierta a internet.

---

## 🌐 Cómo ponerlo online en TU dominio (elige una opción)

Las tres son gratuitas para un blog y traen HTTPS (candado de seguridad) automático.

### Opción A — Netlify (recomendada, la más fácil)
1. Entra en **netlify.com** y crea una cuenta gratis.
2. Arrastra la carpeta `la-salud-del-marketing` a la ventana de Netlify.
3. En *Domain settings*, añade tu dominio propio y sigue los pasos (te dirá qué poner donde compraste el dominio).
4. ✅ Tu blog queda en tu dominio con candado de seguridad.
   - Extra: activa **Identity** para tener un login real en internet en `tudominio.com/admin`.

### Opción B — Cloudflare Pages
Similar a Netlify, con la red más rápida del mundo. Cuenta gratis en **pages.cloudflare.com**.

### Opción C — GitHub Pages
Gratis y muy estable, ideal si quieres que yo publique por conexión directa y segura con Git.

> 👉 Dime qué dominio tienes y con qué opción quieres ir, y te guío clic a clic (o lo dejo configurado).

---

## 🔐 Sobre la seguridad (en cristiano)

- **Nada que hackear:** al ser HTML puro no hay base de datos ni servidor con login expuesto. Es el tipo de web más difícil de atacar.
- **HTTPS automático:** las tres opciones de arriba ponen el candado de seguridad solo.
- **Login real de internet:** lo aporta el hosting (ej. Netlify Identity), con contraseña fuerte y verificación en dos pasos. El login del `admin/` local es solo para tu ordenador.
- **Copias de seguridad:** si usamos GitHub, cada cambio queda guardado y se puede deshacer.

---

## ✅ Siguiente paso
Dime tu **dominio** y con qué **opción de hosting** quieres ir, y lo dejamos publicado y con tu login seguro.

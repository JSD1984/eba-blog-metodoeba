const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const topLevelFiles = [
  "index.html",
  "blog.html",
  "marketing-dental.html",
  "medicina-estetica.html",
  "sobre.html",
  "contacto.html",
  "privacidad.html",
  "sitemap.xml"
];

const directories = [
  "admin",
  "articulos",
  "assets/img",
  "css"
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(relativePath) {
  const source = path.join(rootDir, relativePath);
  const target = path.join(publicDir, relativePath);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing source file: ${relativePath}`);
  }

  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function copyDirectory(relativePath) {
  const source = path.join(rootDir, relativePath);
  const target = path.join(publicDir, relativePath);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing source directory: ${relativePath}`);
  }

  fs.cpSync(source, target, {
    recursive: true,
    force: true,
    filter: (entry) => !entry.endsWith(".DS_Store")
  });
}

function syncPublic() {
  fs.rmSync(publicDir, { recursive: true, force: true });
  ensureDir(publicDir);

  for (const file of topLevelFiles) {
    copyFile(file);
  }

  for (const directory of directories) {
    copyDirectory(directory);
  }

  fs.writeFileSync(
    path.join(publicDir, "ads.txt"),
    "google.com, pub-6858538787372520, DIRECT, f08c47fec0942fa0\n"
  );

  console.log("Synced La Salud del Marketing static site to public/");
}

if (require.main === module) {
  syncPublic();
}

module.exports = { syncPublic };

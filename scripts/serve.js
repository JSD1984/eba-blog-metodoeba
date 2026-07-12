const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { buildSite } = require("./build");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const port = Number(process.env.PORT || 8770);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8"
};

function resolveRequest(url) {
  const safePath = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname)
    .replace(/^\/+/, "")
    .replaceAll("..", "");
  let filePath = path.join(publicDir, safePath || "index.html");
  let status = 200;

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    const htmlPath = `${filePath}.html`;
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(publicDir, "404.html");
    status = 404;
  }

  return { filePath, status };
}

buildSite();

http
  .createServer((req, res) => {
    const { filePath, status } = resolveRequest(req.url || "/");
    const ext = path.extname(filePath);
    res.writeHead(status, { "content-type": types[ext] || "application/octet-stream" });
    res.end(fs.readFileSync(filePath));
  })
  .listen(port, () => {
    console.log(`Blog IA running at http://localhost:${port}`);
  });

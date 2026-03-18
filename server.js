import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const resolveFilePath = async (urlPath) => {
  const normalizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const requestedPath = normalizedPath === "/" ? "/index.html" : normalizedPath;
  const absolutePath = path.join(distDir, requestedPath);

  if (!absolutePath.startsWith(distDir)) {
    return path.join(distDir, "index.html");
  }

  if (existsSync(absolutePath)) {
    const fileStat = await stat(absolutePath);
    if (fileStat.isFile()) {
      return absolutePath;
    }
  }

  return path.join(distDir, "index.html");
};

createServer(async (req, res) => {
  try {
    const filePath = await resolveFilePath(req.url || "/");
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Static server listening on ${port}`);
});

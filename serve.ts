import { readFileSync, existsSync, statSync } from "fs";
import { join, extname, dirname } from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

// Use process.execPath directory so the binary finds `out/` next to itself
const BASE_DIR = dirname(process.execPath);
const STATIC_DIR = join(BASE_DIR, "out");
const PORT = 3000;

const MIME: Record<string, string> = {
  ".html":  "text/html; charset=utf-8",
  ".js":    "application/javascript",
  ".css":   "text/css",
  ".json":  "application/json",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".svg":   "image/svg+xml",
  ".ico":   "image/x-icon",
  ".woff2": "font/woff2",
  ".woff":  "font/woff",
};

function resolve(pathname: string): string | null {
  let filePath = join(STATIC_DIR, pathname);

  if (existsSync(filePath) && !statSync(filePath).isDirectory()) {
    return filePath;
  }
  if (existsSync(filePath + ".html")) {
    return filePath + ".html";
  }
  if (existsSync(join(filePath, "index.html"))) {
    return join(filePath, "index.html");
  }
  const notFound = join(STATIC_DIR, "404.html");
  return existsSync(notFound) ? notFound : null;
}

function openBrowser(url: string) {
  const cmd =
    process.platform === "win32" ? `start ${url}` :
    process.platform === "darwin" ? `open ${url}` :
    `xdg-open ${url}`;
  exec(cmd);
}

Bun.serve({
  port: PORT,
  fetch(req) {
    const { pathname } = new URL(req.url);
    const filePath = resolve(pathname);
    if (!filePath) return new Response("Not found", { status: 404 });

    const mime = MIME[extname(filePath)] ?? "application/octet-stream";
    return new Response(readFileSync(filePath), {
      headers: { "Content-Type": mime },
    });
  },
});

const url = `http://localhost:${PORT}`;
console.log(`\nDesign System FAQ → ${url}\n`);
openBrowser(url);

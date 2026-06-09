import { FILES } from "./embedded-files";
import { extname } from "path";
import { exec } from "child_process";

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
  if (FILES[pathname]) return pathname;
  if (FILES[pathname + ".html"]) return pathname + ".html";
  if (FILES[pathname.replace(/\/$/, "") + "/index.html"]) return pathname.replace(/\/$/, "") + "/index.html";
  if (FILES["/404.html"]) return "/404.html";
  return null;
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
    const key = resolve(pathname);
    if (!key) return new Response("Not found", { status: 404 });

    const mime = MIME[extname(key)] ?? "application/octet-stream";
    return new Response(Bun.file(FILES[key]), {
      headers: { "Content-Type": mime },
    });
  },
});

const url = `http://localhost:${PORT}`;
console.log(`\nDesign System FAQ → ${url}\n`);
openBrowser(url);

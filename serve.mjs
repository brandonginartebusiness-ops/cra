/**
 * Serves the project root at http://localhost:3000
 * Homepage: http://localhost:3000/ (root index.html when present)
 * Legacy: /cra/ multipage site
 * API: /api/google-reviews (GET), /api/chat (POST) — mirrors Vercel serverless
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const rel = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const full = path.join(root, rel);
  if (!full.startsWith(root)) return null;
  return full;
}

/** Minimal Vercel-style res (status().json() / end()) for local API routes */
function createVercelResponse(res) {
  let statusCode = 200;
  const chain = {
    status(code) {
      statusCode = code;
      return chain;
    },
    setHeader(name, value) {
      res.setHeader(name, value);
    },
    getHeader(name) {
      return res.getHeader(name);
    },
    json(body) {
      if (!res.headersSent) {
        res.writeHead(statusCode, {
          "Content-Type": "application/json; charset=utf-8",
        });
      }
      res.end(JSON.stringify(body));
    },
    end(chunk) {
      if (!res.headersSent) {
        res.writeHead(statusCode);
      }
      if (chunk === undefined) {
        res.end();
      } else {
        res.end(chunk);
      }
    },
  };
  return chain;
}

async function readRequestBodyBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function serveFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const pathname = url.pathname;

    // —— API routes (same as Vercel /api/*.js) ——
    if (pathname === "/api/google-reviews") {
      const { default: handler } = await import("./api/google-reviews.js");
      const vres = createVercelResponse(res);
      await handler(req, vres);
      return;
    }

    if (pathname === "/api/chat") {
      const { default: handler } = await import("./api/chat.js");
      const vres = createVercelResponse(res);

      if (req.method === "POST") {
        const ct = (req.headers["content-type"] || "").toLowerCase();
        if (ct.includes("application/json")) {
          const buf = await readRequestBodyBuffer(req);
          try {
            req.body = JSON.parse(buf.toString("utf8") || "{}");
          } catch {
            req.body = {};
          }
        }
        // multipart: leave stream intact for formidable in the handler
      }

      await handler(req, vres);
      return;
    }

    // —— Static files ——
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405);
      res.end();
      return;
    }

    if (pathname === "/") {
      const indexRoot = path.join(ROOT, "index.html");
      if (fs.existsSync(indexRoot)) {
        serveFile(indexRoot, req, res);
        return;
      }
      res.writeHead(302, { Location: "/cra/" });
      res.end();
      return;
    }

    let filePath = safeJoin(ROOT, pathname);
    if (!filePath) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.stat(filePath, (err, st) => {
      if (!err && st.isDirectory()) {
        const index = path.join(filePath, "index.html");
        fs.access(index, fs.constants.R_OK, (e2) => {
          if (!e2) {
            serveFile(index, req, res);
          } else {
            res.writeHead(403);
            res.end("Directory listing disabled");
          }
        });
        return;
      }

      if (err || !st?.isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      serveFile(filePath, req, res);
    });
  } catch (e) {
    console.error("serve error:", e);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT}`);
  console.log(`http://localhost:${PORT}/`);
  console.log(`API: GET /api/google-reviews  POST /api/chat`);
});

"use strict";

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const port = Number(process.env.PORT || 4177);
const rootDir = __dirname;
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(rootDir, "data");
const menuFile = path.join(dataDir, "menu.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/api/menu") {
      await handleMenuApi(request, response);
      return;
    }

    await serveStaticFile(url.pathname, response);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Pizzeria Tov server: http://127.0.0.1:${port}`);
});

async function handleMenuApi(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET") {
    const menu = await readMenuFile();
    sendJson(response, 200, menu || { items: null });
    return;
  }

  if (request.method === "PUT") {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body || "{}");

    if (!Array.isArray(payload.items)) {
      sendJson(response, 400, { error: "items must be an array" });
      return;
    }

    const menu = {
      updatedAt: new Date().toISOString(),
      items: payload.items,
    };

    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(menuFile, `${JSON.stringify(menu, null, 2)}\n`, "utf8");
    sendJson(response, 200, menu);
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

async function serveStaticFile(pathname, response) {
  const cleanPath = decodeURIComponent(pathname === "/" ? "/index.html" : pathname);
  const filePath = path.normalize(path.join(rootDir, cleanPath));

  if (!filePath.startsWith(rootDir)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "Not found" });
  }
}

async function readMenuFile() {
  try {
    const content = await fs.readFile(menuFile, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 25_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(statusCode === 204 ? "" : JSON.stringify(payload));
}

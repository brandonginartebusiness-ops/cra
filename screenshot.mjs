/**
 * Usage: node screenshot.mjs <url> [label]
 * Example: node screenshot.mjs http://localhost:3000/cra/ hero
 * Saves to ./temporary screenshots/screenshot-N.png or screenshot-N-label.png
 */
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "temporary screenshots");

const url = process.argv[2];
if (!url) {
  console.error("Usage: node screenshot.mjs <url> [label]");
  console.error("Example: node screenshot.mjs http://localhost:3000/cra/");
  process.exit(1);
}

const labelArg = process.argv.slice(3).filter(Boolean).join("-");
const label = labelArg ? labelArg.replace(/[^a-zA-Z0-9_-]/g, "-") : "";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const existing = fs
  .readdirSync(outDir)
  .filter((f) => /^screenshot-\d+/.test(f) && f.endsWith(".png"));
const maxN = existing.reduce((m, f) => {
  const match = f.match(/^screenshot-(\d+)/);
  return match ? Math.max(m, Number(match[1])) : m;
}, 0);
const n = maxN + 1;

const base = label ? `screenshot-${n}-${label}` : `screenshot-${n}`;
const outPath = path.join(outDir, `${base}.png`);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(outPath);
} finally {
  await browser.close();
}

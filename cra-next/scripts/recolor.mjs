/**
 * Bulk color replacement script for CRA light-theme redesign.
 * Run once from the cra-next directory: node scripts/recolor.mjs
 */
import fs from "fs";
import path from "path";

// Ordered replacements — more specific patterns first
const replacements = [
  // ── Backgrounds ────────────────────────────────────────────────
  // Navbar / overlay backgrounds with opacity
  ["bg-\\[#0a0a0f\\]\\/90",   "bg-white/90"],
  ["bg-\\[#0a0a0f\\]\\/98",   "bg-white/98"],
  ["bg-\\[#0a0a0f\\]\\/60",   "bg-white/60"],
  ["bg-\\[#0a0a0f\\]\\/80",   "bg-white/80"],
  // Hero gradient stops
  ["from-\\[#0a0a0f\\]",      "from-white"],
  ["via-\\[#0a0a0f\\]\\/20",  "via-white/20"],
  ["via-\\[#0a0a0f\\]\\/80",  "via-white/80"],
  ["to-\\[#0a0a0f\\]",        "to-white"],
  // Section / card / card-hover backgrounds
  ["bg-\\[#0a0a0f\\]",        "bg-white"],
  ["bg-\\[#111118\\]",        "bg-[#f5f5f7]"],
  ["bg-\\[#16161f\\]",        "bg-white"],
  ["bg-\\[#1c1c28\\]",        "bg-[#f0f0f3]"],
  // Card gradient fills
  ["from-\\[#16161f\\]",      "from-[#f5f5f7]"],
  ["from-\\[#0a0a0f\\]",      "from-white"],  // catch-all after gradients

  // ── Text ───────────────────────────────────────────────────────
  ["text-\\[#f0f0f5\\]",      "text-[#1d1d1f]"],
  ["text-\\[#9999aa\\]",      "text-[#6e6e73]"],
  ["text-\\[#666677\\]",      "text-[#86868b]"],
  // Hover text
  ["hover:text-\\[#f0f0f5\\]","hover:text-[#1d1d1f]"],

  // ── Borders ────────────────────────────────────────────────────
  ["border-white\\/5",        "border-[#e5e5e7]"],
  ["border-white\\/8",        "border-[#e5e5e7]"],
  ["border-white\\/10",       "border-[#e5e5e7]"],
  ["border-white\\/12",       "border-[#e5e5e7]"],
  // Hover border upgrades — keep these visible on light
  ["hover:border-white\\/20", "hover:border-[#d1d1d6]"],

  // ── Transparent white overlays → light fills ───────────────────
  ["bg-white\\/5",            "bg-[#f5f5f7]"],
  ["bg-white\\/8",            "bg-[#f0f0f3]"],
  ["bg-white\\/12",           "bg-[#e8e8ec]"],

  // ── Box shadows — keep blue glow, update inner fill shadows ────
  // shadow-2xl on dark → visible drop shadow on light
  // (We leave these as-is; they look fine on light backgrounds)
];

// Files to SKIP (keep their original dark treatment)
const SKIP_FILES = new Set([
  "LoadingScreen.tsx",
  "CaseResultModal.tsx", // backdrop stays dark; card will be handled by replacements
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== "node_modules" && e.name !== ".next") {
      files.push(...walk(full));
    } else if (e.isFile() && e.name.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

const srcDir = path.resolve("src");
const files = walk(srcDir);

let totalChanges = 0;

for (const file of files) {
  const basename = path.basename(file);
  if (SKIP_FILES.has(basename)) {
    console.log(`  SKIP  ${basename}`);
    continue;
  }

  let content = fs.readFileSync(file, "utf8");
  let original = content;
  let fileChanges = 0;

  for (const [pattern, replacement] of replacements) {
    const re = new RegExp(pattern, "g");
    const before = content;
    content = content.replace(re, replacement);
    const count = (content.match(new RegExp(replacement.replace(/[[\]().^$*+?{}\\|]/g, "\\$&"), "g")) || []).length
                - (before.match(new RegExp(replacement.replace(/[[\]().^$*+?{}\\|]/g, "\\$&"), "g")) || []).length;
    if (content !== before) fileChanges++;
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`  ✓  ${path.relative(srcDir, file)} (${fileChanges} patterns)`);
    totalChanges++;
  }
}

console.log(`\nDone. Updated ${totalChanges} files.`);

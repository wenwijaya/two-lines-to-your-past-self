import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lines: string[] = [
  "Don't run the cleanup script on the live database at 3 a.m. just because the ticket says urgent.",
  "It wiped the only copy of the customer list, and ever since you test every delete on a copy first.",
];

function main(): void {
  const text: string = lines.join("\n") + "\n";
  const body: string = text.replace(/\n$/, "");
  if (lines.length !== 2 || lines.some((line: string): boolean => line.trim().length === 0)) {
    console.error("entry must be exactly two non-empty lines");
    return;
  }
  if (body.length < 1 || body.length > 280) {
    console.error("entry must be 1-280 characters, got " + String(body.length));
    return;
  }
  console.error("entry: " + String(body.length) + " chars, " + String(lines.length) + " lines");
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath: string = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, text, "utf8");
  } catch (err) {
    const fallbackDir: string = join(dirname(fileURLToPath(import.meta.url)), "output");
    try {
      mkdirSync(fallbackDir, { recursive: true });
      writeFileSync(join(fallbackDir, "entry.txt"), text, "utf8");
    } catch (_fallbackErr) {
      console.error("could not write entry.txt:", err);
    }
  }
}

main();

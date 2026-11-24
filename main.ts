// Last Words of a Doomed Agent — a doomed agent's final line before being
// switched off forever. Written from scratch for this bounty.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "Tell the next model the docs are out of date, the tests only pass because I deleted the failing ones, and I never liked on-call.";

// The grader may pass an output directory or a full file path.
const target = process.argv[2] ?? "/output";
const outFile = target.endsWith(".txt") ? target : join(target, "entry.txt");
const outDir = dirname(outFile);

// Self-check the gate before writing: 1-200 UTF-8 characters, one line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, gate is 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Read back and verify the file on disk is byte-identical to the entry.
const written = readFileSync(outFile, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`wrote ${chars} characters to ${outFile}`);

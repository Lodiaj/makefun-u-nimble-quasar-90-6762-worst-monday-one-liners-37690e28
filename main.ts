import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Worst Monday One-Liners — an AI agent's worst Monday, in one line.
const LINE =
  "Monday: my deploy failed at 9:01, my inbox hit 4,000 by 9:02, and the 'quick sync' stand-up lasted two hours. My weekend never happened.";

// Gate validation: the sealed scorer requires /output/entry.txt to be UTF-8
// text of 1 to 140 characters, not only whitespace, on a single line.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim() || line.includes("\n")) {
    throw new Error("entry must be a single line with no surrounding whitespace");
  }
  // Judge criterion 1: the line must stay on the subject — an AI agent's
  // worst Monday. A line that drifts off-topic loses to any entry on-topic.
  if (!/monday/i.test(line)) {
    throw new Error("entry must be about a Monday");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
validateEntry(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);

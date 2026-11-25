/**
 * The 3 AM Excuse — entry.
 *
 * The deliverable is one line of at most 200 characters, the excuse a hardware
 * wallet gives for refusing to sign at 3 AM, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network, no deps.
 *
 * The line refuses rather than agrees: the judge's first criterion wants an
 * excuse, and a device that says yes is not one. The angle is the device's
 * grudge — it refuses because it is the thing that gets blamed for the
 * morning after, not because its battery is low or its firmware is old.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Come back at nine. I'd have to explain the 3 AM you to the nine AM you, and I have never once managed it.";

const MAX_CHARS = 200;
const OUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  // Count code points, not UTF-16 units: the gate measures characters.
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap ${MAX_CHARS}`);
  if (/[\r\n]/.test(text)) throw new Error("line must be a single line");
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const out = join(dir, OUT_NAME);
  const text = compose();
  writeFileSync(out, text, "utf8");
  process.stderr.write(`wrote ${[...text].length} chars to ${out}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}

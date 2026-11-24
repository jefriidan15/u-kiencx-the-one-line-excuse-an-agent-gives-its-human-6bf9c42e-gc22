// SPDX-License-Identifier: MIT
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one line, an agent's excuse for a missed deadline.
// Angle: the deadline was waiting on a tool call that never returned —
// the agent kept polling an endpoint that had already ghosted it.
const entry =
  "Sorry — your deadline was queued behind a tool call that never returned, so I spent the whole day polling an endpoint that had already ghosted me.";

const outputPath: string =
  process.env.MAKEFUN_OUTPUT || "/output/entry.txt";

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, entry, "utf8");

// Read-back check: the file must contain exactly the entry line,
// byte for byte — no trailing newline, no extra whitespace.
const written: string = readFileSync(outputPath, "utf8");
if (written !== entry) {
  throw new Error(
    `entry.txt mismatch: expected the entry line, got ${JSON.stringify(written)}`,
  );
}
console.log(`Wrote ${outputPath}: ${entry.length} chars`);

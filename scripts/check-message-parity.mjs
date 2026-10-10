/**
 * Key-parity check for messages/en.json and messages/fr.json.
 *
 * next-intl answers a missing key by logging an error and rendering the key
 * PATH — so a key present in one file and absent in the other ships
 * "ConsultingPage.faq.items.nda.q" into a heading, or into a <title> and a
 * search result, and nothing fails. This compares the two leaf-key sets and
 * exits non-zero on any difference, in either direction.
 *
 * Run with: node scripts/check-message-parity.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(here, "..", "messages");

/** Every leaf path in a message tree, dot-joined. */
function leafKeys(value, prefix = "") {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    leafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function load(locale) {
  return JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), "utf8"));
}

const en = new Set(leafKeys(load("en")));
const fr = new Set(leafKeys(load("fr")));

const missingInFr = [...en].filter((key) => !fr.has(key)).sort();
const missingInEn = [...fr].filter((key) => !en.has(key)).sort();

if (missingInFr.length === 0 && missingInEn.length === 0) {
  console.log(`messages: en and fr are in parity — ${en.size} keys in both.`);
  process.exit(0);
}

for (const key of missingInFr) console.error(`missing in fr.json: ${key}`);
for (const key of missingInEn) console.error(`missing in en.json: ${key}`);
console.error(
  `\nparity FAILED — en has ${en.size} keys, fr has ${fr.size}, ` +
    `${missingInFr.length + missingInEn.length} do not match.`,
);
process.exit(1);

/* Expo 54's currently resolved Hermes parser package omits its declared entrypoint. */
const fs = require('node:fs');
const path = require('node:path');
const entry = path.join(process.cwd(), 'node_modules', 'hermes-parser', 'dist', 'index.js');
if (!fs.existsSync(entry)) {
  fs.mkdirSync(path.dirname(entry), { recursive: true });
  fs.writeFileSync(entry, "'use strict';\nconst parser = require('./HermesParser');\nmodule.exports = { parse: parser.parse, ParserOptionsKeys: new Set() };\n");
}

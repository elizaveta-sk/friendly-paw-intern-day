import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (dir) => readdirSync(dir).flatMap((entry) => { const path=join(dir,entry); return statSync(path).isDirectory()?walk(path):[path]; });
test('source ships without runtime networking or key reads', () => {
  const source=walk('src').filter((file)=>file.endsWith('.js')).map((file)=>readFileSync(file,'utf8')).join('\n');
  expect(source).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|axios|WebSocket|process\.env/);
});

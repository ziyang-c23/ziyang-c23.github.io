// Exercise real detail routes and draft isolation, then restore the empty site.
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const created = [];
const marker = 'QA-DRAFT-MUST-NOT-BE-PUBLISHED';

function build() {
  const result = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
  assert.equal(result.status, 0, 'Build failed');
}

function fixture(section, locale, draft) {
  const slug = draft ? 'qa-draft' : 'qa-template';
  const file = resolve(root, `src/content/${section}/qa-${locale}-${slug}.md`);
  assert.ok(!existsSync(file), `Refusing to overwrite ${file}`);
  writeFileSync(file, `---\ntitle: "${draft ? marker : 'QA template'}"\ndescription: "Template check"\nlocale: ${locale}\nslug: ${slug}\ntranslationKey: ${slug}\ndate: 2026-10-23\ndraft: ${draft}\n---\n\n## Template body\n\nVisible **Markdown** content.\n`);
  created.push(file);
}

try {
  for (const section of ['blogs', 'projects']) {
    for (const locale of ['en', 'zh']) {
      fixture(section, locale, false);
      fixture(section, locale, true);
    }
  }
  build();
  for (const section of ['blogs', 'projects']) {
    for (const locale of ['en', 'zh']) {
      const prefix = locale === 'zh' ? 'zh/' : '';
      const html = readFileSync(resolve(root, `dist/${prefix}${section}/qa-template/index.html`), 'utf8');
      assert.ok(html.includes('<strong>Markdown</strong>'), 'Markdown detail did not render');
      const translation = `${locale === 'en' ? '/zh' : ''}/${section}/qa-template/`;
      assert.ok(html.includes(`href="${translation}"`), 'Translation switch missing');
      assert.ok(!existsSync(resolve(root, `dist/${prefix}${section}/qa-draft/index.html`)), 'Draft detail leaked');
      const listing = readFileSync(resolve(root, `dist/${prefix}${section}/index.html`), 'utf8');
      assert.ok(listing.includes('QA template') && !listing.includes(marker), 'Listing draft filter failed');
    }
  }
  const sitemap = readFileSync(resolve(root, 'dist/sitemap-0.xml'), 'utf8');
  assert.ok(!sitemap.includes('qa-draft'), 'Draft leaked into sitemap');
  const verification = spawnSync('npm', ['run', 'verify'], { cwd: root, stdio: 'inherit' });
  assert.equal(verification.status, 0);
  console.log('PASS: both detail templates, both translations, draft exclusion.');
} finally {
  for (const file of created) unlinkSync(file);
  build();
}

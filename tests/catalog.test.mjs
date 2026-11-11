import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run after npm run build to check the HTML visitors receive.
for (const locale of ['', 'en/']) {
  for (const page of ['', 'l-art/']) {
    test(`catalogue /${locale}${page}`, async () => {
      const html = await readFile(`dist/${locale}${page}index.html`, 'utf8');
      const articles = html.match(/<article\b[\s\S]*?<\/article>/g) ?? [];
      assert.ok(articles.length > 0);
      for (const article of articles) {
        if (/>\s*(vendu|sold)\s*</i.test(article)) {
          assert.doesNotMatch(article, /€|\$|EUR|USD/, 'sold work still displays a price');
        }
      }
      assert.doesNotMatch(html, /pastel-nuageuse-ii-|pastel-collection-bleue/);
      if (page) {
        const newCollage = articles.filter((article) => /id="collage-a-sa-maniere(?:-en)?"/.test(article));
        assert.equal(newCollage.length, 1, 'new collage appears exactly once');
        assert.match(html, /pastel-coton-cascade/);
        assert.match(html, /130(?:\s|&nbsp;|&#160;)*€|€130/);
        assert.ok(articles.some((article) => />\s*(vendu|sold)\s*</i.test(article)));
      }
    });
  }
}

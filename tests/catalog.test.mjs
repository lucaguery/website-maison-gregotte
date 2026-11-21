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
      assert.doesNotMatch(html, /pastel-coton-cascade|pastel-tulipes|pastel-pavots\.|pastel-bouquet/);
      assert.doesNotMatch(html, /data-kind="pastel"|id="art-pastel"/);
      if (page) {
        assert.equal(articles.length, 5);
        const titles = {
          'collage-a-sa-maniere': 'à sa manière',
          'collage-mesa': 'oui oui baguette',
          'collage-clair-de-lune': 'une dernière cigarette',
          'collage-cordee': 'la cordée',
          'collage-cortege': 'autoroute du soleil',
        };
        for (const [slug, title] of Object.entries(titles)) {
          const matches = articles.filter((article) => article.includes(`id="${slug}${locale ? '-en' : ''}"`));
          assert.equal(matches.length, 1, slug);
          assert.ok(matches[0].includes(title), title);
          if (slug === 'collage-a-sa-maniere') {
            assert.match(matches[0], /200(?:\s|&nbsp;|&#160;)*€|€200/);
            assert.doesNotMatch(matches[0], />\s*(vendu|sold)\s*</i);
          } else {
            assert.match(matches[0], />\s*(vendu|sold)\s*</i);
          }
        }
      }
    });
  }
}

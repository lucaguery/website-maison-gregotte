import assert from 'node:assert/strict';
import test from 'node:test';
import { curateArtworks } from '../src/scripts/art-order.js';

test('hangs the available collage first and alternates the collage colours without reordering paintings', () => {
  const titles = ['à sa manière', 'une dernière cigarette', 'oui oui baguette', 'autoroute du soleil', 'haute montagne', 'pavots sur l’herbe', 'chardons bleus', 'chardons grenat'];
  const items = titles.map((title) => ({ title }));
  assert.deepEqual(curateArtworks(items).map((item) => item.title), ['à sa manière', 'haute montagne', 'une dernière cigarette', 'autoroute du soleil', 'oui oui baguette', ...titles.slice(5)]);
  assert.deepEqual(items.map((item) => item.title), titles);
});

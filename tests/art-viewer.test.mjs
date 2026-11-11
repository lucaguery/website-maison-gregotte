import assert from 'node:assert/strict';
import test from 'node:test';
import { initArtworkViewer } from '../src/scripts/art-viewer.js';

function fixture() {
  const nodes = Object.fromEntries(['image', 'title', 'description', 'details', 'status', 'position', 'close', 'previous', 'next'].map((name) => [name, new EventTarget()]));
  const links = ['first', 'second'].map((title) => Object.assign(new EventTarget(), {
    href: `https://example.com/${title}.webp`,
    dataset: { title, description: `${title} description`, details: '13 × 18 cm', status: title === 'first' ? '200 €' : 'vendu' },
    focus() { this.focused = true; },
  }));
  const dialog = Object.assign(new EventTarget(), {
    open: false,
    querySelector: (selector) => nodes[selector.match(/data-viewer-(\w+)/)[1]],
    showModal() { this.open = true; },
    close() { this.open = false; this.dispatchEvent(new Event('close')); },
  });
  initArtworkViewer({ querySelector: () => dialog, querySelectorAll: () => links });
  return { nodes, links, dialog };
}

function click(target, options = {}) {
  const event = Object.assign(new Event('click', { cancelable: true }), { button: 0, ...options });
  target.dispatchEvent(event);
  return event;
}

test('opens the full image, navigates both ways and restores the opening link on close', () => {
  const { nodes, links, dialog } = fixture();
  assert.equal(click(links[0]).defaultPrevented, true);
  assert.equal(dialog.open, true);
  assert.equal(nodes.image.src, links[0].href);
  assert.equal(nodes.image.alt, 'first');
  assert.equal(nodes.description.textContent, 'first description');
  assert.equal(nodes.status.textContent, '200 €');
  click(nodes.next);
  assert.equal(nodes.title.textContent, 'second');
  assert.equal(nodes.position.textContent, '2 / 2');
  assert.equal(nodes.status.textContent, 'vendu');
  click(nodes.next);
  assert.equal(nodes.title.textContent, 'first');
  click(nodes.previous);
  assert.equal(nodes.title.textContent, 'second');
  click(nodes.close);
  assert.equal(dialog.open, false);
  assert.equal(links[0].focused, true);
});

test('supports keyboard navigation and native Escape dismissal', () => {
  const { nodes, links, dialog } = fixture();
  click(links[1]);
  dialog.dispatchEvent(Object.assign(new Event('keydown', { cancelable: true }), { key: 'ArrowRight' }));
  assert.equal(nodes.title.textContent, 'first');
  dialog.dispatchEvent(Object.assign(new Event('keydown', { cancelable: true }), { key: 'ArrowLeft' }));
  assert.equal(nodes.title.textContent, 'second');
  // The native dialog closes on Escape and emits this event.
  dialog.close();
  assert.equal(links[1].focused, true);
});

test('leaves modified clicks and new-tab navigation to the browser', () => {
  const { links, dialog } = fixture();
  assert.equal(click(links[0], { metaKey: true }).defaultPrevented, false);
  assert.equal(click(links[0], { ctrlKey: true }).defaultPrevented, false);
  assert.equal(click(links[0], { button: 1 }).defaultPrevented, false);
  assert.equal(dialog.open, false);
});

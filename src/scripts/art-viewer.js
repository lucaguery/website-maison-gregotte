export function initArtworkViewer(root) {
  const dialog = root.querySelector('.art-viewer');
  const links = [...root.querySelectorAll('[data-artwork]')];
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('[data-viewer-image]');
  const fields = ['title', 'description', 'details', 'status'];
  const position = dialog.querySelector('[data-viewer-position]');
  let current = 0;
  let opener;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.dataset.title;
    for (const field of fields) {
      dialog.querySelector(`[data-viewer-${field}]`).textContent = link.dataset[field] ?? '';
    }
    position.textContent = `${current + 1} / ${links.length}`;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-viewer-previous]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-viewer-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => opener?.focus());
}

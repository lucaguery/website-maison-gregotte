const ranks = new Map(['à sa manière', 'haute montagne', 'une dernière cigarette', 'autoroute du soleil', 'oui oui baguette'].map((title, index) => [title, index]));

export function curateArtworks(items) {
  return [...items].sort((a, b) => (ranks.get(a.title) ?? ranks.size) - (ranks.get(b.title) ?? ranks.size));
}

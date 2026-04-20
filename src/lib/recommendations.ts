export function getRecommendations(books: any[], history: any[]) {
  if (!history.length) return books.slice(0, 4);

  const keywords = history.map(h => h.title?.toLowerCase());

  return books
    .map(book => {
      const score = keywords.some(k =>
        book.title?.toLowerCase().includes(k)
      )
        ? 2
        : 0;

      return { ...book, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}
// src/engines/searchEngine.ts

export interface Book {
  id: number | string;
  title: string;
  description?: string;
  category?: string;
  author?: string;

  // 🔥 UI fields (IMPORTANTE)
  coverImage?: string;
  price?: number;
  buy_url?: string;
}

interface SearchOptions {
  query: string;
  category?: string;
}

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const tokenize = (text: string): string[] =>
  normalize(text).split(/\s+/).filter(Boolean);

export function scoreBook(book: Book, query: string): number {
  const title = normalize(book.title || "");
  const description = normalize(book.description || "");
  const tokens = tokenize(query);

  let score = 0;

  // 🔥 match exacto en título
  if (title.includes(normalize(query))) {
    score += 20;
  }

  // 🔥 match exacto en descripción
  if (description.includes(normalize(query))) {
    score += 10;
  }

  // 🧠 scoring por palabras
  tokens.forEach((word) => {
    if (title.includes(word)) score += 5;
    if (description.includes(word)) score += 2;
  });

  // ⭐ bonus si empieza igual
  if (title.startsWith(normalize(query))) {
    score += 15;
  }

  return score;
}

export function searchBooks(
  books: Book[],
  { query, category }: SearchOptions
): Book[] {
  let result = books;

  // 📂 filtro categoría
  if (category && category !== "all") {
    result = result.filter((b) => b.category === category);
  }

  // 🔍 búsqueda
  if (!query.trim()) return result;

  return result
    .map((book) => ({
      book,
      score: scoreBook(book, query),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.book);
}

export function getSmartRecommendations(books: any[], history: any) {
  if (!history || Object.keys(history).length === 0) return [];

  const scored = books.map(book => {
    const h = history[book.id] || { views: 0, clicks: 0 };

    const interactionScore = h.views * 1 + h.clicks * 3;

    let similarity = 0;
    const title = (book.title || "").toLowerCase();

    Object.keys(history).forEach(id => {
      const viewed = books.find(b => b.id === id);
      if (!viewed) return;

      const viewedTitle = (viewed.title || "").toLowerCase();

      viewedTitle.split(" ").forEach((word: string) => {
        if (word.length > 4 && title.includes(word)) {
          similarity += 1;
        }
      });
    });

    return {
      ...book,
      finalScore: interactionScore + similarity
    };
  });

  return scored
    .filter(b => b.finalScore > 0)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 4);
}
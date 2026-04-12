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
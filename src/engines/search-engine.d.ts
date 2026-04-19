export interface SearchResult {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  type: 'library' | 'blog';
  url: string;
  category?: string;
  tags?: string[];
  language: string;
}

export interface SearchSuggestion {
  title: string;
  type: 'library' | 'blog';
  url: string;
}

export interface SearchEngine {
  init(): Promise<void>;
  search(query: string, options?: {
    languages?: string[];
    types?: string[];
    limit?: number;
    fuzzy?: boolean;
  }): Promise<SearchResult[]>;
  getSuggestions(query: string, language?: string, limit?: number): Promise<SearchSuggestion[]>;
  clearCache(): void;
}

declare const searchEngine: SearchEngine;
export default searchEngine;
export { searchEngine };

export function getSmartRecommendations(books: any[], history: string[]) {
  if (!history.length) return [];

  const viewed = books.filter(b => history.includes(b.id));

  // 🧠 recolectar señales
  const keywords = new Set<string>();
  const categories = new Set<string>();

  viewed.forEach(book => {
    (book.title || "").toLowerCase().split(" ").forEach((w: string) => {
      if (w.length > 4) keywords.add(w);
    });

    if (book.category) {
      categories.add(book.category.toLowerCase());
    }
  });

  // 🎯 score inteligente
  const scored = books.map(book => {
    let score = 0;

    const title = (book.title || "").toLowerCase();
    const category = (book.category || "").toLowerCase();

    keywords.forEach(k => {
      if (title.includes(k)) score += 2;
    });

    categories.forEach(c => {
      if (category.includes(c)) score += 3;
    });

    if (history.includes(book.id)) score -= 5; // evitar repetir

    return { ...book, smartScore: score };
  });

  return scored
    .filter(b => b.smartScore > 0)
    .sort((a, b) => b.smartScore - a.smartScore)
    .slice(0, 4);
}

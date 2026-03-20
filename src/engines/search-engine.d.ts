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

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  price: number;
  currency: string;
  pages: number;
  link: string;
  slug: string;
  coverImage: string;
  tags: string[];
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
}

export interface Collection {
  name: string;
  subtitle: string;
  description: string;
}

export interface LibraryData {
  meta: {
    title: string;
    description: string;
    flag: string;
    languageCode: string;
    totalBooks: number;
    lastUpdated: string;
  };
  collection: Collection;
  books: Book[];
}

export interface LibraryEngine {
  loadLibrary(language?: string): Promise<LibraryData>;
  getBookBySlug(slug: string, language?: string): Promise<Book | null>;
  searchBooks(query: string, options?: { languages?: string[]; limit?: number }): Promise<Book[]>;
  getRelatedBooks(bookId: string, language?: string, limit?: number): Promise<Book[]>;
  getAllCollections(): Promise<(Collection & { language: string; flag: string; bookCount: number })[]>;
  clearCache(): void;
}

declare const libraryEngine: LibraryEngine;
export default libraryEngine;
export { libraryEngine };

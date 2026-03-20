/**
 * Library Engine - Drevaia Digital
 * Sistema de gestión de contenido para eBooks
 * Motor interno de biblioteca multiidioma
 */

class LibraryEngine {
  constructor() {
    this.cache = new Map();
    this.basePath = '/src/content/library';
    this.languages = ['es', 'en', 'fr', 'pt'];
  }

  /**
   * Carga la biblioteca completa para un idioma
   */
  async loadLibrary(language = 'es') {
    const cacheKey = `library-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.basePath}/library-${language}.json`);
      const data = await response.json();
      
      // Procesar y enriquecer datos
      const enrichedData = this.enrichLibraryData(data, language);
      
      this.cache.set(cacheKey, enrichedData);
      return enrichedData;
    } catch (error) {
      console.error(`Error loading library for ${language}:`, error);
      return this.getFallbackLibrary(language);
    }
  }

  /**
   * Enriquece los datos de la biblioteca con metadatos adicionales
   */
  enrichLibraryData(data, language) {
    const flags = { es: '🇪🇸', en: '🇬🇧', fr: '🇫🇷', pt: '🇧🇷' };
    
    return {
      ...data,
      meta: {
        ...data.meta,
        flag: flags[language] || '🌐',
        languageCode: language,
        totalBooks: data.books?.length || 0,
        lastUpdated: new Date().toISOString(),
      },
      books: data.books?.map((book, index) => ({
        ...book,
        id: `${language}-${index + 1}`,
        slug: this.generateSlug(book.title),
        language,
        readingTime: this.estimateReadingTime(book.description),
      })) || [],
    };
  }

  /**
   * Genera un slug URL-friendly desde el título
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Estima tiempo de lectura
   */
  estimateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  }

  /**
   * Obtiene un libro específico por slug
   */
  async getBookBySlug(slug, language = 'es') {
    const library = await this.loadLibrary(language);
    return library.books?.find(book => book.slug === slug) || null;
  }

  /**
   * Busca libros en todos los idiomas
   */
  async searchBooks(query, options = {}) {
    const { languages = this.languages, limit = 10 } = options;
    const results = [];

    for (const lang of languages) {
      const library = await this.loadLibrary(lang);
      const matches = library.books?.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase()) ||
        book.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ) || [];

      results.push(...matches.map(book => ({
        ...book,
        language: lang,
        collectionName: library.collection?.name,
      })));
    }

    return results.slice(0, limit);
  }

  /**
   * Obtiene libros relacionados
   */
  async getRelatedBooks(bookId, language = 'es', limit = 3) {
    const library = await this.loadLibrary(language);
    const currentBook = library.books?.find(b => b.id === bookId);
    
    if (!currentBook) return [];

    return library.books
      ?.filter(book => 
        book.id !== bookId && 
        book.tags?.some(tag => currentBook.tags?.includes(tag))
      )
      .slice(0, limit) || [];
  }

  /**
   * Obtiene todas las colecciones disponibles
   */
  async getAllCollections() {
    const collections = [];
    
    for (const lang of this.languages) {
      const library = await this.loadLibrary(lang);
      if (library.collection) {
        collections.push({
          ...library.collection,
          language: lang,
          flag: library.meta?.flag,
          bookCount: library.books?.length || 0,
        });
      }
    }

    return collections;
  }

  /**
   * Datos de respaldo si falla la carga
   */
  getFallbackLibrary(language) {
    const fallbacks = {
      es: {
        meta: { title: 'Biblioteca Drevaia', language: 'es', flag: '🇪🇸' },
        collection: { name: 'Colección Español', subtitle: 'Desarrollo personal y liderazgo' },
        books: [],
      },
      en: {
        meta: { title: 'Drevaia Library', language: 'en', flag: '🇬🇧' },
        collection: { name: 'English Collection', subtitle: 'Personal growth and leadership' },
        books: [],
      },
      fr: {
        meta: { title: 'Bibliothèque Drevaia', language: 'fr', flag: '🇫🇷' },
        collection: { name: 'Collection Française', subtitle: 'Développement personnel' },
        books: [],
      },
      pt: {
        meta: { title: 'Biblioteca Drevaia', language: 'pt', flag: '🇧🇷' },
        collection: { name: 'Coleção Português', subtitle: 'Liderança e crescimento' },
        books: [],
      },
    };

    return fallbacks[language] || fallbacks.es;
  }

  /**
   * Limpia la caché
   */
  clearCache() {
    this.cache.clear();
  }
}

// Exportar singleton
export const libraryEngine = new LibraryEngine();
export default LibraryEngine;

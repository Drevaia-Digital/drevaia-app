/**
 * Search Engine - Drevaia Digital
 * Sistema de búsqueda global multiidioma
 */

class SearchEngine {
  constructor() {
    this.cache = new Map();
    this.indexPath = '/src/content/search-index.json';
    this.languages = ['es', 'en', 'fr', 'pt'];
    this.initialized = false;
    this.searchIndex = null;
  }

  /**
   * Inicializa el motor de búsqueda
   */
  async init() {
    if (this.initialized) return;

    try {
      const response = await fetch(this.indexPath);
      this.searchIndex = await response.json();
      this.initialized = true;
      console.log('🔍 Search Engine initialized');
    } catch (error) {
      console.error('Error initializing search engine:', error);
    }
  }

  /**
   * Búsqueda global en todos los contenidos
   */
  async search(query, options = {}) {
    await this.init();

    const {
      languages = this.languages,
      types = ['library', 'blog'],
      limit = 20,
      fuzzy = true,
    } = options;

    const results = [];
    const normalizedQuery = this.normalizeText(query);

    for (const lang of languages) {
      for (const type of types) {
        const contentData = await this.loadContent(lang, type);
        if (!contentData) continue;

        const items = type === 'library' 
          ? contentData.books 
          : contentData.posts;

        if (!items) continue;

        for (const item of items) {
          const score = this.calculateScore(item, normalizedQuery, type);
          
          if (score > 0) {
            results.push({
              ...item,
              type,
              language: lang,
              score,
              url: this.generateUrl(item, type, lang),
            });
          }
        }
      }
    }

    // Ordenar por relevancia y limitar resultados
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Carga contenido específico
   */
  async loadContent(language, type) {
    const cacheKey = `${language}-${type}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const path = `/src/content/${type}/${type === 'library' ? 'library' : 'posts'}-${language}.json`;
      const response = await fetch(path);
      const data = await response.json();
      
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error loading ${type} for ${language}:`, error);
      return null;
    }
  }

  /**
   * Normaliza texto para búsqueda
   */
  normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim();
  }

  /**
   * Calcula score de relevancia
   */
  calculateScore(item, query, type) {
    let score = 0;
    const queryWords = query.split(/\s+/).filter(w => w.length > 2);
    
    if (queryWords.length === 0) return 0;

    const fields = type === 'library' 
      ? ['title', 'description', 'tags', 'category']
      : ['title', 'excerpt', 'content', 'tags', 'category'];

    for (const field of fields) {
      const value = item[field];
      if (!value) continue;

      const normalizedValue = this.normalizeText(
        Array.isArray(value) ? value.join(' ') : String(value)
      );

      for (const word of queryWords) {
        // Coincidencia exacta
        if (normalizedValue.includes(word)) {
          score += field === 'title' ? 10 : field === 'tags' ? 5 : 3;
        }

        // Coincidencia parcial
        if (word.length > 4) {
          const partialRegex = new RegExp(word.substring(0, 4), 'i');
          if (partialRegex.test(normalizedValue)) {
            score += 1;
          }
        }
      }
    }

    // Bonus para items destacados
    if (item.featured) score += 2;
    if (item.bestseller) score += 3;

    return score;
  }

  /**
   * Genera URL para un item
   */
  generateUrl(item, type, language) {
    const langPrefix = language === 'es' ? '' : `/${language}`;
    
    if (type === 'library') {
      return `${langPrefix}/books/${item.slug}`;
    }
    
    if (type === 'blog') {
      return `${langPrefix}/blog/${item.slug}`;
    }

    return '/';
  }

  /**
   * Búsqueda por categoría
   */
  async searchByCategory(category, language = 'es', options = {}) {
    const { type = 'blog', limit = 10 } = options;
    const content = await this.loadContent(language, type);
    
    if (!content) return [];

    const items = type === 'library' ? content.books : content.posts;
    
    return items
      ?.filter(item => 
        this.normalizeText(item.category) === this.normalizeText(category)
      )
      .slice(0, limit) || [];
  }

  /**
   * Búsqueda por tags
   */
  async searchByTag(tag, language = 'es', options = {}) {
    const { limit = 10 } = options;
    const results = [];

    for (const type of ['library', 'blog']) {
      const content = await this.loadContent(language, type);
      if (!content) continue;

      const items = type === 'library' ? content.books : content.posts;
      
      const matches = items?.filter(item =>
        item.tags?.some(t => 
          this.normalizeText(t) === this.normalizeText(tag)
        )
      ) || [];

      results.push(...matches.map(item => ({ ...item, type })));
    }

    return results.slice(0, limit);
  }

  /**
   * Obtiene sugerencias de búsqueda
   */
  async getSuggestions(query, language = 'es', limit = 5) {
    if (query.length < 2) return [];

    const results = await this.search(query, { 
      languages: [language], 
      limit: limit * 2 
    });

    // Extraer títulos únicos
    const suggestions = [];
    const seen = new Set();

    for (const result of results) {
      const key = result.title.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({
          title: result.title,
          type: result.type,
          url: result.url,
        });
        
        if (suggestions.length >= limit) break;
      }
    }

    return suggestions;
  }

  /**
   * Obtiene contenido relacionado
   */
  async getRelated(itemId, type, language = 'es', limit = 3) {
    const content = await this.loadContent(language, type);
    if (!content) return [];

    const items = type === 'library' ? content.books : content.posts;
    const currentItem = items?.find(i => i.id === itemId || i.slug === itemId);
    
    if (!currentItem) return [];

    return items
      ?.filter(item => {
        if (item.id === itemId || item.slug === itemId) return false;
        
        // Misma categoría
        if (item.category === currentItem.category) return true;
        
        // Tags en común
        const commonTags = item.tags?.filter(tag => 
          currentItem.tags?.includes(tag)
        ) || [];
        
        return commonTags.length > 0;
      })
      .sort((a, b) => {
        const aCommon = a.tags?.filter(t => currentItem.tags?.includes(t)).length || 0;
        const bCommon = b.tags?.filter(t => currentItem.tags?.includes(t)).length || 0;
        return bCommon - aCommon;
      })
      .slice(0, limit) || [];
  }

  /**
   * Limpia la caché
   */
  clearCache() {
    this.cache.clear();
    this.initialized = false;
    this.searchIndex = null;
  }
}

// Exportar singleton
export const searchEngine = new SearchEngine();
export default SearchEngine;

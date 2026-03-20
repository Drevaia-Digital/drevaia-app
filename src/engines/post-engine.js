/**
 * Post Engine - Drevaia Digital
 * Sistema de gestión de contenido para Blog
 * Motor interno de artículos multiidioma
 */

class PostEngine {
  constructor() {
    this.cache = new Map();
    this.basePath = '/src/content/blog';
    this.languages = ['es', 'en', 'fr', 'pt'];
    this.postsPerPage = 9;
  }

  /**
   * Carga todos los posts para un idioma
   */
  async loadPosts(language = 'es') {
    const cacheKey = `posts-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.basePath}/posts-${language}.json`);
      const data = await response.json();
      
      // Procesar y enriquecer posts
      const enrichedPosts = data.posts?.map(post => this.enrichPost(post, language)) || [];
      
      const result = {
        meta: {
          ...data.meta,
          language,
          totalPosts: enrichedPosts.length,
          totalPages: Math.ceil(enrichedPosts.length / this.postsPerPage),
        },
        posts: enrichedPosts,
        categories: this.extractCategories(enrichedPosts),
        tags: this.extractTags(enrichedPosts),
      };
      
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error loading posts for ${language}:`, error);
      return this.getFallbackPosts(language);
    }
  }

  /**
   * Enriquece un post con metadatos adicionales
   */
  enrichPost(post, language) {
    return {
      ...post,
      id: post.slug || this.generateSlug(post.title),
      slug: post.slug || this.generateSlug(post.title),
      language,
      readingTime: this.estimateReadingTime(post.content),
      wordCount: post.content?.split(/\s+/).length || 0,
      excerpt: post.excerpt || this.generateExcerpt(post.content),
      publishedDate: post.publishedDate || new Date().toISOString(),
      formattedDate: this.formatDate(post.publishedDate, language),
      seo: {
        title: post.seo?.title || post.title,
        description: post.seo?.description || this.generateExcerpt(post.content, 160),
        keywords: post.seo?.keywords || post.tags?.join(', ') || '',
        ogImage: post.seo?.ogImage || post.coverImage,
      },
    };
  }

  /**
   * Genera slug URL-friendly
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
   * Genera extracto del contenido
   */
  generateExcerpt(content, length = 150) {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > length 
      ? plainText.substring(0, length).trim() + '...'
      : plainText;
  }

  /**
   * Estima tiempo de lectura
   */
  estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  }

  /**
   * Formatea fecha según idioma
   */
  formatDate(dateString, language) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const locales = {
      es: 'es-ES',
      en: 'en-US',
      fr: 'fr-FR',
      pt: 'pt-BR',
    };

    return date.toLocaleDateString(locales[language] || 'es-ES', options);
  }

  /**
   * Extrae categorías únicas de posts
   */
  extractCategories(posts) {
    const categories = new Map();
    
    posts.forEach(post => {
      if (post.category) {
        const count = categories.get(post.category) || 0;
        categories.set(post.category, count + 1);
      }
    });

    return Array.from(categories.entries()).map(([name, count]) => ({
      name,
      count,
      slug: this.generateSlug(name),
    }));
  }

  /**
   * Extrae tags únicos de posts
   */
  extractTags(posts) {
    const tags = new Map();
    
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        const count = tags.get(tag) || 0;
        tags.set(tag, count + 1);
      });
    });

    return Array.from(tags.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name, count]) => ({
        name,
        count,
        slug: this.generateSlug(name),
      }));
  }

  /**
   * Obtiene posts paginados
   */
  async getPostsPage(page = 1, language = 'es', options = {}) {
    const { category, tag, search } = options;
    const data = await this.loadPosts(language);
    let posts = data.posts;

    // Aplicar filtros
    if (category) {
      posts = posts.filter(p => this.generateSlug(p.category) === category);
    }
    if (tag) {
      posts = posts.filter(p => p.tags?.some(t => this.generateSlug(t) === tag));
    }
    if (search) {
      const query = search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
      );
    }

    // Paginación
    const start = (page - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(posts.length / this.postsPerPage),
        totalPosts: posts.length,
        hasNext: end < posts.length,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Obtiene un post por slug
   */
  async getPostBySlug(slug, language = 'es') {
    const data = await this.loadPosts(language);
    return data.posts?.find(post => post.slug === slug) || null;
  }

  /**
   * Obtiene posts relacionados
   */
  async getRelatedPosts(postId, language = 'es', limit = 3) {
    const data = await this.loadPosts(language);
    const currentPost = data.posts?.find(p => p.id === postId);
    
    if (!currentPost) return [];

    return data.posts
      ?.filter(post => {
        if (post.id === postId) return false;
        
        // Misma categoría
        if (post.category === currentPost.category) return true;
        
        // Tags en común
        const commonTags = post.tags?.filter(tag => 
          currentPost.tags?.includes(tag)
        ) || [];
        
        return commonTags.length > 0;
      })
      .sort((a, b) => {
        // Priorizar por tags en común
        const aCommon = a.tags?.filter(t => currentPost.tags?.includes(t)).length || 0;
        const bCommon = b.tags?.filter(t => currentPost.tags?.includes(t)).length || 0;
        return bCommon - aCommon;
      })
      .slice(0, limit) || [];
  }

  /**
   * Obtiene posts destacados
   */
  async getFeaturedPosts(language = 'es', limit = 3) {
    const data = await this.loadPosts(language);
    return data.posts
      ?.filter(post => post.featured)
      .slice(0, limit) || [];
  }

  /**
   * Obtiene posts recientes
   */
  async getRecentPosts(language = 'es', limit = 5) {
    const data = await this.loadPosts(language);
    return data.posts
      ?.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, limit) || [];
  }

  /**
   * Búsqueda global en todos los idiomas
   */
  async searchAllLanguages(query, options = {}) {
    const { limit = 10 } = options;
    const allResults = [];

    for (const lang of this.languages) {
      const data = await this.loadPosts(lang);
      const matches = data.posts?.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ) || [];

      allResults.push(...matches.map(post => ({
        ...post,
        language: lang,
      })));
    }

    return allResults.slice(0, limit);
  }

  /**
   * Genera feed RSS
   */
  async generateRSS(language = 'es') {
    const data = await this.loadPosts(language);
    const recentPosts = data.posts?.slice(0, 20) || [];

    return {
      title: data.meta?.title || 'Drevaia Digital Blog',
      description: data.meta?.description || '',
      language,
      lastBuildDate: new Date().toUTCString(),
      posts: recentPosts.map(post => ({
        title: post.title,
        description: post.excerpt,
        link: `/blog/${post.slug}`,
        pubDate: new Date(post.publishedDate).toUTCString(),
        guid: post.id,
      })),
    };
  }

  /**
   * Datos de respaldo
   */
  getFallbackPosts(language) {
    const titles = {
      es: { title: 'Blog Drevaia Digital', description: 'Artículos de sanación emocional' },
      en: { title: 'Drevaia Digital Blog', description: 'Emotional healing articles' },
      fr: { title: 'Blog Drevaia Digital', description: 'Articles de guérison émotionnelle' },
      pt: { title: 'Blog Drevaia Digital', description: 'Artigos de cura emocional' },
    };

    return {
      meta: titles[language] || titles.es,
      posts: [],
      categories: [],
      tags: [],
    };
  }

  /**
   * Limpia la caché
   */
  clearCache() {
    this.cache.clear();
  }
}

// Exportar singleton
export const postEngine = new PostEngine();
export default PostEngine;

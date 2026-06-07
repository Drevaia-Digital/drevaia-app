/**
 * Post Engine - Drevaia Digital
 * Sistema de gestión de contenido para Blog
 * Ahora usa Edge Functions de Supabase para mejor performance
 */

const SUPABASE_FUNCTION_URL = 'https://hkjiqihczalnekzuwjtw.supabase.co/functions/v1';

class PostEngine {
  constructor() {
    this.cache = new Map();
    this.languages = ['es', 'en', 'fr', 'pt'];
    this.postsPerPage = 9;
  }

  /**
   * Carga posts desde Edge Function de Supabase
   */
  async loadPosts(language = 'es') {
    const cacheKey = `posts-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Llamar a la Edge Function
      const response = await fetch(`${SUPABASE_FUNCTION_URL}/get-posts?pageSize=100`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Mapear posts de Supabase al formato del frontend
      const enrichedPosts = result.data?.map(post => this.mapSupabasePost(post, language)) || [];
      
      const finalResult = {
        meta: {
          language,
          totalPosts: enrichedPosts.length,
          totalPages: Math.ceil(enrichedPosts.length / this.postsPerPage),
        },
        posts: enrichedPosts,
        categories: this.extractCategories(enrichedPosts),
        tags: this.extractTags(enrichedPosts),
      };
      
      this.cache.set(cacheKey, finalResult);
      return finalResult;
    } catch (error) {
      console.error(`Error loading posts for ${language}:`, error);
      return this.getFallbackPosts(language);
    }
  }

  /**
   * Mapea post de Supabase al formato del frontend
   */
  mapSupabasePost(post, language) {
    const title = this.extractTitleFromCaption(post.caption);
    const content = post.caption || '';
    
    return {
      id: post.id.toString(),
      slug: this.generateSlug(title),
      title: title,
      content: content,
      excerpt: this.generateExcerpt(content, 150),
      category: 'Reflexiones',
      tags: ['sanación', 'crecimiento personal'],
      publishedDate: post.published_at || post.created_at,
      formattedDate: this.formatDate(post.published_at || post.created_at, language),
      readingTime: this.estimateReadingTime(content),
      wordCount: content.split(/\s+/).length,
      featured: false,
      coverImage: post.image_url || '',
      language: language,
      seo: {
        title: title,
        description: this.generateExcerpt(content, 160),
        keywords: 'sanación, crecimiento personal, drevaia',
        ogImage: post.image_url || '',
      },
    };
  }

  /**
   * Extrae título del caption (primera línea o primera frase)
   */
  extractTitleFromCaption(caption) {
    if (!caption) return 'Sin título';
    
    const firstLine = caption.split('\n')[0].trim();
    if (firstLine.length > 10 && firstLine.length < 100) {
      return firstLine;
    }
    
    const firstSentence = caption.split(/[.!?]/)[0];
    return firstSentence.length > 100 
      ? firstSentence.substring(0, 100) + '...' 
      : firstSentence;
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
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: this.postsPerPage.toString(),
      });
      
      if (category) params.append('platform', category);
      
      const response = await fetch(`${SUPABASE_FUNCTION_URL}/get-posts?${params}`);
      const result = await response.json();
      
      const posts = result.data?.map(post => this.mapSupabasePost(post, language)) || [];
      
      let filteredPosts = posts;
      
      if (search) {
        const query = search.toLowerCase();
        filteredPosts = filteredPosts.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
        );
      }

      return {
        posts: filteredPosts,
        pagination: result.pagination || {
          currentPage: page,
          totalPages: 1,
          totalPosts: filteredPosts.length,
          hasNext: false,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      return {
        posts: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalPosts: 0,
          hasNext: false,
          hasPrev: false,
        },
      };
    }
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
        if (post.category === currentPost.category) return true;
        
        const commonTags = post.tags?.filter(tag => 
          currentPost.tags?.includes(tag)
        ) || [];
        
        return commonTags.length > 0;
      })
      .sort((a, b) => {
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

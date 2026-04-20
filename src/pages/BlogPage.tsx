import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Clock, Calendar, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO, seoConfigs } from '@/partials/SEO';
import { postEngine } from '@/engines/post-engine';
import type { Translations, Language } from '@/i18n';

interface BlogPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedDate: string;
  formattedDate: string;
  readingTime: number;
  featured: boolean;
  coverImage: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface Tag {
  name: string;
  slug: string;
  count: number;
}

export function BlogPage({ t, language }: BlogPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const seo = seoConfigs.blog(language);

  const labels = {
    all: language === 'es' ? 'Todos' : language === 'en' ? 'All' : language === 'fr' ? 'Tous' : 'Todos',
    featured: language === 'es' ? 'Destacados' : language === 'en' ? 'Featured' : language === 'fr' ? 'En Vedette' : 'Destaques',
    categories: language === 'es' ? 'Categorías' : language === 'en' ? 'Categories' : language === 'fr' ? 'Catégories' : 'Categorias',
    popularTags: language === 'es' ? 'Etiquetas Populares' : language === 'en' ? 'Popular Tags' : language === 'fr' ? 'Tags Populaires' : 'Tags Populares',
    readMore: language === 'es' ? 'Leer más' : language === 'en' ? 'Read more' : language === 'fr' ? 'Lire plus' : 'Ler mais',
    minRead: language === 'es' ? 'min de lectura' : language === 'en' ? 'min read' : language === 'fr' ? 'min de lecture' : 'min de leitura',
    searchPlaceholder: language === 'es' ? 'Buscar artículos...' : language === 'en' ? 'Search articles...' : language === 'fr' ? 'Rechercher des articles...' : 'Buscar artigos...',
    noResults: language === 'es' ? 'No se encontraron artículos' : language === 'en' ? 'No articles found' : language === 'fr' ? 'Aucun article trouvé' : 'Nenhum artigo encontrado',
    loadMore: language === 'es' ? 'Cargar más' : language === 'en' ? 'Load more' : language === 'fr' ? 'Charger plus' : 'Carregar mais',
  };

  useEffect(() => {
    loadPosts();
  }, [language, currentPage, selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      searchPosts();
    }
  }, [searchQuery]);

  const loadPosts = async () => {
    setLoading(true);
    
    const data = await postEngine.loadPosts(language);
    
    setCategories(data.categories || []);
    setTags(data.tags || []);
    
    // Get featured posts
    const featured = data.posts?.filter((p: Post) => p.featured).slice(0, 3) || [];
    setFeaturedPosts(featured);
    
    // Get paginated posts
    const paginated = await postEngine.getPostsPage(currentPage, language, {
      category: selectedCategory || undefined,
    });
    
    setPosts(paginated.posts);
    setTotalPages(paginated.pagination.totalPages);
    
    setLoading(false);
  };

  const searchPosts = async () => {
    if (!searchQuery.trim()) {
      loadPosts();
      return;
    }
    
    setLoading(true);
    const results = await postEngine.searchAllLanguages(searchQuery, { limit: 20 });
    setPosts(results.filter((r: Post & { language: string }) => r.language === language));
    setTotalPages(1);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        language={language}
        canonicalUrl={`https://drevaia.com${language === 'es' ? '' : `/${language}`}/blog`}
      />
      
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'es' ? 'Sanación Emocional' : language === 'en' ? 'Emotional Healing' : language === 'fr' ? 'Guérison Émotionnelle' : 'Cura Emocional'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {seo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {labels.all}
              </Button>
              {categories.slice(0, 5).map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && !selectedCategory && featuredPosts.length > 0 && currentPage === 1 && (
        <section className="py-16 bg-purple-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-500" />
              {labels.featured}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} labels={labels} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {labels.all}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({posts.length})
                </span>
              </h2>

              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48" />
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} labels={labels} horizontal />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{labels.noResults}</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !searchQuery && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Categories */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  {labels.categories}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.slug ? null : category.slug
                      )}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  {labels.popularTags}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 15).map((tag) => (
                    <span
                      key={tag.slug}
                      className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full border border-gray-200 dark:border-gray-600"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}

interface PostCardProps {
  post: Post;
  labels: Record<string, string>;
  horizontal?: boolean;
}

function PostCard({ post, labels, horizontal }: PostCardProps) {
  if (horizontal) {
    return (
      <Link 
        to={`/blog/${post.slug}`}
        className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 p-6"
      >
        <div className="md:w-48 h-32 md:h-auto bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-10 h-10 text-purple-400" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">
            {post.category}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} {labels.minRead}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-purple-400" />
      </div>
      <div className="p-5">
        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">
          {post.category}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} min
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Calendar, Tag, ChevronRight, Share2, Heart, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { postEngine } from '@/engines/post-engine';
import { CommentSystemSupabase } from '@/components/CommentSystemSupabase';
import { FavoriteButtonSupabase } from '@/components/FavoriteButtonSupabase';
import { ReadingMode } from '@/components/ReadingMode';
import { useAnalytics, usePageTracking } from '@/hooks/useAnalytics';
import type { Translations, Language } from '@/i18n';

interface BlogPostPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedDate: string;
  formattedDate: string;
  readingTime: number;
  wordCount: number;
  featured: boolean;
  coverImage: string;
  author: string;
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export function BlogPostPage({ t, language, changeLanguage }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  
  const { trackEvent } = useAnalytics();
  usePageTracking(`/blog/${slug}`);
  
  // Track share event
  const handleShare = async () => {
    trackEvent('engagement', 'share', post?.title);
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const labels = {
    back: language === 'es' ? 'Volver al blog' : language === 'en' ? 'Back to blog' : language === 'fr' ? 'Retour au blog' : 'Voltar ao blog',
    related: language === 'es' ? 'También te puede interesar' : language === 'en' ? 'You may also like' : language === 'fr' ? 'Vous aimerez aussi' : 'Também pode gostar',
    share: language === 'es' ? 'Compartir' : language === 'en' ? 'Share' : language === 'fr' ? 'Partager' : 'Compartilhar',
    like: language === 'es' ? 'Me gusta' : language === 'en' ? 'Like' : language === 'fr' ? 'J\'aime' : 'Gostar',
    category: language === 'es' ? 'Categoría' : language === 'en' ? 'Category' : language === 'fr' ? 'Catégorie' : 'Categoria',
    tags: language === 'es' ? 'Etiquetas' : language === 'en' ? 'Tags' : language === 'fr' ? 'Tags' : 'Tags',
    minRead: language === 'es' ? 'min de lectura' : language === 'en' ? 'min read' : language === 'fr' ? 'min de lecture' : 'min de leitura',
    words: language === 'es' ? 'palabras' : language === 'en' ? 'words' : language === 'fr' ? 'mots' : 'palavras',
  };

  useEffect(() => {
    loadPost();
  }, [slug, language]);

  const loadPost = async () => {
    if (!slug) return;
    
    setLoading(true);
    const postData = await postEngine.getPostBySlug(slug, language);
    
    if (postData) {
      setPost(postData);
      
      // Load related posts
      const related = await postEngine.getRelatedPosts(postData.id, language, 3);
      setRelatedPosts(related);
    } else {
      navigate('/blog');
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation t={t} language={language} changeLanguage={changeLanguage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <BookOpen className="w-16 h-16 text-purple-300 mb-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation t={t} language={language} changeLanguage={changeLanguage} />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">{language === 'es' ? 'Artículo no encontrado' : language === 'en' ? 'Article not found' : language === 'fr' ? 'Article non trouvé' : 'Artigo não encontrado'}</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {labels.back}
            </Button>
          </Link>
        </div>
        <Footer t={t} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        keywords={post.seo?.keywords || post.tags?.join(', ')}
        ogImage={post.coverImage}
        language={language}
        canonicalUrl={`https://drevaia.com/blog/${post.slug}`}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {labels.back}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} {labels.minRead}
              </span>
              <span>
                {post.wordCount} {labels.words}
              </span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-2xl overflow-hidden">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-purple-300" />
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-900/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {labels.tags}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <FavoriteButtonSupabase
              id={post.id}
              type="post"
              title={post.title}
              url={`/blog/${post.slug}`}
              image={post.coverImage}
              language={language}
              variant="outline"
              showLabel
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? 'text-red-500 border-red-200' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
              {labels.like}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {labels.share}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReadingMode(true)}
            >
              <BookOpenCheck className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Modo lectura' : language === 'en' ? 'Reading mode' : language === 'fr' ? 'Mode lecture' : 'Modo leitura'}
            </Button>
          </div>

          {/* Comments */}
          <CommentSystemSupabase postId={post.id} language={language} />
        </div>
      </article>

      {/* Reading Mode */}
      <ReadingMode
        content={post.content}
        title={post.title}
        isOpen={readingMode}
        onClose={() => setReadingMode(false)}
        language={language}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {labels.related}
            </h2>
            <div className="space-y-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group flex gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 p-4"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                      {relatedPost.category}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all self-center" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer t={t} />
    </div>
  );
}

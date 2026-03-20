import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  language?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords,
  author = 'Noa Drevaia',
  ogImage = 'https://drevaia.com/images/og-default.jpg',
  ogType = 'website',
  canonicalUrl,
  language = 'es',
  noIndex = false,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'author': author,
      'robots': noIndex ? 'noindex, nofollow' : 'index, follow',
      'og:title': title,
      'og:description': description,
      'og:type': ogType,
      'og:image': ogImage,
      'og:url': canonicalUrl || window.location.href,
      'og:locale': language === 'es' ? 'es_ES' : language === 'en' ? 'en_US' : language === 'fr' ? 'fr_FR' : 'pt_BR',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:creator': '@drevaia',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      const isOg = name.startsWith('og:');
      const isTwitter = name.startsWith('twitter:');
      
      let meta = document.querySelector(
        isOg 
          ? `meta[property="${name}"]` 
          : isTwitter 
            ? `meta[name="${name}"]` 
            : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (isOg) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    });

    // Update canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Update language
    document.documentElement.lang = language;

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Optional: cleanup meta tags on unmount
    };
  }, [title, description, keywords, author, ogImage, ogType, canonicalUrl, language, noIndex, structuredData]);

  return null;
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: (language: string = 'es') => ({
    title: language === 'es' 
      ? 'Drevaia Digital | Santuario de Transformación Emocional'
      : language === 'en'
        ? 'Drevaia Digital | Sanctuary of Emotional Transformation'
        : language === 'fr'
          ? 'Drevaia Digital | Sanctuaire de Transformation Émotionnelle'
          : 'Drevaia Digital | Santuário de Transformação Emocional',
    description: language === 'es'
      ? 'Santuario digital de transformación emocional. eBooks, recursos y acompañamiento para tu crecimiento personal.'
      : language === 'en'
        ? 'Digital sanctuary of emotional transformation. eBooks, resources and support for your personal growth.'
        : language === 'fr'
          ? 'Sanctuaire digital de transformation émotionnelle. eBooks, ressources et accompagnement pour votre développement personnel.'
          : 'Santuário digital de transformação emocional. eBooks, recursos e acompanhamento para seu crescimento pessoal.',
    keywords: 'ebooks, sanación emocional, crecimiento personal, transformación, liderazgo, Drevaia',
  }),

  library: (language: string = 'es') => ({
    title: language === 'es'
      ? 'Biblioteca Drevaia Digital | 24 eBooks Transformadores'
      : language === 'en'
        ? 'Drevaia Digital Library | 24 Transformative eBooks'
        : language === 'fr'
          ? 'Bibliothèque Drevaia Digital | 24 eBooks Transformateurs'
          : 'Biblioteca Drevaia Digital | 24 eBooks Transformadores',
    description: language === 'es'
      ? 'Descubre nuestra colección de 24 eBooks en 4 idiomas. Desarrollo personal, liderazgo, SEO y sanación emocional.'
      : language === 'en'
        ? 'Discover our collection of 24 eBooks in 4 languages. Personal development, leadership, SEO and emotional healing.'
        : language === 'fr'
          ? 'Découvrez notre collection de 24 eBooks en 4 langues. Développement personnel, leadership, SEO et guérison émotionnelle.'
          : 'Descubra nossa coleção de 24 eBooks em 4 idiomas. Desenvolvimento pessoal, liderança, SEO e cura emocional.',
    keywords: 'ebooks, biblioteca, desarrollo personal, liderazgo, SEO, sanación emocional',
  }),

  blog: (language: string = 'es') => ({
    title: language === 'es'
      ? 'Blog Drevaia Digital | Artículos de Sanación Emocional'
      : language === 'en'
        ? 'Drevaia Digital Blog | Emotional Healing Articles'
        : language === 'fr'
          ? 'Blog Drevaia Digital | Articles de Guérison Émotionnelle'
          : 'Blog Drevaia Digital | Artigos de Cura Emocional',
    description: language === 'es'
      ? 'Artículos sobre sanación emocional, mindfulness, crecimiento personal y transformación digital.'
      : language === 'en'
        ? 'Articles about emotional healing, mindfulness, personal growth and digital transformation.'
        : language === 'fr'
          ? 'Articles sur la guérison émotionnelle, la pleine conscience, le développement personnel et la transformation digitale.'
          : 'Artigos sobre cura emocional, atenção plena, crescimento pessoal e transformação digital.',
    keywords: 'blog, sanación emocional, mindfulness, crecimiento personal, artículos',
  }),

  register: (language: string = 'es') => ({
    title: language === 'es'
      ? 'Registro | Únete a Drevaia Digital'
      : language === 'en'
        ? 'Register | Join Drevaia Digital'
        : language === 'fr'
          ? 'Inscription | Rejoignez Drevaia Digital'
          : 'Registro | Junte-se à Drevaia Digital',
    description: language === 'es'
      ? 'Regístrate en Drevaia Digital y recibe acceso exclusivo a contenido de sanación, novedades y regalos poéticos.'
      : language === 'en'
        ? 'Register at Drevaia Digital and get exclusive access to healing content, updates and poetic gifts.'
        : language === 'fr'
          ? 'Inscrivez-vous à Drevaia Digital et recevez un accès exclusif au contenu de guérison, nouveautés et cadeaux poétiques.'
          : 'Registre-se na Drevaia Digital e receba acesso exclusivo a conteúdo de cura, novidades e presentes poéticos.',
    keywords: 'registro, newsletter, comunidad, Drevaia Digital',
  }),
};

export default SEO;

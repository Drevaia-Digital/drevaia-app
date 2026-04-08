import esData from "@/content/blog/posts-es.json";
import enData from "@/content/blog/posts-en.json";
import frData from "@/content/blog/posts-fr.json";
import ptData from "@/content/blog/posts-pt.json";

export type Lang = "es" | "en" | "fr" | "pt";

// 🔥 Tipo real basado en tu JSON
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedDate: string;
  readingTime: number;
  featured?: boolean;
  coverImage?: string;
  author?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

// 🔥 Mapa de contenido
const contentMap: Record<Lang, BlogPost[]> = {
  es: esData.posts,
  en: enData.posts,
  fr: frData.posts,
  pt: ptData.posts,
};

// 🔥 Obtener todos
export const getArticles = (lang: Lang): BlogPost[] => {
  return contentMap[lang] || contentMap.es;
};

// 🔥 Buscar por slug
export const getArticleBySlug = (
  slug: string,
  lang: Lang
): BlogPost | undefined => {
  return getArticles(lang).find((post) => post.slug === slug);
};

// 🔥 Relacionados inteligentes
export const getRelatedArticles = (
  currentPost: BlogPost,
  lang: Lang
): BlogPost[] => {
  const all = getArticles(lang);

  return all
    .filter((post) => post.slug !== currentPost.slug)
    .filter((post) => {
      const sameCategory = post.category === currentPost.category;

      const sharedTags =
        post.tags?.some((tag) =>
          currentPost.tags?.includes(tag)
        ) || false;

      return sameCategory || sharedTags;
    })
    .slice(0, 3);
};
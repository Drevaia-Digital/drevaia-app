export interface Post {
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

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface PostsData {
  meta: {
    title: string;
    description: string;
    language: string;
    author: string;
    keywords: string;
    totalPosts: number;
    totalPages: number;
  };
  posts: Post[];
  categories: Category[];
  tags: Tag[];
}

export interface PaginationResult {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PostEngine {
  loadPosts(language?: string): Promise<PostsData>;
  getPostsPage(page?: number, language?: string, options?: { category?: string; tag?: string; search?: string }): Promise<PaginationResult>;
  getPostBySlug(slug: string, language?: string): Promise<Post | null>;
  getRelatedPosts(postId: string, language?: string, limit?: number): Promise<Post[]>;
  getFeaturedPosts(language?: string, limit?: number): Promise<Post[]>;
  getRecentPosts(language?: string, limit?: number): Promise<Post[]>;
  searchAllLanguages(query: string, options?: { limit?: number }): Promise<(Post & { language: string })[]>;
  generateRSS(language?: string): Promise<{
    title: string;
    description: string;
    language: string;
    lastBuildDate: string;
    posts: { title: string; description: string; link: string; pubDate: string; guid: string }[];
  }>;
  clearCache(): void;
}

declare const postEngine: PostEngine;
export default postEngine;
export { postEngine };

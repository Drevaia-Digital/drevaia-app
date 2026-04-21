export interface Book {
  id: string;

  title: string;
  description: string;
  collection?: string;

  image?: string;
  coverImage?: string;

  price?: number;

  // 🌍 multi idioma
  title_es?: string;
  title_en?: string;
  title_fr?: string;
  title_pt?: string;

  description_es?: string;
  description_en?: string;
  description_fr?: string;
  description_pt?: string;

  buy_url_es?: string;
  buy_url_en?: string;

  // 🔥 sistema IA
  score?: number;
  embedding?: number[];
  finalScore?: number;
}
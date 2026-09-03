export interface NavbarTranslations {
  menu: string;
  home: string;
  library: string;
  studio: string;
  portal: string;
  blog: string;
  gallery: string;
  legal: string;
}

export const navbarTranslations: Record<
  "es" | "en" | "fr" | "pt",
  NavbarTranslations
> = {
  es: {
    menu: "MENÚ",
    home: "Inicio",
    library: "Biblioteca",
    studio: "✨ AI Studio",
    portal: "Portal",
    blog: "Blog",
    gallery: "Galería",
    legal: "Legal",
  },

  en: {
    menu: "MENU",
    home: "Home",
    library: "Library",
    studio: "✨ AI Studio",
    portal: "Portal",
    blog: "Blog",
    gallery: "Gallery",
    legal: "Legal",
  },

  fr: {
    menu: "MENU",
    home: "Accueil",
    library: "Bibliothèque",
    studio: "✨ AI Studio",
    portal: "Portail",
    blog: "Blog",
    gallery: "Galerie",
    legal: "Légal",
  },

  pt: {
    menu: "MENU",
    home: "Início",
    library: "Biblioteca",
    studio: "✨ AI Studio",
    portal: "Portal",
    blog: "Blog",
    gallery: "Galeria",
    legal: "Legal",
  },
};
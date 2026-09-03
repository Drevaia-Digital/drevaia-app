/**
 * Resultado completo generado por DREVAIA.
 */

export interface EditorialPackage {

  editorial: string;

  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };

  social: {
    instagram: string;
    linkedin: string;
    x: string;
  };

  newsletter: {
    subject: string;
    preview: string;
    body: string;
  };

}
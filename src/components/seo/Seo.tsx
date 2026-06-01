import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

export function Seo({
  title,
  description,
  image = 'https://drevaia.com/og-cover.jpg',
  canonical,
}: SeoProps) {
  const siteTitle = `${title} | Drevaia`;
  const url = canonical || 'https://drevaia.com';

  return (
    <Helmet>

      {/* Basic */}
      <title>{siteTitle}</title>

      <meta
        name="description"
        content={description}
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={url}
      />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />

      <meta
        property="og:title"
        content={siteTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:url"
        content={url}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={siteTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

    </Helmet>
  );
}
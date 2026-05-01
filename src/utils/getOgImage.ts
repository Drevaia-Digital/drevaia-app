export function getOgImage(language: string, emotion: string | null) {
  if (!emotion) {
    return `https://drevaia.com/og-${language}.jpg`;
  }

  return `https://drevaia.com/og/${language}/${emotion}.jpg`;
}
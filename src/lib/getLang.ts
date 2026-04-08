export const getLangFromURL = () => {
  const path = window.location.pathname;

  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/fr")) return "fr";
  if (path.startsWith("/pt")) return "pt";

  return "es";
};
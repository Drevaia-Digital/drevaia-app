export function getFavorites() {
  return JSON.parse(localStorage.getItem("drevaia_favorites") || "[]");
}

export function toggleFavorite(item: any) {
  const favs = getFavorites();

  const exists = favs.find((f: any) => f.id === item.id);

  const updated = exists
    ? favs.filter((f: any) => f.id !== item.id)
    : [item, ...favs];

  localStorage.setItem("drevaia_favorites", JSON.stringify(updated));
}
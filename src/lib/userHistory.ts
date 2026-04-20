export function getUserHistory() {
  try {
    return JSON.parse(localStorage.getItem("drevaia_history") || "[]");
  } catch {
    return [];
  }
}

export function addToHistory(item: any) {
  const history = getUserHistory();

  const updated = [
    item,
    ...history.filter((h: any) => h.id !== item.id)
  ].slice(0, 10);

  localStorage.setItem("drevaia_history", JSON.stringify(updated));
}
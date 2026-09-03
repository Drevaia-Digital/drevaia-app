export interface NavigationItem {
  id: string;
  to: string;
  highlight?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    id: "home",
    to: "/",
  },
  {
    id: "library",
    to: "/library",
  },
  {
    id: "studio",
    to: "/studio",
    highlight: true,
  },
  {
    id: "portal",
    to: "/portal",
  },
  {
    id: "blog",
    to: "/blog",
  },
  {
    id: "gallery",
    to: "/gallery",
  },
  {
    id: "legal",
    to: "/legal",
  },
];
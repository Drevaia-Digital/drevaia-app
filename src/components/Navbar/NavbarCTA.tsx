type Props = {
  label: string;
  href: string;
};

export function NavbarCTA({
  label,
  href,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        hidden
        md:inline-flex
        items-center
        px-5
        py-2
        rounded-full
        bg-gradient-to-r
        from-purple-500
        to-indigo-600
        text-white
        text-sm
        font-semibold
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
      "
    >
      {label}
    </a>
  );
}
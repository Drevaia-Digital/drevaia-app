import { Link } from "react-router-dom";

export function NavbarLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 ml-2"
    >
      <img
        src="/assets/logo/logo-icon-azul.png"
        alt="DREVAIA"
        className="h-9 md:h-10 w-auto"
      />

      <span
        className="
          text-white
          font-semibold
          tracking-[0.2em]
          text-sm
          md:text-base
        "
      >
        DREVAIA
      </span>
    </Link>
  );
}
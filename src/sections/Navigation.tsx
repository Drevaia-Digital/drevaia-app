import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// 👇 Acepta props pero no los usa (fix global)
export function Navigation(_: any) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold text-gray-900">
            Drevaia
          </span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

          <Link to="/" className="hover:text-purple-600 transition">
            Inicio
          </Link>

          <Link to="/library" className="hover:text-purple-600 transition">
            Biblioteca
          </Link>

          <a href="#ebooks" className="hover:text-purple-600 transition">
            Ebooks
          </a>

        </div>

      </div>
    </nav>
  );
}
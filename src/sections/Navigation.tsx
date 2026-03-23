import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Navigation(_: any) {
  const navigate = useNavigate();

  const changeLang = (lang: string) => {
    navigate(`/?lang=${lang}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold text-gray-900">Drevaia</span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

          <Link to="/" className="hover:text-purple-600">Inicio</Link>
          <Link to="/library" className="hover:text-purple-600">Biblioteca</Link>
          <a href="#ebooks" className="hover:text-purple-600">Ebooks</a>

          {/* 🌍 IDIOMAS */}
          <div className="flex gap-2 ml-4">
            <button onClick={() => changeLang('es')}>🇪🇸</button>
            <button onClick={() => changeLang('en')}>🇬🇧</button>
            <button onClick={() => changeLang('fr')}>🇫🇷</button>
            <button onClick={() => changeLang('pt')}>🇧🇷</button>
          </div>

        </div>
      </div>
    </nav>
  );
}
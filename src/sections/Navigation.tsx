import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sparkles, Moon, Sun, BookOpen, Home, FileText, Users, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchModal } from '@/components/SearchModal';
import { CartDrawer } from '@/components/CartDrawer';
import { useAuth } from '@/hooks/useAuth';
import type { Language, Translations } from '@/i18n';
import { useTheme } from '@/hooks/useTheme';

interface NavigationProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function Navigation({ t, language, changeLanguage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { isAuthenticated, profile, signOut } = useAuth();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDark
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <Sparkles className={`w-6 h-6 transition-colors ${isScrolled || !isHomePage ? (isDark ? 'text-purple-400' : 'text-purple-600') : 'text-white'}`} />
            <span className={`text-xl font-bold transition-colors ${isScrolled || !isHomePage ? (isDark ? 'text-white' : 'text-gray-900') : 'text-white'}`}>
              Drevaia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/90'
              }`}
            >
              <Home className="w-4 h-4 inline mr-1" />
              {t.nav.home}
            </Link>
            <Link
              to="/library"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/90'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-1" />
              {t.nav.ebooks}
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/90'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Blog
            </Link>
            <Link
              to="/portal"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/90'
              }`}
            >
              <Users className="w-4 h-4 inline mr-1" />
              Portal
            </Link>
            <Link
              to="/legal/privacy"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white/90'
              }`}
            >
              {t.nav.legal}
            </Link>

            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className={`rounded-full ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700') : 'text-white'}`}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <div className={isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white'}>
              <CartDrawer language={language} />
            </div>

            {/* Dark Mode Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700') : 'text-white'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white'}`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{languages.find((l) => l.code === language)?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/95'} backdrop-blur-sm`}>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`cursor-pointer ${isDark ? 'text-gray-300 hover:bg-gray-700' : ''}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile / Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white'}`}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="hidden sm:inline">{profile?.full_name?.split(' ')[0] || 'Usuario'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/95'} backdrop-blur-sm`}>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className={`cursor-pointer ${isDark ? 'text-gray-300' : ''}`}>
                      <User className="w-4 h-4 mr-2" />
                      {language === 'es' ? 'Mi perfil' : language === 'en' ? 'My profile' : language === 'fr' ? 'Mon profil' : 'Meu perfil'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className={`cursor-pointer ${isDark ? 'text-gray-300' : ''}`}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Cerrar sesión' : language === 'en' ? 'Sign out' : language === 'fr' ? 'Déconnexion' : 'Sair'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white'}`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === 'es' ? 'Entrar' : language === 'en' ? 'Sign in' : language === 'fr' ? 'Connexion' : 'Entrar'}
                  </span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className={`p-2 ${isScrolled || !isHomePage ? (isDark ? 'text-gray-300' : 'text-gray-900') : 'text-white'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isScrolled || !isHomePage ? (isDark ? 'text-white' : 'text-gray-900') : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md rounded-b-2xl shadow-lg`}>
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                {t.nav.home}
              </Link>
              <Link
                to="/library"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                {t.nav.ebooks}
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Blog
              </Link>
              <Link
                to="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Portal
              </Link>
              <Link
                to="/legal/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
              >
                {t.nav.legal}
              </Link>
              <div className={`pt-2 border-t ${isDark ? 'border-gray-700' : ''}`}>
                <p className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Idioma / Language</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`p-2 rounded-lg ${
                        language === lang.code
                          ? isDark
                            ? 'bg-purple-900 text-purple-300'
                            : 'bg-purple-100 text-purple-700'
                          : isDark
                            ? 'bg-gray-800 text-gray-400'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        language={language}
      />
    </nav>
  );
}

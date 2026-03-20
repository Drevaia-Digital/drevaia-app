import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, BookOpen, FileText, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchEngine } from '@/engines/search-engine';
import type { Language } from '@/i18n';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface LocalSearchResult {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'post';
  url: string;
  category?: string;
}

export function SearchModal({ isOpen, onClose, language }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocalSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const labels = {
    placeholder: language === 'es' ? 'Buscar libros, artículos...' : language === 'en' ? 'Search books, articles...' : language === 'fr' ? 'Rechercher des livres, articles...' : 'Buscar livros, artigos...',
    noResults: language === 'es' ? 'No se encontraron resultados' : language === 'en' ? 'No results found' : language === 'fr' ? 'Aucun résultat trouvé' : 'Nenhum resultado encontrado',
    books: language === 'es' ? 'Libros' : language === 'en' ? 'Books' : language === 'fr' ? 'Livres' : 'Livros',
    articles: language === 'es' ? 'Artículos' : language === 'en' ? 'Articles' : language === 'fr' ? 'Articles' : 'Artigos',
    suggestions: language === 'es' ? 'Sugerencias' : language === 'en' ? 'Suggestions' : language === 'fr' ? 'Suggestions' : 'Sugestões',
    recent: language === 'es' ? 'Búsquedas recientes' : language === 'en' ? 'Recent searches' : language === 'fr' ? 'Recherches récentes' : 'Pesquisas recentes',
  };

  // Load recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('drevaia-recent-searches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSuggestions([]);
      setSelectedIndex(-1);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    
    try {
      const searchResults = await searchEngine.search(searchQuery, {
        languages: [language],
        types: ['library', 'blog'],
        limit: 10,
      });

      setResults(searchResults.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description || (r as { excerpt?: string }).excerpt || '',
        type: (r.type === 'library' ? 'book' : 'post') as 'book' | 'post',
        url: r.url,
        category: r.category,
      })));

      // Get suggestions
      const suggestionResults = await searchEngine.getSuggestions(searchQuery, language, 5);
      setSuggestions(suggestionResults.map((s: { title: string }) => s.title));
    } catch (error) {
      console.error('Search error:', error);
    }

    setLoading(false);
  }, [language]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('drevaia-recent-searches', JSON.stringify(updated));
  };

  const handleSelect = (result: LocalSearchResult) => {
    saveRecentSearch(query || result.title);
    onClose();
    navigate(result.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length + suggestions.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        } else if (selectedIndex >= results.length) {
          const suggestionIndex = selectedIndex - results.length;
          setQuery(suggestions[suggestionIndex]);
        } else if (query.trim()) {
          saveRecentSearch(query);
          navigate(`/search?q=${encodeURIComponent(query)}`);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('drevaia-recent-searches');
  };

  if (!isOpen) return null;

  const bookResults = results.filter(r => r.type === 'book');
  const postResults = results.filter(r => r.type === 'post');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={labels.placeholder}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
          />
          {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 uppercase">{labels.recent}</span>
                <button 
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  {language === 'es' ? 'Borrar' : 'Clear'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <>
              {results.length === 0 && !loading && (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{labels.noResults}</p>
                </div>
              )}

              {/* Books */}
              {bookResults.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {labels.books}
                  </h3>
                  <div className="space-y-2">
                    {bookResults.map((result, idx) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className={`w-full text-left p-3 rounded-xl transition-colors ${
                          selectedIndex === idx
                            ? 'bg-purple-100 dark:bg-purple-900/30'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {result.description}
                        </div>
                        {result.category && (
                          <span className="inline-block mt-2 text-xs text-purple-600 dark:text-purple-400">
                            {result.category}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {postResults.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {labels.articles}
                  </h3>
                  <div className="space-y-2">
                    {postResults.map((result, idx) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className={`w-full text-left p-3 rounded-xl transition-colors ${
                          selectedIndex === bookResults.length + idx
                            ? 'bg-purple-100 dark:bg-purple-900/30'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {result.description}
                        </div>
                        {result.category && (
                          <span className="inline-block mt-2 text-xs text-purple-600 dark:text-purple-400">
                            {result.category}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">
                    {labels.suggestions}
                  </h3>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(suggestion)}
                        className={`w-full text-left p-2 rounded-lg flex items-center gap-2 transition-colors ${
                          selectedIndex === results.length + idx
                            ? 'bg-purple-100 dark:bg-purple-900/30'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border">↑↓</kbd>
              {language === 'es' ? 'navegar' : 'navigate'}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border">↵</kbd>
              {language === 'es' ? 'seleccionar' : 'select'}
            </span>
          </div>
          <span>
            {results.length} {language === 'es' ? 'resultados' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
}

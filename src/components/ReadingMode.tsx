import { useState, useEffect } from 'react';
import { BookOpen, X, Type, Moon, Sun, Minus, Plus, AlignLeft, AlignCenter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/i18n';

interface ReadingModeProps {
  content: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type Theme = 'light' | 'dark' | 'sepia';
type Alignment = 'left' | 'center';

export function ReadingMode({ content, title, isOpen, onClose, language }: ReadingModeProps) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [theme, setTheme] = useState<Theme>('light');
  const [alignment, setAlignment] = useState<Alignment>('left');

  const labels = {
    title: language === 'es' ? 'Modo Lectura' : language === 'en' ? 'Reading Mode' : language === 'fr' ? 'Mode Lecture' : 'Modo Leitura',
    fontSize: language === 'es' ? 'Tamaño' : language === 'en' ? 'Size' : language === 'fr' ? 'Taille' : 'Tamanho',
    theme: language === 'es' ? 'Tema' : language === 'en' ? 'Theme' : language === 'fr' ? 'Thème' : 'Tema',
    alignment: language === 'es' ? 'Alineación' : language === 'en' ? 'Alignment' : language === 'fr' ? 'Alignement' : 'Alinhamento',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const fontSizeClasses: Record<FontSize, string> = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl',
  };

  const themeClasses: Record<Theme, string> = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-gray-100',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  };

  const alignmentClasses: Record<Alignment, string> = {
    left: 'text-left',
    center: 'text-center',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${themeClasses[theme]} transition-colors duration-300`}
      />

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-200/20">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 opacity-60" />
          <span className="font-medium opacity-80 truncate max-w-[200px] md:max-w-md">
            {title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size */}
          <div className="flex items-center gap-1 bg-black/5 rounded-lg p-1">
            <button
              onClick={() => setFontSize('small')}
              className={`p-2 rounded transition-colors ${fontSize === 'small' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              title={labels.fontSize}
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`p-2 rounded transition-colors ${fontSize === 'medium' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`p-2 rounded transition-colors ${fontSize === 'large' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Theme */}
          <div className="flex items-center gap-1 bg-black/5 rounded-lg p-1">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded transition-colors ${theme === 'light' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              title={labels.theme}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-2 rounded transition-colors ${theme === 'sepia' ? 'bg-[#e8dec0] shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded transition-colors ${theme === 'dark' ? 'bg-gray-700 shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 bg-black/5 rounded-lg p-1">
            <button
              onClick={() => setAlignment('left')}
              className={`p-2 rounded transition-colors ${alignment === 'left' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              title={labels.alignment}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAlignment('center')}
              className={`p-2 rounded transition-colors ${alignment === 'center' ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
          </div>

          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="relative flex-1 overflow-y-auto">
        <article 
          className={`max-w-3xl mx-auto px-6 md:px-12 py-12 ${fontSizeClasses[fontSize]} ${alignmentClasses[alignment]}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {title}
          </h1>
          <div 
            className="prose prose-lg max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>

      {/* Progress Bar */}
      <div className="relative h-1 bg-gray-200/20">
        <div 
          className="h-full bg-purple-500 transition-all duration-100"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}

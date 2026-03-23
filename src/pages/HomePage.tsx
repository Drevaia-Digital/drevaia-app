import type { Language } from '@/i18n';

interface HomePageProps {
  language: Language;
}

export function HomePage({}: HomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        HOME SAFE MODE
      </h1>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Heart, BookOpen, FileText, 
  LogOut, Edit3, Loader2, 
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useAuth } from '@/hooks/useAuth';
import { favoriteService } from '@/services/favorites';
import type { Favorite } from '@/lib/supabase';
import type { Translations, Language } from '@/i18n';

interface ProfilePageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export function ProfilePage({ t, language }: ProfilePageProps) {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut, updateProfile } = useAuth();
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const labels = {
    title: language === 'es' ? 'Mi Perfil' : language === 'en' ? 'My Profile' : language === 'fr' ? 'Mon Profil' : 'Meu Perfil',
    favorites: language === 'es' ? 'Mis Favoritos' : language === 'en' ? 'My Favorites' : language === 'fr' ? 'Mes Favoris' : 'Meus Favoritos',
    books: language === 'es' ? 'Libros' : language === 'en' ? 'Books' : language === 'fr' ? 'Livres' : 'Livros',
    articles: language === 'es' ? 'Artículos' : language === 'en' ? 'Articles' : language === 'fr' ? 'Articles' : 'Artigos',
    noFavorites: language === 'es' ? 'No tienes favoritos aún' : language === 'en' ? 'No favorites yet' : language === 'fr' ? 'Pas encore de favoris' : 'Ainda sem favoritos',
    editProfile: language === 'es' ? 'Editar perfil' : language === 'en' ? 'Edit profile' : language === 'fr' ? 'Modifier le profil' : 'Editar perfil',
    save: language === 'es' ? 'Guardar' : language === 'en' ? 'Save' : language === 'fr' ? 'Enregistrer' : 'Salvar',
    cancel: language === 'es' ? 'Cancelar' : language === 'en' ? 'Cancel' : language === 'fr' ? 'Annuler' : 'Cancelar',
    logout: language === 'es' ? 'Cerrar sesión' : language === 'en' ? 'Sign out' : language === 'fr' ? 'Déconnexion' : 'Sair',
    email: language === 'es' ? 'Correo' : language === 'en' ? 'Email' : language === 'fr' ? 'E-mail' : 'E-mail',
    name: language === 'es' ? 'Nombre' : language === 'en' ? 'Name' : language === 'fr' ? 'Nom' : 'Nome',
    memberSince: language === 'es' ? 'Miembro desde' : language === 'en' ? 'Member since' : language === 'fr' ? 'Membre depuis' : 'Membro desde',
    remove: language === 'es' ? 'Eliminar' : language === 'en' ? 'Remove' : language === 'fr' ? 'Supprimer' : 'Remover',
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (user) {
      loadFavorites();
      setFullName(profile?.full_name || '');
    }
  }, [user, isAuthenticated, authLoading, navigate, profile]);

  const loadFavorites = async () => {
    if (!user) return;
    try {
      setIsLoadingFavorites(true);
      const data = await favoriteService.getFavorites(user.id);
      setFavorites(data);
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ full_name: fullName });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveFavorite = async (itemId: string, itemType: 'book' | 'post') => {
    if (!user) return;
    try {
      await favoriteService.removeFavorite(user.id, itemId, itemType);
      await loadFavorites();
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const bookFavorites = favorites.filter(f => f.item_type === 'book');
  const postFavorites = favorites.filter(f => f.item_type === 'post');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={labels.title}
        description={labels.title}
        language={language}
      />
      
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-3xl p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={labels.name}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                    <div className="flex gap-2 justify-center md:justify-start">
                      <Button 
                        size="sm" 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-white text-purple-600 hover:bg-white/90"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : labels.save}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {labels.cancel}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">
                      {profile?.full_name || user?.email?.split('@')[0]}
                    </h1>
                    <p className="text-white/80 mb-2">{user?.email}</p>
                    <p className="text-sm text-white/60">
                      {labels.memberSince} {new Date(user?.created_at || '').toLocaleDateString()}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="mt-3 border-white/30 text-white hover:bg-white/10"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {labels.editProfile}
                    </Button>
                  </>
                )}
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {labels.logout}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookFavorites.length}
              </div>
              <div className="text-sm text-gray-500">{labels.books}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <FileText className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {postFavorites.length}
              </div>
              <div className="text-sm text-gray-500">{labels.articles}</div>
            </div>
          </div>

          {/* Favorites */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              {labels.favorites}
            </h2>

            {isLoadingFavorites ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">{labels.noFavorites}</p>
                <div className="flex gap-4 justify-center mt-4">
                  <Link to="/library">
                    <Button variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {labels.books}
                    </Button>
                  </Link>
                  <Link to="/blog">
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      {labels.articles}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Book Favorites */}
                {bookFavorites.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
                      {labels.books}
                    </h3>
                    <div className="space-y-2">
                      {bookFavorites.map((fav) => (
                        <div 
                          key={fav.id} 
                          className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={fav.url}
                              className="font-medium text-gray-900 dark:text-white hover:text-purple-600 truncate block"
                            >
                              {fav.title}
                            </Link>
                          </div>
                          <button
                            onClick={() => handleRemoveFavorite(fav.item_id, 'book')}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post Favorites */}
                {postFavorites.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
                      {labels.articles}
                    </h3>
                    <div className="space-y-2">
                      {postFavorites.map((fav) => (
                        <div 
                          key={fav.id} 
                          className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={fav.url}
                              className="font-medium text-gray-900 dark:text-white hover:text-purple-600 truncate block"
                            >
                              {fav.title}
                            </Link>
                          </div>
                          <button
                            onClick={() => handleRemoveFavorite(fav.item_id, 'post')}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

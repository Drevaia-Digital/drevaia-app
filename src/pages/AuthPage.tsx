import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Chrome, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useAuth } from '@/hooks/useAuth';
import type { Translations, Language } from '@/i18n';

interface AuthPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
  mode: 'login' | 'register' | 'forgot-password';
}

export function AuthPage({ t, language, changeLanguage, mode }: AuthPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, signInWithGoogle, resetPassword, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const labels = {
    login: {
      title: language === 'es' ? 'Iniciar sesión' : language === 'en' ? 'Sign In' : language === 'fr' ? 'Connexion' : 'Entrar',
      subtitle: language === 'es' ? 'Bienvenido de vuelta' : language === 'en' ? 'Welcome back' : language === 'fr' ? 'Bon retour' : 'Bem-vindo de volta',
      button: language === 'es' ? 'Iniciar sesión' : language === 'en' ? 'Sign In' : language === 'fr' ? 'Se connecter' : 'Entrar',
      noAccount: language === 'es' ? '¿No tienes cuenta?' : language === 'en' ? "Don't have an account?" : language === 'fr' ? "Pas de compte?" : 'Não tem conta?',
      registerLink: language === 'es' ? 'Regístrate' : language === 'en' ? 'Sign up' : language === 'fr' ? 'Inscrivez-vous' : 'Cadastre-se',
    },
    register: {
      title: language === 'es' ? 'Crear cuenta' : language === 'en' ? 'Create Account' : language === 'fr' ? 'Créer un compte' : 'Criar conta',
      subtitle: language === 'es' ? 'Únete a la comunidad Drevaia' : language === 'en' ? 'Join the Drevaia community' : language === 'fr' ? 'Rejoignez la communauté Drevaia' : 'Junte-se à comunidade Drevaia',
      button: language === 'es' ? 'Crear cuenta' : language === 'en' ? 'Create Account' : language === 'fr' ? 'Créer un compte' : 'Criar conta',
      hasAccount: language === 'es' ? '¿Ya tienes cuenta?' : language === 'en' ? 'Already have an account?' : language === 'fr' ? 'Déjà un compte?' : 'Já tem conta?',
      loginLink: language === 'es' ? 'Inicia sesión' : language === 'en' ? 'Sign in' : language === 'fr' ? 'Connectez-vous' : 'Entre',
    },
    'forgot-password': {
      title: language === 'es' ? 'Recuperar contraseña' : language === 'en' ? 'Reset Password' : language === 'fr' ? 'Réinitialiser le mot de passe' : 'Redefinir senha',
      subtitle: language === 'es' ? 'Te enviaremos un enlace para restablecer tu contraseña' : language === 'en' ? 'We will send you a link to reset your password' : language === 'fr' ? 'Nous vous enverrons un lien pour réinitialiser votre mot de passe' : 'Enviaremos um link para redefinir sua senha',
      button: language === 'es' ? 'Enviar enlace' : language === 'en' ? 'Send Link' : language === 'fr' ? 'Envoyer le lien' : 'Enviar link',
      backToLogin: language === 'es' ? 'Volver al inicio de sesión' : language === 'en' ? 'Back to sign in' : language === 'fr' ? 'Retour à la connexion' : 'Voltar ao login',
    },
    email: language === 'es' ? 'Correo electrónico' : language === 'en' ? 'Email' : language === 'fr' ? 'E-mail' : 'E-mail',
    password: language === 'es' ? 'Contraseña' : language === 'en' ? 'Password' : language === 'fr' ? 'Mot de passe' : 'Senha',
    fullName: language === 'es' ? 'Nombre completo' : language === 'en' ? 'Full name' : language === 'fr' ? 'Nom complet' : 'Nome completo',
    orContinueWith: language === 'es' ? 'O continúa con' : language === 'en' ? 'Or continue with' : language === 'fr' ? 'Ou continuez avec' : 'Ou continue com',
    google: language === 'es' ? 'Google' : language === 'en' ? 'Google' : language === 'fr' ? 'Google' : 'Google',
    forgotPasswordLink: language === 'es' ? '¿Olvidaste tu contraseña?' : language === 'en' ? 'Forgot password?' : language === 'fr' ? 'Mot de passe oublié?' : 'Esqueceu a senha?',
  };

  const currentLabels = labels[mode];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
  await signIn(email, password);
  navigate(from, { replace: true });

} else if (mode === 'register') {
  await signUp(email, password, fullName);

  // 🔥 ENVIAR A BREVO
  await fetch("/api/brevo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      fullName,
    }),
  });

  setSuccess(
    language === 'es'
      ? 'Cuenta creada. Revisa tu correo para confirmar.'
      : 'Account created. Check your email to confirm.'
  );

} else if (mode === 'forgot-password') {
  await resetPassword(email);
  setSuccess(
    language === 'es'
      ? 'Enlace enviado. Revisa tu correo.'
      : 'Link sent. Check your email.'
  );
}
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={currentLabels.title}
        description={currentLabels.subtitle}
        language={language}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'es' ? 'Volver al inicio' : language === 'en' ? 'Back to home' : language === 'fr' ? 'Retour à l\'accueil' : 'Voltar ao início'}
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLabels.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentLabels.subtitle}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 text-green-600 dark:text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {labels.fullName}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {labels.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {mode !== 'forgot-password' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {labels.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required={true}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <Link 
                  to="/auth/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  {labels.forgotPasswordLink}
                </Link>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">{language === 'es' ? 'Cargando...' : 'Loading...'}</span>
              ) : (
                currentLabels.button
              )}
            </Button>
          </form>

          {/* Divider */}
          {mode !== 'forgot-password' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                    {labels.orContinueWith}
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Chrome className="w-5 h-5 mr-2" />
                {labels.google}
              </Button>
            </>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-600 dark:text-gray-400">
                {labels.login.noAccount}{' '}
                <Link to="/auth/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  {labels.login.registerLink}
                </Link>
              </p>
            ) : mode === 'register' ? (
              <p className="text-gray-600 dark:text-gray-400">
                {labels.register.hasAccount}{' '}
                <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  {labels.register.loginLink}
                </Link>
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  {labels['forgot-password'].backToLogin}
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

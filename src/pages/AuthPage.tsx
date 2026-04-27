import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { GlowCursor } from '@/components/GlowCursor';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useAuth } from '@/hooks/useAuth';

export function AuthPage({ t, language, mode }: any) {
  const { lang } = useParams();

  const currentLang =
    lang === 'en' || lang === 'fr' || lang === 'pt' || lang === 'es'
      ? lang
      : language || 'es';

  const authText: any = {
    es: {
      back: 'Volver',
      login: 'Iniciar sesión',
      register: 'Crear cuenta',
      welcome: 'Bienvenido de nuevo',
      space: 'Un espacio para ti',
      email: 'Correo electrónico',
      emailHelp: 'Solo lo usaremos para tu acceso',
      password: 'Crea una contraseña segura',
      loading: 'Cargando...',
      enter: 'Entrar',
      create: 'Crear mi cuenta',
      phrase: 'Aquí puedes ser tú, sin filtros.',
      privacy: 'No compartimos tu información. Sin spam.',
      needEmail: 'Escribe tu correo',
      invalidEmail: 'Correo no válido',
      needPassword: 'Crea una contraseña',
      minPassword: 'Mínimo 6 caracteres',
    },

    en: {
      back: 'Back',
      login: 'Sign in',
      register: 'Create account',
      welcome: 'Welcome back',
      space: 'A space for you',
      email: 'Email address',
      emailHelp: 'Used only for your access',
      password: 'Create a secure password',
      loading: 'Loading...',
      enter: 'Enter',
      create: 'Create my account',
      phrase: 'Here you can be yourself, without filters.',
      privacy: 'We do not share your information. No spam.',
      needEmail: 'Enter your email',
      invalidEmail: 'Invalid email',
      needPassword: 'Create a password',
      minPassword: 'Minimum 6 characters',
    },

    fr: {
      back: 'Retour',
      login: 'Connexion',
      register: 'Créer un compte',
      welcome: 'Bon retour',
      space: 'Un espace pour vous',
      email: 'Adresse e-mail',
      emailHelp: 'Utilisé uniquement pour votre accès',
      password: 'Créez un mot de passe sécurisé',
      loading: 'Chargement...',
      enter: 'Entrer',
      create: 'Créer mon compte',
      phrase: 'Ici, vous pouvez être vous-même.',
      privacy: 'Nous ne partageons pas vos informations.',
      needEmail: 'Entrez votre e-mail',
      invalidEmail: 'E-mail invalide',
      needPassword: 'Créez un mot de passe',
      minPassword: 'Minimum 6 caractères',
    },

    pt: {
      back: 'Voltar',
      login: 'Entrar',
      register: 'Criar conta',
      welcome: 'Bem-vindo de volta',
      space: 'Um espaço para você',
      email: 'E-mail',
      emailHelp: 'Usado apenas para seu acesso',
      password: 'Crie uma senha segura',
      loading: 'Carregando...',
      enter: 'Entrar',
      create: 'Criar minha conta',
      phrase: 'Aqui você pode ser você mesmo.',
      privacy: 'Não compartilhamos suas informações.',
      needEmail: 'Digite seu e-mail',
      invalidEmail: 'E-mail inválido',
      needPassword: 'Crie uma senha',
      minPassword: 'Mínimo 6 caracteres',
    },
  };

  const A = authText[currentLang];

  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = A.needEmail;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = A.invalidEmail;
    }

    if (!password) {
      newErrors.password = A.needPassword;
    } else if (password.length < 6) {
      newErrors.password = A.minPassword;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    if (mode === 'login') {
      await signIn(email, password);
      navigate(`/${currentLang}/onboarding`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <GlowCursor />

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <SEO title="Auth" description="Auth Drevaia" language={currentLang} />
      <Navigation />

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-md mx-auto px-4">
          <Link
            to={`/${currentLang}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {A.back}
          </Link>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {mode === 'login' ? A.login : A.register}
              </h1>

              <p className="text-gray-300">
                {mode === 'login' ? A.welcome : A.space}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition" />

                <Input
                  type="email"
                  placeholder={A.email}
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);

                    setErrors((prev) => ({
                      ...prev,
                      email:
                        !value
                          ? A.needEmail
                          : !/\S+@\S+\.\S+/.test(value)
                          ? A.invalidEmail
                          : undefined,
                    }));
                  }}
                  className={`pl-10 w-full bg-white/10 text-white placeholder:text-white/50 border rounded-lg px-4 py-2.5 transition-all duration-300
                  ${errors.email ? 'border-red-500' : 'border-white/10'}
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                  focus:shadow-[0_0_25px_rgba(168,85,247,0.25)]`}
                />

                <p className="text-xs text-gray-400 mt-2 ml-1">
                  {A.emailHelp}
                </p>

                {email && errors.email && (
                  <p className="text-xs text-red-400 mt-1 ml-1 animate-pulse">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition" />

                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={A.password}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);

                    setErrors((prev) => ({
                      ...prev,
                      password:
                        !value
                          ? A.needPassword
                          : value.length < 6
                          ? A.minPassword
                          : undefined,
                    }));
                  }}
                  className={`pl-10 pr-10 w-full bg-white/10 text-white placeholder:text-white/50 border rounded-lg px-4 py-2.5 transition-all duration-300
                  ${errors.password ? 'border-red-500' : 'border-white/10'}
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                  focus:shadow-[0_0_25px_rgba(168,85,247,0.25)]`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition active:scale-90"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {password && errors.password && (
                  <p className="text-xs text-red-400 mt-1 ml-1 animate-pulse">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-amber-500
                hover:from-purple-700 hover:to-amber-600
                transition-all duration-300
                hover:scale-105 active:scale-95
                hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                disabled:opacity-50"
              >
                {isLoading
                  ? A.loading
                  : mode === 'login'
                  ? A.enter
                  : A.create}
              </Button>

              <p className="text-sm text-gray-400 text-center">
                {A.phrase}
              </p>

              <p className="text-xs text-gray-500 text-center">
                {A.privacy}
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
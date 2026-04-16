import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { GlowCursor } from '@/components/GlowCursor';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useAuth } from '@/hooks/useAuth';

export function AuthPage({ t, language, changeLanguage, mode }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading } = useAuth();

  // 🔥 STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const from = (location.state as any)?.from?.pathname || '/';

  // ✅ VALIDACIÓN FINAL (al enviar)
  const validate = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = "Escribe tu correo";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo no válido";
    }

    if (!password) {
      newErrors.password = "Crea una contraseña";
    } else if (password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      await signIn(email, password);
      navigate(from, { replace: true });
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

      <SEO title="Auth" description="Auth Drevaia" language={language} />
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-md mx-auto px-4">

          {/* BACK */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          {/* CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </h1>
              <p className="text-gray-300">
                {mode === 'login' ? 'Bienvenido de nuevo' : 'Un espacio para ti'}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);

                    setErrors((prev) => ({
                      ...prev,
                      email:
                        !value
                          ? "Escribe tu correo"
                          : !/\S+@\S+\.\S+/.test(value)
                          ? "Correo no válido"
                          : undefined,
                    }));
                  }}
                  className={`pl-10 w-full bg-white/10 text-white placeholder:text-white/50 border rounded-lg px-4 py-3
                  ${errors.email ? "border-red-500" : "border-white/10"}
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
                />

                <p className="text-xs text-gray-500 mt-1 ml-1">
  Solo lo usaremos para tu acceso
</p>
                {email && errors.email && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Crea una contraseña segura"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);

                    setErrors((prev) => ({
                      ...prev,
                      password:
                        !value
                          ? "Crea una contraseña"
                          : value.length < 6
                          ? "Mínimo 6 caracteres"
                          : undefined,
                    }));
                  }}
                  className={`pl-10 pr-10 w-full bg-white/10 text-white placeholder:text-white/50 border rounded-lg px-4 py-3
                  ${errors.password ? "border-red-500" : "border-white/10"}
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
                />

                {/* 👁 OJO */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {password && errors.password && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                {isLoading
                  ? 'Cargando...'
                  : mode === 'login'
                  ? 'Entrar'
                  : 'Crear mi cuenta'}
              </Button>

              {/* COPY */}
              <p className="text-sm text-gray-400 text-center">
                Aquí puedes ser tú, sin filtros.
              </p>

              <p className="text-xs text-gray-500 text-center">
                No compartimos tu información. Sin spam.
              </p>

            </form>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
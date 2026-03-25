import { Link } from 'react-router-dom';
import { Heart, Instagram, Mail, Sparkles, BookOpen, FileText, Users, Shield } from 'lucide-react';

// Custom social media icons
const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export function Footer(_: any) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-purple-900 to-purple-950 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-2xl font-bold">Drevaia Digital</span>
            </div>
            <p className="text-purple-200 text-sm">
              Una biblioteca emocional diseñada para sanar, evolucionar y transformar tu vida desde dentro.
            </p>

            <div className="flex gap-3">
              <a href="https://www.tiktok.com/@drevaia.digital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <TikTokIcon />
              </a>
              <a href="https://www.instagram.com/drevaia.digital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@Drevaia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <YouTubeIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578074633618" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <FacebookIcon />
              </a>
              <a href="mailto:noadrevaia@gmail.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explorar + Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explorar</h3>

            <ul className="space-y-2 text-purple-200 text-sm">

              <li>
                <Link to="/library" className="flex items-center gap-2 hover:text-white">
                  <BookOpen className="w-4 h-4" /> Ebooks
                </Link>
              </li>

              <li>
                <Link to="/blog" className="flex items-center gap-2 hover:text-white">
                  <FileText className="w-4 h-4" /> Blog
                </Link>
              </li>

              <li>
                <Link to="/portal" className="flex items-center gap-2 hover:text-white">
                  <Users className="w-4 h-4" /> Portal
                </Link>
              </li>

              <li className="mt-4 text-white font-semibold">Legal</li>

              <li>
                <Link to="/legal/privacy" className="flex items-center gap-2 hover:text-white">
                  <Shield className="w-4 h-4" /> Privacidad
                </Link>
              </li>

              <li>
                <Link to="/legal/cookies" className="flex items-center gap-2 hover:text-white">
                  <Shield className="w-4 h-4" /> Cookies
                </Link>
              </li>

              <li>
                <Link to="/legal/refunds" className="flex items-center gap-2 hover:text-white">
                  <Shield className="w-4 h-4" /> Reembolsos
                </Link>
              </li>

              <li>
                <a href="https://payhip.com/DrevaiaDigital" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Tienda Payhip
                </a>
              </li>

            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conecta con Drevaia</h3>
            <p className="text-purple-200 text-sm mb-4">
              Recibe inspiración y novedades directamente en tu correo.
            </p>

            <Link to="/#register" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-sm font-medium hover:opacity-90">
              <Heart className="w-4 h-4" />
              Suscribirme
            </Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between text-sm text-purple-300">
          <p>© {currentYear} Drevaia Digital</p>
          <p>Hecho con ❤️ por Noa Drevaia</p>
        </div>

      </div>
    </footer>
  );
}

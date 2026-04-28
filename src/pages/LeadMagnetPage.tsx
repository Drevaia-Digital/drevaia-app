import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function LeadMagnetPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🌍 Idioma REAL por URL
  const path = window.location.pathname.toLowerCase();

  const language =
    path.startsWith("/en")
      ? "en"
      : path.startsWith("/fr")
      ? "fr"
      : path.startsWith("/pt")
      ? "pt"
      : "es";

  const texts = {
    es: {
      title1: "No estás perdido.",
      title2: "Solo estás desconectado de ti.",
      subtitle:
        "Nadie te enseñó a escucharte. Pero puedes empezar ahora.",
      placeholder: "Tu email aquí...",
      button: "Quiero empezar",
      loading: "Enviando...",
      success: "Revisa tu correo ✨",
      error: "No se pudo enviar. Intenta de nuevo.",
      footer:
        "No puedes sanar lo que no escuchas. Tu cuerpo es el diario en el que tu alma escribe.",
      seoTitle: "Empieza contigo | Drevaia",
      seoDesc:
        "No estás perdido. Aprende a escucharte y reconectar contigo desde hoy.",
    },

    en: {
      title1: "You are not lost.",
      title2: "You are just disconnected from yourself.",
      subtitle:
        "No one taught you how to listen to yourself. But you can start now.",
      placeholder: "Your email here...",
      button: "I want to begin",
      loading: "Sending...",
      success: "Check your email ✨",
      error: "Something went wrong. Try again.",
      footer:
        "You cannot heal what you do not listen to. Your body is the diary where your soul writes.",
      seoTitle: "Start with yourself | Drevaia",
      seoDesc:
        "You are not lost. Learn to reconnect with yourself starting today.",
    },

    pt: {
      title1: "Você não está perdido.",
      title2: "Você só está desconectado de si.",
      subtitle:
        "Ninguém te ensinou a se ouvir. Mas você pode começar agora.",
      placeholder: "Seu email aqui...",
      button: "Quero começar",
      loading: "Enviando...",
      success: "Verifique seu email ✨",
      error: "Algo deu errado.",
      footer:
        "Você não pode curar o que não escuta. Seu corpo é o diário onde sua alma escreve.",
      seoTitle: "Comece com você | Drevaia",
      seoDesc:
        "Você não está perdido. Reconecte-se consigo mesmo.",
    },

    fr: {
      title1: "Tu n'es pas perdu.",
      title2: "Tu es juste déconnecté de toi-même.",
      subtitle:
        "Personne ne t’a appris à t’écouter. Mais tu peux commencer maintenant.",
      placeholder: "Ton email ici...",
      button: "Je commence",
      loading: "Envoi...",
      success: "Vérifie ton email ✨",
      error: "Une erreur est survenue.",
      footer:
        "Tu ne peux pas guérir ce que tu n’écoutes pas. Ton corps est le journal où ton âme écrit.",
      seoTitle: "Commence avec toi | Drevaia",
      seoDesc:
        "Reconnecte-toi à toi-même dès aujourd’hui.",
    },
  };

  const t = texts[language as keyof typeof texts];

  // 🔌 Envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          lang: language,
        }),
      });

      const data = await res.json();
      console.log("Brevo:", data);

      if (!res.ok) throw new Error();

      setSent(true);
      setEmail("");
    } catch {
      alert(t.error);
    } finally {
      setLoading(false);
    }
  };

  const canonical =
    language === "en"
      ? "https://drevaia.com/en/empieza"
      : language === "fr"
      ? "https://drevaia.com/fr/empieza"
      : language === "pt"
      ? "https://drevaia.com/pt/empieza"
      : "https://drevaia.com/es/empieza";

  return (
    <>
      {/* SEO PREMIUM */}
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
        <div className="max-w-xl w-full text-center">

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {t.title1}
            <br />
            <span className="text-gray-300">{t.title2}</span>
          </h1>

          <p className="text-gray-400 mb-8 text-base md:text-lg">
            {t.subtitle}
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="email"
                required
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="p-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? t.loading : t.button}
              </button>

            </form>
          ) : (
            <p className="text-green-400 text-lg mt-6">
              {t.success}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-10 leading-relaxed">
            {t.footer}
          </p>

        </div>
      </div>
    </>
  );
}
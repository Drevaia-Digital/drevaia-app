import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type Lang = "es" | "en" | "fr" | "pt";

export default function LandingPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    es: {
      heroTitle: "No todo lo que buscas es información.",
      heroSubtitle: "A veces necesitas entender lo que sientes.",
      cta: "Comenzar ahora",

      aboutTitle: "¿Qué es Drevaia Digital?",
      aboutText:
        "Una biblioteca emocional donde las palabras acompañan procesos reales, no solo ideas.",

      benefits: [
        "Claridad emocional",
        "Conexión contigo",
        "Lectura transformadora",
        "Espacio para sentir"
      ],

      storyTitle: "Nuestra esencia",
      storyText:
        "Drevaia Digital no nació como un proyecto más. Nació como una respuesta al ruido, a la prisa y a la desconexión emocional. Un lugar donde detenerte, escucharte y volver a ti.",

      finalCta: "Empieza tu proceso hoy"
    },

    en: {
      heroTitle: "Not everything you need is information.",
      heroSubtitle: "Sometimes you need to understand what you feel.",
      cta: "Start now",

      aboutTitle: "What is Drevaia Digital?",
      aboutText:
        "An emotional library where words guide real human processes, not just ideas.",

      benefits: [
        "Emotional clarity",
        "Self connection",
        "Transformational reading",
        "Space to feel"
      ],

      storyTitle: "Our essence",
      storyText:
        "Drevaia Digital was born as a response to noise, speed, and emotional disconnection. A place to pause, listen, and reconnect.",

      finalCta: "Start your journey today"
    },

    fr: {
      heroTitle: "Tout ce dont tu as besoin n’est pas de l’information.",
      heroSubtitle: "Parfois, tu dois comprendre ce que tu ressens.",
      cta: "Commencer",

      aboutTitle: "Qu'est-ce que Drevaia Digital ?",
      aboutText:
        "Une bibliothèque émotionnelle où les mots accompagnent des processus réels.",

      benefits: [
        "Clarté émotionnelle",
        "Connexion à soi",
        "Lecture transformative",
        "Espace pour ressentir"
      ],

      storyTitle: "Notre essence",
      storyText:
        "Drevaia Digital est né comme une réponse au bruit et à la déconnexion émotionnelle. Un espace pour revenir à soi.",

      finalCta: "Commence ton parcours"
    },

    pt: {
      heroTitle: "Nem tudo que você precisa é informação.",
      heroSubtitle: "Às vezes você precisa entender o que sente.",
      cta: "Começar",

      aboutTitle: "O que é Drevaia Digital?",
      aboutText:
        "Uma biblioteca emocional onde as palavras acompanham processos reais.",

      benefits: [
        "Clareza emocional",
        "Conexão consigo",
        "Leitura transformadora",
        "Espaço para sentir"
      ],

      storyTitle: "Nossa essência",
      storyText:
        "Drevaia Digital nasceu como resposta ao ruído, à pressa e à desconexão emocional.",

      finalCta: "Comece sua jornada"
    }
  };

  // 🔥 fallback seguro
  const t = content[language as Lang] || content.es;

  return (
    <div className="bg-[#0f0f1a] text-white">

      {/* SEO */}
      <Helmet>
        <title>Drevaia Digital</title>
        <meta
          name="description"
          content="Biblioteca emocional con ebooks para comprenderte, sanar y transformar tu vida."
        />
      </Helmet>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
          {t.heroTitle}
        </h1>

        <p className="text-lg text-gray-300 mb-8 max-w-xl">
          {t.heroSubtitle}
        </p>

        <button
          onClick={() => navigate("/empieza")}
          className="bg-purple-600 px-8 py-4 rounded-xl text-white hover:bg-purple-700 transition text-lg"
        >
          {t.cta}
        </button>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t.aboutTitle}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t.aboutText}
        </p>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {t.benefits.map((b, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-xl">
            {b}
          </div>
        ))}
      </section>

      {/* STORY */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{t.storyTitle}</h2>
        <p className="text-gray-400 leading-relaxed">
          {t.storyText}
        </p>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 text-center">
        <button
          onClick={() => navigate("/empieza")}
          className="bg-purple-600 px-10 py-4 rounded-xl text-white text-lg hover:bg-purple-700 transition"
        >
          {t.finalCta}
        </button>
      </section>

    </div>
  );
}
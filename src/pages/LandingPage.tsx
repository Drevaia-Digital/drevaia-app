import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

type Lang = "es" | "en" | "fr" | "pt";

export default function LandingPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    es: {
      heroTop: "Drevaia Digital existe para ser ese punto de encuentro entre lo humano y lo digital:",
      heroMain: "un lugar donde las palabras no solo se leen...",
      heroHighlight: "se sienten.",
      title: "¿Qué es Drevaia Digital y por qué surgió?",
      story: `Drevaia Digital no nació como un proyecto más en internet. Nació como una respuesta.

Una respuesta al ruido constante, a la velocidad con la que el mundo exige avanzar sin detenernos a sentir.

En un entorno digital lleno de información, productividad y prisa, surgió una pregunta silenciosa:
“¿Dónde queda lo humano en medio de todo esto?”

Drevaia Digital nació precisamente ahí.

Es un espacio creado para recordar que, detrás de cada pantalla, hay una mente que piensa, un corazón que siente y una historia que merece ser escuchada.

No es solo una colección de ebooks.
Es una biblioteca emocional.

Un refugio de palabras para quienes atraviesan momentos de duda, cansancio, búsqueda o transformación.

Porque las personas no solo necesitan información…
también necesitan comprensión.

Un lugar donde detenernos.
Donde escucharnos.
Donde volver a nosotros mismos.`,
      cta: "Comenzar"
    },

    en: {
      heroTop: "Drevaia Digital exists as a meeting point between the human and the digital:",
      heroMain: "a place where words are not just read...",
      heroHighlight: "they are felt.",
      title: "What is Drevaia Digital and why was it created?",
      story: `Drevaia Digital was not born as just another project on the internet. It was born as a response.

A response to noise, speed, and the constant pressure to move forward without feeling.

In a world full of information and productivity, a silent question emerged:
“Where does the human part go?”

Drevaia was born there.

It is an emotional library.
A space to pause, listen, and reconnect.`,
      cta: "Start"
    },

    fr: {
      heroTop: "Drevaia Digital est un point de rencontre entre l’humain et le digital :",
      heroMain: "un lieu où les mots ne sont pas seulement lus...",
      heroHighlight: "ils sont ressentis.",
      title: "Qu'est-ce que Drevaia Digital ?",
      story: `Drevaia Digital est né comme une réponse au bruit et à la déconnexion émotionnelle.

Un espace pour s’arrêter, se comprendre et se retrouver.`,
      cta: "Commencer"
    },

    pt: {
      heroTop: "Drevaia Digital é um ponto de encontro entre o humano e o digital:",
      heroMain: "um lugar onde as palavras não são apenas lidas...",
      heroHighlight: "são sentidas.",
      title: "O que é Drevaia Digital?",
      story: `Drevaia Digital nasceu como uma resposta ao ruído e à desconexão emocional.

Um espaço para parar, sentir e voltar para si.`,
      cta: "Começar"
    }
  };

  const t = content[language as Lang] || content.es;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-gradient-to-b from-[#3a0a5c] to-[#0f0f1a] text-white px-6 py-20 text-center overflow-hidden"
    >
      <Helmet>
        <title>Drevaia Digital</title>
      </Helmet>

      {/* ✨ PARTÍCULAS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto mb-16 relative z-10"
      >
        <p className="text-gray-300 mb-4">{t.heroTop}</p>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {t.heroMain}
        </h1>

        {/* ✨ GLOW */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-yellow-400 relative inline-block"
        >
          <span className="relative z-10">{t.heroHighlight}</span>
          <span className="absolute inset-0 blur-2xl opacity-40 bg-yellow-400 rounded-full animate-pulse" />
        </motion.h2>
      </motion.div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-2xl font-bold mb-8 relative z-10"
      >
        {t.title}
      </motion.h2>

      {/* STORY */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="max-w-2xl mx-auto text-gray-300 leading-relaxed whitespace-pre-line mb-16 relative z-10"
      >
        {t.story}
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{
          scale: 1.07,
          boxShadow: "0px 0px 25px rgba(168,85,247,0.7)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          document.body.style.opacity = "0";
          setTimeout(() => navigate("/empieza"), 300);
        }}
        className="bg-purple-600 hover:bg-purple-700 transition px-10 py-4 rounded-xl text-lg shadow-lg relative z-10"
      >
        {t.cta}
      </motion.button>
    </motion.div>
  );
}
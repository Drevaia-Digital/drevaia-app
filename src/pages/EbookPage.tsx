import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export function EbookPage() {
  const { language } = useLanguage();

  useEffect(() => {
    console.log("EBOOK_PAGE_VIEW");
  }, []);

  const seo = {
    es: {
      title: "No sé qué hacer con mi vida | Drevaia",
      desc: "Si te sientes perdido, este ebook no te da respuestas… te despierta.",
      url: "https://drevaia.com/no-se-que-hacer-con-mi-vida"
    },
    en: {
      title: "I don't know what to do with my life | Drevaia",
      desc: "If you feel lost, this ebook doesn't give answers… it wakes you up.",
      url: "https://drevaia.com/no-se-que-hacer-con-mi-vida"
    },
    fr: {
      title: "Je ne sais pas quoi faire de ma vie | Drevaia",
      desc: "Cet ebook ne donne pas de réponses… il te réveille.",
      url: "https://drevaia.com/no-se-que-hacer-con-mi-vida"
    },
    pt: {
      title: "Não sei o que fazer com minha vida | Drevaia",
      desc: "Este ebook não dá respostas… ele te desperta.",
      url: "https://drevaia.com/no-se-que-hacer-con-mi-vida"
    }
  }[language];

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.desc} />

        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.desc} />
        <meta property="og:image" content="https://drevaia.com/logo-redes.jpg" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={seo.url} />
      </Helmet>

      <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">

          <p className="text-sm text-gray-500 mb-6">
            Esto es para ti si sientes que estás perdido.
          </p>

          <img
            src="/logo-redes.webp"
            alt="Drevaia"
            className="w-28 mx-auto mb-10 opacity-90"
          />

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
            No sabes qué hacer con tu vida…
            <br />
            <span className="text-gray-400">
              y eso te está consumiendo por dentro.
            </span>
          </h1>

          <a
            href="https://payhip.com/b/EkKRT"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white text-black py-3 rounded-xl font-semibold text-lg mb-8 hover:opacity-90 transition"
          >
            Quiero salir de este bloqueo
          </a>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            No es falta de talento.
            <br />
            No es falta de oportunidades.
            <br />
            Es que nadie te enseñó a escucharte.
          </p>

          <div className="text-left space-y-4 mb-10 text-gray-300">
            <p>Te levantas… pero no sabes hacia dónde vas.</p>
            <p>Intentas avanzar… pero sientes que algo te frena.</p>
            <p>Piensas demasiado… y actúas muy poco.</p>
            <p className="text-white">
              Y lo peor… es que empiezas a dudar de ti.
            </p>
          </div>

          <div className="mb-10">
            <p className="text-xl font-medium mb-4">
              Este ebook no te dice qué hacer.
            </p>
            <p className="text-gray-400">
              Te muestra por qué no puedes avanzar…
              <br />
              y cómo romper ese patrón desde dentro.
            </p>
          </div>

          <a
            href="https://payhip.com/b/EkKRT"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white text-black py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            Empezar a entenderme
          </a>

          <p className="text-xs text-gray-500 mt-3">
            Acceso inmediato después del pago.
          </p>

          <p className="text-xs text-gray-600 mt-1">
            Esto no es para todos.
          </p>

          <p className="text-sm text-gray-400 mt-6">
            No puedes sanar lo que no escuchas.
            <br />
            Tu cuerpo es el diario en el que tu alma escribe.
          </p>

        </div>
      </div>
    </>
  );
}
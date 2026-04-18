import { useState } from "react";

export default function LeadMagnetPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🌍 Detectar idioma del navegador
  const language =
    navigator.language.startsWith("es")
      ? "es"
      : navigator.language.startsWith("pt")
      ? "pt"
      : navigator.language.startsWith("fr")
      ? "fr"
      : "en";

  // 🧠 Textos multi-idioma
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
    },
    en: {
      title1: "You are not lost.",
      title2: "You are just disconnected from yourself.",
      subtitle:
        "No one taught you how to listen to yourself. But you can start now.",
      placeholder: "Your email here...",
      button: "Start now",
      loading: "Sending...",
      success: "Check your email ✨",
      error: "Something went wrong. Try again.",
      footer:
        "You cannot heal what you do not listen to. Your body is the diary where your soul writes.",
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
      error: "Algo deu errado. Tente novamente.",
      footer:
        "Você não pode curar o que não escuta. Seu corpo é o diário onde sua alma escreve.",
    },
    fr: {
      title1: "Tu n'es pas perdu.",
      title2: "Tu es juste déconnecté de toi-même.",
      subtitle:
        "Personne ne t’a appris à t’écouter. Mais tu peux commencer maintenant.",
      placeholder: "Ton email ici...",
      button: "Commencer",
      loading: "Envoi...",
      success: "Vérifie ton email ✨",
      error: "Une erreur est survenue.",
      footer:
        "Tu ne peux pas guérir ce que tu n’écoutes pas. Ton corps est le journal où ton âme écrit.",
    },
  };

  const t = texts[language as keyof typeof texts];

  // 🔌 Envío al backend (Cloudflare → Brevo)
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
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Respuesta Brevo:", data);

      if (!res.ok) {
        throw new Error(data?.error || "Error");
      }

      setSent(true);
      setEmail("");
    } catch (error) {
      console.error(error);
      alert(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
      <div className="max-w-xl w-full text-center">

        {/* 🔥 TITULO */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {t.title1} <br />
          <span className="text-gray-300">
            {t.title2}
          </span>
        </h1>

        {/* ✨ SUBTEXTO */}
        <p className="text-gray-400 mb-8 text-base md:text-lg">
          {t.subtitle}
        </p>

        {/* 📩 FORM */}
        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              type="email"
              required
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="p-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? t.loading : t.button}
            </button>

          </form>
        ) : (
          <div className="mt-6">
            <p className="text-green-400 text-lg">
              {t.success}
            </p>
          </div>
        )}

        {/* 🧠 FRASE FINAL */}
        <p className="text-xs text-gray-500 mt-10">
          {t.footer}
        </p>

      </div>
    </div>
  );
}
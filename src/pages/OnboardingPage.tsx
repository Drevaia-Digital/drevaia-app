import { useNavigate } from "react-router-dom";

export default function OnboardingPage({ language }: any) {
  const navigate = useNavigate();

  const content = {
    es: {
      title: "Bienvenido",
      text: "Este es un espacio para ti. Aquí puedes escucharte, reconstruirte y avanzar a tu ritmo.",
      button: "Comenzar"
    },
    en: {
      title: "Welcome",
      text: "This is a space for you. A place to reconnect, rebuild and move forward at your own pace.",
      button: "Start"
    },
    fr: {
      title: "Bienvenue",
      text: "Ceci est un espace pour vous. Un endroit pour vous reconnecter et avancer à votre rythme.",
      button: "Commencer"
    },
    pt: {
      title: "Bem-vindo",
      text: "Este é um espaço para você. Um lugar para se reconectar e seguir no seu ritmo.",
      button: "Começar"
    }
  };

  const lang = (language || "es") as "es" | "en" | "fr" | "pt";
const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6">

      <div className="max-w-md text-center">

        <h1 className="text-4xl font-bold mb-6">
          {t.title}
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          {t.text}
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-amber-500 hover:scale-105 transition"
        >
          {t.button}
        </button>

      </div>
    </div>
  );
}
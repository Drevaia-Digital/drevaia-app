import { useState } from "react";

export default function LeadMagnetPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔌 Aquí luego conectamos con tu backend / MailerLite / Zapier
    console.log("Email capturado:", email);

    setSent(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
      <div className="max-w-xl w-full text-center">

        {/* 🔥 TITULO */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          No estás perdido. <br />
          <span className="text-gray-300">
            Solo estás desconectado de ti.
          </span>
        </h1>

        {/* ✨ SUBTEXTO */}
        <p className="text-gray-400 mb-8 text-base md:text-lg">
          Nadie te enseñó a escucharte.  
          Pero puedes empezar ahora.
        </p>

        {/* 📩 FORMULARIO */}
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              required
              placeholder="Tu email aquí..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              className="p-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Quiero empezar
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <p className="text-green-400 text-lg">
              Revisa tu correo ✨
            </p>
          </div>
        )}

        {/* 🧠 FRASE MARCA */}
        <p className="text-xs text-gray-500 mt-10">
          No puedes sanar lo que no escuchas. <br />
          Tu cuerpo es el diario en el que tu alma escribe.
        </p>
      </div>
    </div>
  );
}
import { Helmet } from 'react-helmet-async';

export default function PorQueMeSientoPerdido() {
  return (
    <>
      <Helmet>
        <title>¿Por qué me siento perdido? | Drevaia Digital</title>

        <meta
          name="description"
          content="Sentirse perdido en la vida es más común de lo que parece. Descubre qué puede estar detrás de esta sensación y cómo empezar a comprenderla."
        />

        <link
          rel="canonical"
          href="https://drevaia.com/blog/por-que-me-siento-perdido"
        />

        <meta property="og:title" content="¿Por qué me siento perdido? | Drevaia Digital" />
        <meta
          property="og:description"
          content="Explora la sensación de estar perdido y lo que puede significar en tu vida."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Por qué me siento perdido?
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            A veces no sabes exactamente qué te pasa. Solo sientes que no estás donde deberías estar.
          </p>

          <p className="mb-6 text-lg">
            Muchas personas experimentan esta sensación en algún momento de su vida.
            No siempre tiene que ver con fallar… a veces tiene que ver con cambiar.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Cuando aparece la sensación de estar perdido
          </h2>

          <p className="mb-6 text-gray-300">
            Puede aparecer cuando lo que antes tenía sentido deja de tenerlo,
            o cuando aún no has descubierto qué dirección tomar.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Lo que puede estar intentando decirte
          </h2>

          <p className="mb-10 text-gray-300">
            Sentirse perdido no siempre es un error. 
            A veces es una señal de que estás dejando atrás una versión antigua de ti.
          </p>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/library"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-xl text-white"
            >
              Explorar lecturas en Drevaia
            </a>
          </div>

          {/* Marca */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-400 italic">
              ✨ Drevaia Digital
            </p>
            <p className="text-gray-500 mt-2">
              Drevaia es un espacio para comprender lo que ocurre dentro de ti.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
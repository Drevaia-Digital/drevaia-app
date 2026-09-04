import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  FileText,
  Loader2,
  Plus,
} from "lucide-react";

import { Navigation } from "@/sections/Navigation";
import { Footer } from "@/sections/Footer";
import { SEO } from "@/partials/SEO";
import { useLanguage } from "@/context/LanguageContext";

import {
  useProjects,
} from "@/application/ai/workspace/useProjects";

export default function AIStudioHistoryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const {
    projects,
    loading,
    error,
    reload,
  } = useProjects();

  const studioPath = `/${language}/studio`;

  const handleOpenProject = (id: string) => {
    navigate(`${studioPath}?project=${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-[#090611] text-white">
      <SEO
        title="Historial | DREVAIA AI Studio"
        description="Historial de proyectos editoriales creados con DREVAIA AI Studio."
        language={language}
      />

      <Navigation />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => navigate(studioPath)}
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-zinc-300
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Volver a AI Studio
          </button>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Workspace
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Historial
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Revisa y vuelve a abrir tus proyectos editoriales anteriores.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="flex items-center gap-3 text-zinc-400">
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                <span>Cargando historial...</span>
              </div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-sm text-red-300">
                {error}
              </p>

              <button
                type="button"
                onClick={() => void reload()}
                className="
                  mt-5
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Reintentar
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                <FileText
                  size={24}
                  className="text-zinc-500"
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Todavía no tienes proyectos
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                Cuando generes una Editorial Edition, aparecerá aquí
                automáticamente.
              </p>

              <button
                type="button"
                onClick={() => navigate(studioPath)}
                className="
                  mx-auto
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  transition
                  hover:scale-[1.02]
                "
              >
                <Plus size={18} />
                Nueva Editorial
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    handleOpenProject(project.id)
                  }
                  className="
                    group
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    text-left
                    transition
                    hover:border-violet-400/30
                    hover:bg-white/[0.06]
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-white">
                        {project.title ||
                          "Editorial sin título"}
                      </h2>

                      <p className="mt-2 text-sm text-zinc-500">
                        {project.workflow}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-400 transition group-hover:text-white">
                      <Clock3 size={18} />
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                    <span>
                      {project.language.toUpperCase()}
                    </span>

                    {project.createdAt && (
                      <span>
                        {new Date(
                          project.createdAt,
                        ).toLocaleString(
                          language === "es"
                            ? "es-ES"
                            : language === "fr"
                              ? "fr-FR"
                              : language === "pt"
                                ? "pt-BR"
                                : "en-US",
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          },
                        )}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
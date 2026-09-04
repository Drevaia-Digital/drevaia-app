import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { Navigation } from "@/sections/Navigation";
import { Footer } from "@/sections/Footer";
import { SEO } from "@/partials/SEO";

import {
  useLanguage,
} from "@/context/LanguageContext";

import {
  translations,
} from "@/i18n";

import {
  supabase,
} from "@/lib/supabase";

import {
  aiStudioService,
} from "@/application/ai/services/AIStudioService";

import {
  aiProjectsRepository,
} from "@/application/ai/workspace/AIProjectsRepository";

import {
  aiWorkspaceMapper,
} from "@/application/ai/workspace/AIWorkspaceMapper";

import type {
  AIWorkspaceState,
} from "@/application/ai/workspace/AIWorkspace";

import {
  INITIAL_AI_WORKSPACE,
} from "@/application/ai/workspace/AIWorkspace";

import {
  ReflectionEditor,
  EditorialCard,
  WorkspaceGrid,
  WorkspaceSidebar,
  SEOCard,
  QualityCard,
  RuntimeCard,
  KnowledgeCard,
  ActionBar,
} from "@/components/ai-studio";

import {
  exportService,
} from "@/application/export/ExportService";

export default function AIStudioPage() {
  const { language } = useLanguage();

  const {
    user,
    isLoading: authLoading,
  } = useAuth();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const t = translations[language];

  const [
    workspace,
    setWorkspace,
  ] = useState<AIWorkspaceState>(
    INITIAL_AI_WORKSPACE,
  );

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    projectLoading,
    setProjectLoading,
  ] = useState(false);

  const projectId =
    searchParams.get("project");

  /*
   * Restaura un proyecto persistido
   * cuando AI Studio recibe:
   *
   * /es/studio?project=PROJECT_ID
   */
  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      /*
       * Si no existe proyecto seleccionado,
       * dejamos un Workspace limpio.
       */
      if (!projectId) {
        if (!mounted) {
          return;
        }

        setProjectLoading(false);

        setWorkspace(
          INITIAL_AI_WORKSPACE,
        );

        return;
      }

      /*
       * Esperamos a que la autenticación
       * termine de inicializarse.
       */
      if (authLoading) {
        return;
      }

      /*
       * No intentamos cargar un proyecto
       * sin usuario autenticado.
       */
      if (!user) {
        if (!mounted) {
          return;
        }

        setProjectLoading(false);

        setWorkspace((previous) => ({
          ...previous,
          loading: false,
          error:
            "Necesitas iniciar sesión para abrir este proyecto.",
        }));

        return;
      }

      try {
        setProjectLoading(true);

        setWorkspace((previous) => ({
          ...previous,
          loading: true,
          error: null,
        }));

        const project =
          await aiProjectsRepository.get(
            projectId,
          );

        if (!mounted) {
          return;
        }

        /*
         * Convierte el proyecto persistido
         * en el estado de AI Studio.
         */
        const restoredWorkspace =
          aiWorkspaceMapper.projectToWorkspace(
            project,
          );

        setWorkspace(
          restoredWorkspace,
        );

        console.log(
          "[DREVAIA HISTORY] Project restored:",
          {
            projectId: project.id,
            userId: project.userId,
            title: project.title,
          },
        );
      } catch (error) {
        console.error(
          "[DREVAIA HISTORY] Failed to restore project:",
          error,
        );

        if (!mounted) {
          return;
        }

        setWorkspace((previous) => ({
          ...previous,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "No fue posible abrir el proyecto.",
        }));
      } finally {
        if (mounted) {
          setProjectLoading(false);
        }
      }
    };

    void loadProject();

    return () => {
      mounted = false;
    };
  }, [
    projectId,
    user,
    authLoading,
  ]);

  /*
   * Regresa a un Workspace limpio.
   */
  

  const handleCopy = async () => {
    if (!workspace.editorial) {
      return;
    }

    const success =
      await exportService.copy({
        title:
          "DREVAIA Editorial Edition",
        content:
          workspace.editorial,
      });

    if (!success) {
      return;
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleMarkdown = () => {
    if (!workspace.editorial) {
      return;
    }

    exportService.downloadMarkdown({
      title:
        "DREVAIA Editorial Edition",
      content:
        workspace.editorial,
    });
  };

  const handleGenerate = async () => {
    if (!workspace.reflection.trim()) {
      return;
    }

    if (authLoading) {
      setWorkspace((previous) => ({
        ...previous,
        error:
          "Verificando la sesión...",
      }));

      return;
    }

    const frontendStart =
      performance.now();

    console.log(
      "[DREVAIA FRONTEND] Generation started",
    );

    try {
      setWorkspace((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }));

      /*
       * Después de OAuth, el estado React
       * puede tardar un instante en reflejar
       * la sesión.
       *
       * Primero usamos el usuario del contexto.
       * Si todavía no existe, consultamos Supabase
       * directamente.
       */
      let currentUser = user;

      if (!currentUser) {
        const {
          data: {
            user: freshUser,
          },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error(
            "[DREVAIA AUTH] Error getting current user:",
            authError,
          );

          throw new Error(
            "No se pudo verificar la sesión de autenticación.",
          );
        }

        if (!freshUser) {
          throw new Error(
            "No hay una sesión autenticada disponible. Inicia sesión para continuar.",
          );
        }

        currentUser = freshUser;
      }

      console.log(
        "[DREVAIA AUTH] Authenticated user:",
        currentUser.id,
      );

      const edition =
        await aiStudioService.generateEditorialEdition({
          reflection:
            workspace.reflection,
          language,
        });

      const updatedWorkspace:
        AIWorkspaceState = {
        ...workspace,
        editorial:
          edition.editorial,
        seo:
          edition.seo,
        review:
          edition.review,
        runtime:
          edition.runtime,
        loading: false,
        error: null,
      };

      setWorkspace(
        updatedWorkspace,
      );

      await aiStudioService.saveWorkspace(
        updatedWorkspace,
        language,
        currentUser.id,
      );

      /*
       * Si estábamos viendo un proyecto
       * anterior y generamos una nueva edición,
       * quitamos el identificador del proyecto
       * para que la nueva edición sea independiente.
       */
      if (projectId) {
        setSearchParams(
          {},
          {
            replace: true,
          },
        );
      }

      console.log(
        "[DREVAIA FRONTEND] Generation completed",
        {
          durationMs:
            Math.round(
              performance.now() -
                frontendStart,
            ),
          userId:
            currentUser.id,
        },
      );
    } catch (error) {
      console.error(
        "[DREVAIA FRONTEND] Generation failed",
        error,
      );

      setWorkspace((previous) => ({
        ...previous,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Ha ocurrido un error al generar la Editorial Edition.",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#090611] text-white">
      <SEO
        title={t.aiStudio.title}
        description={t.aiStudio.subtitle}
        language={language}
      />

      <Navigation />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <header className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            {t.aiStudio.workspace}
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            {t.aiStudio.title}
          </h1>

          <p className="mt-6 max-w-3xl text-2xl leading-relaxed text-zinc-200">
            {t.aiStudio.reflection.title}
          </p>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">
            {t.aiStudio.subtitle}
          </p>
        </header>

        <div className="mt-14 space-y-8">

          {projectLoading && (
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-6
                py-4
                text-sm
                text-zinc-400
              "
            >
              Cargando proyecto...
            </div>
          )}

          <ReflectionEditor
            value={
              workspace.reflection
            }
            onChange={(value) =>
              setWorkspace(
                (previous) => ({
                  ...previous,
                  reflection: value,
                  error: null,
                }),
              )
            }
            loading={
              workspace.loading
            }
            disabled={
              workspace.loading ||
              authLoading ||
              projectLoading
            }
            onGenerate={
              handleGenerate
            }
          />

          {workspace.error && (
            <div
              className="
                rounded-2xl
                border
                border-red-400/20
                bg-red-400/5
                px-5
                py-4
                text-sm
                text-red-300
              "
            >
              {workspace.error}
            </div>
          )}

          {workspace.editorial && (
            <div
              className="
                animate-in
                fade-in
                slide-in-from-bottom-4
                duration-500
              "
            >
              <WorkspaceGrid
                sidebar={
                  <WorkspaceSidebar />
                }
                rightPanel={
                  <div className="space-y-8">
                    <SEOCard
                      seo={
                        workspace.seo ??
                        undefined
                      }
                    />

                    <QualityCard
                      review={
                        workspace.review ??
                        undefined
                      }
                    />

                    <RuntimeCard
                      workflow={
                        workspace.workflow
                      }
                      runtime={
                        workspace.runtime ??
                        undefined
                      }
                      metrics={
                        workspace.metrics ??
                        undefined
                      }
                      execution={
                        workspace.execution ??
                        undefined
                      }
                      knowledgeScore={
                        workspace.knowledge
                          ?.score
                      }
                      qualityScore={
                        workspace.review
                          ?.score
                      }
                    />

                    <KnowledgeCard
                      knowledge={
                        workspace.knowledge ??
                        undefined
                      }
                    />
                  </div>
                }
              >
                <div className="space-y-8">
                  <EditorialCard
                    editorial={
                      workspace.editorial
                    }
                  />
                </div>
              </WorkspaceGrid>

              <div className="mt-8">
                <ActionBar
                  canExport
                  copied={copied}
                  onCopy={handleCopy}
                  onMarkdown={
                    handleMarkdown
                  }
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
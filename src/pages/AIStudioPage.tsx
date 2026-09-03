import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import { Navigation } from "@/sections/Navigation";
import { Footer } from "@/sections/Footer";
import { SEO } from "@/partials/SEO";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";

import {
  aiStudioService,
} from "@/application/ai/services/AIStudioService";

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

import { exportService } from "@/application/export/ExportService";

export default function AIStudioPage() {

  const { language } = useLanguage();

  const { user } = useAuth();

  const t = translations[language];

  const [workspace, setWorkspace] =
    useState<AIWorkspaceState>(
      INITIAL_AI_WORKSPACE,
    );

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {

    if (!workspace.editorial) return;

    const success =
      await exportService.copy({

        title:
          "DREVAIA Editorial Edition",

        content:
          workspace.editorial,

      });

    if (!success) return;

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  const handleMarkdown = () => {

    if (!workspace.editorial) return;

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

  if (!user) {
    throw new Error("User is not authenticated");
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

      const edition =
        await aiStudioService.generateEditorialEdition({
          reflection: workspace.reflection,
          language,
        });

      console.log(
        "[DREVAIA FRONTEND] Generation response",
        {
          durationMs: Math.round(
            performance.now() - frontendStart,
          ),
        },
      );

      console.log(
        "EDITORIAL EDITION:",
        edition,
      );

      setWorkspace((previous) => ({
        ...previous,
        loading: false,
        workflow:
          edition.workflow,
        editorial:
          edition.editorial,
        knowledge:
          edition.knowledge,
        seo:
          edition.seo,
        review:
          edition.review,
        runtime:
  edition.runtime,
execution:
  edition.execution,
      }));

      const saveStart =
        performance.now();

      await aiStudioService.saveWorkspace(
  {
    ...workspace,
    workflow:
      edition.workflow,
    editorial:
      edition.editorial,
    knowledge:
      edition.knowledge,
    seo:
      edition.seo,
    review:
      edition.review,
    runtime:
      edition.runtime,
    execution:
      edition.execution,
    loading: false,
    error: null,
  },
  language,
  user.id,
);

      console.log(
        "[DREVAIA FRONTEND] Workspace saved",
        {
          durationMs: Math.round(
            performance.now() - saveStart,
          ),
        },
      );

    } catch (error) {

      console.error(error);

      setWorkspace((previous) => ({
        ...previous,
        loading: false,
        error:
          "Ha ocurrido un error al generar la Editorial Edition.",
        editorial:
          "Ha ocurrido un error al generar la Editorial Edition.",
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

          <ReflectionEditor
            value={workspace.reflection}
            onChange={(value) =>
              setWorkspace((previous) => ({
                ...previous,
                reflection: value,
              }))
            }
            loading={workspace.loading}
            disabled={false}
            onGenerate={handleGenerate}
          />

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
                sidebar={<WorkspaceSidebar />}

                rightPanel={
                  <div className="space-y-8">

                    <SEOCard
                      seo={workspace.seo ?? undefined}
                    />

                    <QualityCard
                      review={workspace.review ?? undefined}
                    />

                    <RuntimeCard
  workflow={workspace.workflow}
  runtime={workspace.runtime ?? undefined}
  metrics={workspace.metrics ?? undefined}
  execution={workspace.execution ?? undefined}
  knowledgeScore={workspace.knowledge?.score}
  qualityScore={workspace.review?.score}
/>

                    <KnowledgeCard
                      knowledge={workspace.knowledge ?? undefined}
                    />

                  </div>
                }
              >

                <div className="space-y-8">

                  <EditorialCard
                    editorial={workspace.editorial}
                  />

                </div>

              </WorkspaceGrid>

              <div className="mt-8">

                <ActionBar
                  canExport
                  copied={copied}
                  onCopy={handleCopy}
                  onMarkdown={handleMarkdown}
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
/**
 * DREVAIA AI Studio
 * Workspace Projects
 *
 * Displays the latest AI projects stored in Supabase.
 */

import { useEffect, useState } from "react";

import { aiProjectsRepository } from "@/application/ai/workspace/AIProjectsRepository";
import type { AIProjectSummary } from "@/types/ai/AIProject";

interface WorkspaceProjectsProps {
  onOpenProject?: (projectId: string) => void;
}

export function WorkspaceProjects({
  onOpenProject,
}: WorkspaceProjectsProps) {

  const [projects, setProjects] =
    useState<AIProjectSummary[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    let mounted = true;

    async function loadProjects() {

      try {

        setLoading(true);
        setError(null);

        const data =
          await aiProjectsRepository.list(10);

        if (!mounted) return;

        setProjects(data);

      } catch (err) {

        console.error(err);

        if (!mounted) return;

        setError(
          "Unable to load projects.",
        );

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    }

    void loadProjects();

    return () => {
      mounted = false;
    };

  }, []);

  return (

    <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur">

      <header className="mb-5">

        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Projects
        </h3>

      </header>

      {loading && (

        <p className="text-sm text-zinc-500">
          Loading projects...
        </p>

      )}

      {error && (

        <p className="text-sm text-red-400">
          {error}
        </p>

      )}

      {!loading &&
        !error &&
        projects.length === 0 && (

          <p className="text-sm text-zinc-500">
            No projects yet.
          </p>

      )}

      {!loading &&
        !error &&
        projects.length > 0 && (

          <div className="space-y-3">

            {projects.map((project) => (

              <button
                key={project.id}
                type="button"
                onClick={() =>
                  onOpenProject?.(project.id)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/5
                  bg-black/20
                  p-4
                  text-left
                  transition
                  hover:border-amber-500/40
                  hover:bg-black/40
                "
              >

                <div className="font-medium text-white">
                  {project.title || "Untitled Project"}
                </div>

                <div className="mt-1 text-xs text-zinc-500">
                  {project.workflow}
                </div>

                <div className="mt-2 text-xs text-zinc-600">
                  {project.language}
                </div>

              </button>

            ))}

          </div>

      )}

    </section>

  );

}
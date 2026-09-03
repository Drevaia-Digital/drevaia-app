import { useEffect, useState } from "react";

import { aiProjectsRepository } from "./AIProjectsRepository";

import { useAuth } from "@/hooks/useAuth";

import type {
  AIProjectSummary,
} from "@/types/ai/AIProject";

/**
 * Hook encargado de cargar
 * los proyectos del AI Studio
 * pertenecientes al usuario autenticado.
 */
export function useProjects() {

  const {
    user,
    isLoading: authLoading,
  } = useAuth();

  const [projects, setProjects] =
    useState<AIProjectSummary[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (authLoading) {
      return;
    }

    if (!user) {
      setProjects([]);
      setError(null);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function load() {

      try {

        setLoading(true);

        const data =
          await aiProjectsRepository.list();

        if (!mounted) {
          return;
        }

        setProjects(data);
        setError(null);

      } catch (error) {

        console.error(error);

        if (!mounted) {
          return;
        }

        setError(
          "No fue posible cargar los proyectos.",
        );

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    }

    void load();

    return () => {
      mounted = false;
    };

  }, [authLoading, user]);

  return {

    projects,

    loading:
      authLoading || loading,

    error,

    reload: async () => {

      if (!user) {
        return;
      }

      setLoading(true);

      try {

        const data =
          await aiProjectsRepository.list();

        setProjects(data);
        setError(null);

      } catch (error) {

        console.error(error);

        setError(
          "No fue posible cargar los proyectos.",
        );

      } finally {

        setLoading(false);

      }

    },

  };

}
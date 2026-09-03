/**
 * DREVAIA AI Projects Repository
 *
 * Centraliza todas las operaciones
 * relacionadas con los proyectos de IA.
 */

import { supabase } from "@/lib/supabase";

import type {
  AIProject,
  AIProjectInsert,
  AIProjectSummary,
} from "@/types/ai/AIProject";

class AIProjectsRepository {

  async save(project: AIProjectInsert): Promise<void> {

    const { error } = await supabase
      .from("ai_projects")
      .insert({
        user_id: project.userId ?? null,

        language: project.language,

        workflow: project.workflow,

        title: project.title ?? null,

        reflection: project.reflection,

        editorial: project.editorial,

        seo: project.seo,

        review: project.review,

        runtime: project.runtime,
      });

    if (error) {
      throw error;
    }

  }

  async list(limit = 20): Promise<AIProjectSummary[]> {

    const { data, error } = await supabase
      .from("ai_projects")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw error;
    }

    return (data ?? []) as AIProjectSummary[];

  }

  async get(id: string): Promise<AIProject> {

    const { data, error } = await supabase
      .from("ai_projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data as AIProject;

  }

  async delete(id: string): Promise<void> {

    const { error } = await supabase
      .from("ai_projects")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

  }

}

export const aiProjectsRepository =
  new AIProjectsRepository();
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { workflowExecutor } from "./kernel/WorkflowExecutor.ts";

import {
  configureProviders,
} from "./bootstrap/providers.ts";

import {
  configureWorkflows,
} from "./bootstrap/workflows.ts";

console.log("DREVAIA AI Runtime initialized");

/**
 * Bootstrap Runtime
 */
configureProviders();

configureWorkflows();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

Deno.serve(async (req) => {

  try {

    if (req.method === "OPTIONS") {

      return new Response("ok", {
        headers: corsHeaders,
      });

    }

    if (req.method !== "POST") {

      return Response.json(
        {
          success: false,
          error: "Method not allowed.",
        },
        {
          status: 405,
          headers: corsHeaders,
        },
      );

    }

    const body = await req.json();

    if (
      body === null ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {

      return Response.json(
        {
          success: false,
          error: "Request body must be a JSON object.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );

    }

    const {
      workflow,
      input,
    } = body;

    /**
     * Validate workflow.
     */
    if (
      typeof workflow !== "string" ||
      workflow.trim().length === 0
    ) {

      return Response.json(
        {
          success: false,
          error: "Workflow is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );

    }

    /**
     * Validate input.
     */
    if (
      input === null ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {

      return Response.json(
        {
          success: false,
          error: "Input must be a JSON object.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );

    }

    /**
     * Validate input.
     */
    if (
      input === null ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {

      return Response.json(
        {
          success: false,
          error: "Input must be a JSON object.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );

    }

    /**
     * Workflow-specific validation.
     */
    if (workflow === "create-editorial-edition") {

      if (
        typeof input.reflection !== "string" ||
        input.reflection.trim().length === 0
      ) {

        return Response.json(
          {
            success: false,
            error: "reflection is required.",
          },
          {
            status: 400,
            headers: corsHeaders,
          },
        );

      }

    }

    console.log(
      `[DREVAIA RUNTIME] Executing workflow: ${workflow}`,
    );

    console.log(
      `[DREVAIA RUNTIME] Executing workflow: ${workflow}`,
    );

    const result =
      await workflowExecutor.execute(
        workflow,
        input,
      );

    console.log(
      "[DREVAIA RUNTIME] Workflow result ready",
    );

    const response =
      Response.json(
        result,
        {
          headers: corsHeaders,
        },
      );

    console.log(
      "[DREVAIA RUNTIME] Response object created",
    );

    return response;

  } catch (error) {

    console.error(
      "===== DREVAIA RUNTIME ERROR =====",
    );

    console.error(error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
        stack:
          error instanceof Error
            ? error.stack
            : null,
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );

  }

});

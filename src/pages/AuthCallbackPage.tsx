import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const handleCallback = async () => {
      try {
        const code =
          new URLSearchParams(
            window.location.search,
          ).get("code");

        if (code) {
          const { error } =
            await supabase.auth.exchangeCodeForSession(
              code,
            );

          if (error) {
            throw error;
          }
        }

        const {
          data: { session },
          error: sessionError,
        } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          throw new Error(
            "No se pudo establecer la sesión de autenticación.",
          );
        }

        if (mounted) {
          navigate("/es", {
            replace: true,
          });
        }
      } catch (err) {
        console.error(
          "[DREVAIA AUTH CALLBACK]",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Error durante la autenticación.",
          );
        }
      }
    };

    handleCallback();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (error) {
    return (
      <main className="min-h-screen bg-[#090611] text-white flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">
            Error de autenticación
          </h1>

          <p className="mt-4 text-zinc-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/es/auth/login")
            }
            className="mt-8 rounded-xl px-6 py-3 font-semibold bg-violet-600 hover:bg-violet-500"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white flex items-center justify-center">
      <p className="text-zinc-400">
        Completando autenticación...
      </p>
    </main>
  );
}

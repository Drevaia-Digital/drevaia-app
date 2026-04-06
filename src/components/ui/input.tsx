import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      style={{ fontSize: "16px" }} // 🔥 FIX DEFINITIVO (evita zoom móvil)
      className={cn(
        // Base completa (tuya, intacta)
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",

        // Dark + fondo
        "dark:bg-input/30 bg-transparent",

        // Bordes
        "border border-input",

        // Tamaño (IMPORTANTE)
        "h-12 w-full min-w-0",

        // Forma
        "rounded-md",

        // Espaciado (IMPORTANTE)
        "px-4 py-3",

        // Texto
        "text-base",

        // Sombra + transición
        "shadow-xs transition-[color,box-shadow]",

        // Outline
        "outline-none",

        // File input (lo conservamos)
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

        // Estados deshabilitado
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // Focus
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

        // Error
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // 👇 importante: permite extender desde fuera
        className
      )}
      {...props}
    />
  );
}

export { Input };

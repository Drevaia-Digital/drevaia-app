import type { ReactNode } from "react";

interface WorkspaceGridProps {
  children: ReactNode;
  sidebar?: ReactNode;
  rightPanel?: ReactNode;
}

export function WorkspaceGrid({
  children,
  sidebar,
  rightPanel,
}: WorkspaceGridProps) {
  return (
    <section
      className="
        grid
        gap-8
        xl:grid-cols-[280px_1fr_360px]
        items-start
      "
    >
      {/* Sidebar */}
      {sidebar && (
        <aside className="hidden xl:block">
          {sidebar}
        </aside>
      )}

      {/* Contenido principal */}
      <main className="min-w-0">
        {children}
      </main>

      {/* Panel derecho */}
      {rightPanel && (
        <aside className="space-y-8">
          {rightPanel}
        </aside>
      )}
    </section>
  );
}
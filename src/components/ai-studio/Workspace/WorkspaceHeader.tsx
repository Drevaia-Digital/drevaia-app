interface WorkspaceHeaderProps {
  title: string;
  subtitle: string;
}

export function WorkspaceHeader({
  title,
  subtitle,
}: WorkspaceHeaderProps) {
  return (
    <header className="mb-12">

      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-violet-500/10
          via-indigo-500/5
          to-transparent
          p-10
          backdrop-blur-xl
        "
      >

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">
          DREVAIA AI
        </p>

        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-300">
          {subtitle}
        </p>

      </div>
    </header>
  );
}
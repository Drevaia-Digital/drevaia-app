import {
  Cpu,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export function WorkspaceStats() {
  const items = [
    {
      icon: Cpu,
      label: "GPT-5 mini",
    },
    {
      icon: Workflow,
      label: "Workflow Ready",
    },
    {
      icon: ShieldCheck,
      label: "Quality Engine",
    },
    {
      icon: Sparkles,
      label: "SEO Engine",
    },
  ];

  return (
    <section
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-500/15
            "
          >
            <Icon
              size={20}
              className="text-violet-300"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              {label}
            </p>

            <p className="text-xs text-zinc-400">
              Online
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
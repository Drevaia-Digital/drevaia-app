import {
  FileText,
  History,
  Star,
  BookOpen,
  Plus,
} from "lucide-react";

import {
  useProjects,
} from "@/application/ai/workspace/useProjects";

import { useLanguage } from "@/context/LanguageContext";

export function WorkspaceSidebar() {
  const {
    projects,
    loading,
  } = useProjects();

  const { t } = useLanguage();

  const sidebarText = t.aiStudio.sidebar;

  return (
    <aside
      className="
        sticky
        top-24
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold">
          Workspace
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {sidebarText.description}
        </p>
      </div>

      <button
        className="
          mb-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-600
          px-4
          py-3
          text-sm
          font-semibold
          transition
          hover:scale-[1.02]
        "
      >
        <Plus size={18} />

        {sidebarText.newEditorial}
      </button>

      <nav className="space-y-2">
        <SidebarItem
          icon={<History size={18} />}
          label={sidebarText.history}
        />

        <SidebarItem
          icon={<Star size={18} />}
          label={sidebarText.favorites}
        />

        <SidebarItem
          icon={<BookOpen size={18} />}
          label={sidebarText.library}
        />

        <SidebarItem
          icon={<FileText size={18} />}
          label={sidebarText.templates}
        />
      </nav>

      <div className="mt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {sidebarText.recentProjects}
        </p>

        {loading ? (
          <p className="text-sm text-zinc-500">
            {sidebarText.loadingProjects}
          </p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-zinc-500">
            {sidebarText.noProjects}
          </p>
        ) : (
          <div className="space-y-2">
            {projects.slice(0, 5).map((project) => (
              <button
                key={project.id}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/5
                  bg-white/5
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-white/10
                "
              >
                <p className="truncate text-sm font-medium text-white">
                  {project.title || sidebarText.untitledEditorial}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {project.workflow}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({
  icon,
  label,
}: SidebarItemProps) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-left
        text-zinc-300
        transition
        hover:bg-white/5
        hover:text-white
      "
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}
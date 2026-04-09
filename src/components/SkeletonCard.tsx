export function SkeletonCard() {
  return (
    <div className="w-full max-w-[220px] rounded-2xl overflow-hidden bg-[#151528]">
      <div className="aspect-[3/4] relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/10" />
      </div>

      <div className="p-3 space-y-2">
        <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}
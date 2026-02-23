export function  ProfileHeaderSkeleton() {
  return (
    <div className="rounded-xl px-7 py-5 flex items-center justify-between mb-6 flex-wrap gap-4 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-[120px] h-[120px] rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-[43px] w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-[43px] w-36 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
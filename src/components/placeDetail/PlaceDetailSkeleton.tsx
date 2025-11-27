export function PlaceDetailSkeleton() {
  return (
    <div className="flex-1 flex flex-col animate-pulse">
      <div className="h-80 bg-gray-200" />

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
          <div className="h-10 w-24 bg-gray-200 rounded-xl" />
          <div className="h-10 flex-1 bg-gray-200 rounded-xl" />
        </div>
      </div>

      <div className="border-b border-gray-200 px-6">
        <div className="flex gap-4 py-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded" />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 py-6 space-y-6">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>

        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded-full" />
          <div className="h-8 w-32 bg-gray-200 rounded-full" />
          <div className="h-8 w-20 bg-gray-200 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

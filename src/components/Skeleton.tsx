interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse-soft',
    shimmer: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:1000px_100%]',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`bg-gray-200 ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <Skeleton height={240} className="rounded-t-xl rounded-b-none" />
      <div className="p-4 space-y-3">
        <Skeleton height={20} width="60%" />
        <Skeleton height={16} width="40%" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton height={14} width="30%" />
        </div>
        <Skeleton height={16} width="50%" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonTripCard() {
  return (
    <div className="animate-fade-in">
      <Skeleton height={280} className="rounded-xl mb-3" />
      <div className="space-y-2">
        <Skeleton height={18} width="80%" />
        <Skeleton height={16} width="60%" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton height={14} width="40%" />
        </div>
        <Skeleton height={16} width="50%" className="mt-1" />
      </div>
    </div>
  );
}

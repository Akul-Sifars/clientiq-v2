/**
 * FILE OVERVIEW:
 *   Purpose: Shimmer card component for loading card layouts
 *   Key Concepts: Shimmer UI, Card skeleton, Loading states
 *   Module Type: UI Component
 *   @ai_context: Reusable shimmer card for client/case cards and similar layouts
 */

import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface ShimmerCardProps {
  className?: string;
  showAvatar?: boolean;
  lines?: number;
}

function ShimmerCard({
  className,
  showAvatar = false,
  lines = 3,
}: ShimmerCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {showAvatar && (
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
        )}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          {lines > 2 && <Skeleton className="h-4 w-5/6" />}
          {lines > 3 && <Skeleton className="h-4 w-4/6" />}
        </div>
      </div>
    </div>
  );
}

export { ShimmerCard };


/**
 * FILE OVERVIEW:
 *   Purpose: Shimmer list component for loading list items
 *   Key Concepts: Shimmer UI, List skeleton, Loading states
 *   Module Type: UI Component
 *   @ai_context: Reusable shimmer list for client lists, case lists, and similar data tables
 */

import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface ShimmerListProps {
  className?: string;
  count?: number;
  showAvatar?: boolean;
  showActions?: boolean;
}

function ShimmerList({
  className,
  count = 5,
  showAvatar = false,
  showActions = false,
}: ShimmerListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border bg-card p-4"
        >
          {showAvatar && (
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { ShimmerList };


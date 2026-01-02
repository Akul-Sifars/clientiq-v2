/**
 * FILE OVERVIEW:
 *   Purpose: Shimmer table component for loading table rows
 *   Key Concepts: Shimmer UI, Table skeleton, Loading states
 *   Module Type: UI Component
 *   @ai_context: Reusable shimmer table for data tables with multiple columns
 */

import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface ShimmerTableProps {
  className?: string;
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

function ShimmerTable({
  className,
  rows = 5,
  columns = 4,
  showHeader = true,
}: ShimmerTableProps) {
  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {showHeader && (
            <thead className="border-b bg-muted/50">
              <tr>
                {Array.from({ length: columns }).map((_, index) => (
                  <th key={index} className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-0">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    <Skeleton
                      className={cn(
                        'h-4',
                        colIndex === 0 ? 'w-32' : 'w-24'
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { ShimmerTable };


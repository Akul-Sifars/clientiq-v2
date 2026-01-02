/**
 * FILE OVERVIEW:
 *   Purpose: Skeleton loading component with shimmer animation
 *   Key Concepts: Shimmer UI, Loading states, Tailwind CSS
 *   Module Type: UI Component
 *   @ai_context: Enhanced skeleton with smooth shimmer effect for better UX
 */

import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-accent rounded-md shimmer overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

/**
 * FILE OVERVIEW:
 *   Purpose: Root layout for all routes
 *   Key Concepts: TanStack Router, Theme Provider
 *   Module Type: Route Component
 *   @ai_context: Provides theme context to all child routes
 */

import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RootErrorBoundary,
});

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="clientiq-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}

function RootErrorBoundary({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button
        onClick={() => router.navigate({ to: '/' })}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go Home
      </button>
    </div>
  );
}


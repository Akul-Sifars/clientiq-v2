/**
 * FILE OVERVIEW:
 *   Purpose: Root layout for all routes
 *   Key Concepts: TanStack Router, Theme Provider
 *   Module Type: Route Component
 *   @ai_context: Provides theme context to all child routes
 */

import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="clientiq-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}


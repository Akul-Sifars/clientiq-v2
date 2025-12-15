/**
 * FILE OVERVIEW:
 *   Purpose: Dashboard/Home route (protected)
 *   Key Concepts: TanStack Router, Protected route, Main layout
 *   Module Type: Route Component
 *   @ai_context: Main dashboard requiring authentication
 */

import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-bold">Welcome to ClientIQ</h2>
            <p className="mt-2 text-muted-foreground">
              You are now logged in. Select a page from the sidebar to get
              started.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

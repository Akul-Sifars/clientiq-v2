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
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { isAuthenticated } from "@/lib/auth";
import { LayoutDashboard } from "lucide-react";

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
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <LayoutDashboard />
              </EmptyMedia>
              <EmptyTitle>Welcome to ClientIQ</EmptyTitle>
              <EmptyDescription>
                Get started by managing your clients, cases, and FAQs. Use the
                sidebar to navigate to different sections of the application.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

/**
 * FILE OVERVIEW:
 *   Purpose: Cases management route (protected)
 *   Key Concepts: TanStack Router, Protected route, Case list
 *   Module Type: Route Component
 *   @ai_context: Case management page requiring authentication
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
  EmptyContent,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/cases")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: CasesPage,
});

function CasesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-lg font-semibold">Cases</h1>
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
                <Scale />
              </EmptyMedia>
              <EmptyTitle>No cases yet</EmptyTitle>
              <EmptyDescription>
                Start tracking your legal cases, documents, and proceedings.
                Keep everything organized and easily accessible.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => {
                  console.log("Create case clicked");
                }}
              >
                Create Case
              </Button>
            </EmptyContent>
          </Empty>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

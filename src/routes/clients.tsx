/**
 * FILE OVERVIEW:
 *   Purpose: Clients management route (protected)
 *   Key Concepts: TanStack Router, Protected route, Client list
 *   Module Type: Route Component
 *   @ai_context: Client management page requiring authentication
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
import { Users } from "lucide-react";

export const Route = createFileRoute("/clients")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-lg font-semibold">Clients</h1>
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
                <Users />
              </EmptyMedia>
              <EmptyTitle>No clients yet</EmptyTitle>
              <EmptyDescription>
                Get started by adding your first client. Manage relationships,
                contact information, and case history all in one place.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => {
                  console.log("Add client clicked");
                }}
              >
                Add Client
              </Button>
            </EmptyContent>
          </Empty>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

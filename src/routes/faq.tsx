/**
 * FILE OVERVIEW:
 *   Purpose: FAQ management route (protected)
 *   Key Concepts: TanStack Router, Protected route, FAQ content
 *   Module Type: Route Component
 *   @ai_context: FAQ management page requiring authentication
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
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-lg font-semibold">FAQ Management</h1>
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
                <HelpCircle />
              </EmptyMedia>
              <EmptyTitle>No FAQs yet</EmptyTitle>
              <EmptyDescription>
                Create and manage frequently asked questions to help your
                clients find answers quickly and reduce support requests.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => {
                  console.log("Add FAQ clicked");
                }}
              >
                Add FAQ
              </Button>
            </EmptyContent>
          </Empty>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

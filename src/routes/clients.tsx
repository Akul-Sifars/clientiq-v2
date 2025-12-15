/**
 * FILE OVERVIEW:
 *   Purpose: Clients management route (protected)
 *   Key Concepts: TanStack Router, Protected route, Client list
 *   Module Type: Route Component
 *   @ai_context: Client management page requiring authentication
 */

import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { isAuthenticated } from '@/lib/auth';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/clients')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' });
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
          <div className="rounded-lg border bg-card p-8 text-center">
            <Users className="mx-auto size-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold">Clients</h2>
            <p className="mt-2 text-muted-foreground">
              Manage your client relationships and contact information.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

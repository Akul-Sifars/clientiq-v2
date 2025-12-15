/**
 * FILE OVERVIEW:
 *   Purpose: Audit logs route (protected)
 *   Key Concepts: TanStack Router, Protected route, Activity logs
 *   Module Type: Route Component
 *   @ai_context: Audit log viewing page requiring authentication
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
import { History } from 'lucide-react';

export const Route = createFileRoute('/audit-logs')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuditLogsPage,
});

function AuditLogsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-lg font-semibold">Audit Logs</h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="rounded-lg border bg-card p-8 text-center">
            <History className="mx-auto size-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold">Audit Logs</h2>
            <p className="mt-2 text-muted-foreground">
              Review system activity, user actions, and security events.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

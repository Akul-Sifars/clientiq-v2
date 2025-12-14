/**
 * FILE OVERVIEW:
 *   Purpose: Root application component with sidebar layout
 *   Key Concepts: React, Shadcn Sidebar, Layout, Theme Provider
 *   Module Type: Component
 *   @ai_context: Entry point component for ClientIQ application
 */

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "@/components/user-nav";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="clientiq-ui-theme">
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
                Select a page from the sidebar to get started.
              </p>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;

/**
 * FILE OVERVIEW:
 *   Purpose: Main application sidebar navigation component
 *   Key Concepts: Shadcn Sidebar, Lucide Icons, Navigation, ClientIQ brand gradient
 *   Module Type: Component
 *   @ai_context: Renders the primary navigation sidebar with brand gradient active states
 */

import { useLocation, Link } from "@tanstack/react-router";
import { LayoutGrid, Users, Scale, History, HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/",
  },
  {
    title: "Clients",
    icon: Users,
    href: "/clients",
  },
  {
    title: "Cases",
    icon: Scale,
    href: "/cases",
  },
  {
    title: "Audit Logs",
    icon: History,
    href: "/audit-logs",
  },
  {
    title: "FAQ Management",
    icon: HelpCircle,
    href: "/faq",
  },
];

function SidebarLogo() {
  const { state } = useSidebar();
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const logoSrc = isDark ? "/logos/Logo White.png" : "/logos/Logo Black.png";

  return (
    <SidebarHeader className="h-14 flex items-center justify-center border-b px-4">
      {state === "expanded" ? (
        <img src={logoSrc} alt="ClientIQ" className="h-20 w-auto" />
      ) : (
        <span className="text-xl font-bold text-gradient-brand">CQ</span>
      )}
    </SidebarHeader>
  );
}

export function AppSidebar() {
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0">
      <SidebarLogo />
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      size="lg"
                      className={
                        isActive
                          ? "sidebar-item-gradient text-white! [&>svg]:text-white! [&>svg]:size-5!"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground group-data-[collapsible=icon]:justify-center [&>svg]:size-5"
                      }
                    >
                      <Link to={item.href}>
                        <item.icon />
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

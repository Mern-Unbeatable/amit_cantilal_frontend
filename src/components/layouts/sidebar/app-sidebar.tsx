import React from "react";
import { Link } from '@tanstack/react-router'
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {useSidebarItems} from "@/components/layouts/sidebar/sidebar-items.ts";
import {useAuthStore} from "@/stores/user.ts";
import ApplicationLogo from '@/components/application-logo.tsx'
import { ExternalLink } from 'lucide-react'

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  
  const user = useAuthStore(state => state.user);

  const sidebarItems = useSidebarItems({user});

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-0">
        <Link to="/admin/dashboard" className="flex items-center justify-center px-2 py-4">
          <ApplicationLogo width={100} height={56} className="h-14 w-auto" />
        </Link>
        <SidebarMenu className="pt-1 border-t border-sidebar-border">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-muted-foreground/80">
              <Link to="/">
                <ExternalLink className="w-4 h-4" />
                <span>View Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

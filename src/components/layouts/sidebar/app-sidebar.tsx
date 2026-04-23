import { Command } from "lucide-react";

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
import { appConfig } from '@/config/app.ts'

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  
  const user = useAuthStore(state => state.user);

  const sidebarItems = useSidebarItems({user});

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/">
                <Command />
                <span className="text-base font-semibold">{appConfig.name}</span>
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

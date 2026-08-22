import { ChevronRight } from 'lucide-react'

import { Link, useLocation } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import type { NavGroup, NavMainItem } from '@/@types/navigation.ts'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

interface NavMainProps {
  readonly items: ReadonlyArray<NavGroup>
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">
    Soon
  </span>
)

const NavItemExpanded = ({
  item,
  isActive,
  isSubmenuOpen,
  onLinkClick,
}: {
  item: NavMainItem
  isActive: (url: string, subItems?: NavMainItem['subItems']) => boolean
  isSubmenuOpen: (subItems?: NavMainItem['subItems']) => boolean
  onLinkClick: () => void
}) => {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={isSubmenuOpen(item.subItems)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {item.subItems ? (
            <SidebarMenuButton
              disabled={item.comingSoon}
              isActive={isActive(item.url, item.subItems)}
              tooltip={item.title}
            >
              {item.icon && (
                <Icon
                  icon={item.icon}
                  className="size-6 [&>svg]:text-sidebar-foreground"
                />
              )}
              <span>{item.title}</span>
              {item.comingSoon && <IsComingSoon />}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              asChild
              aria-disabled={item.comingSoon}
              isActive={isActive(item.url)}
              tooltip={item.title}
            >
              <Link
                to={item.url}
                target={item.newTab ? '_blank' : undefined}
                onClick={onLinkClick}
              >
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    className="size-6 [&>svg]:text-sidebar-foreground"
                  />
                )}
                <span>{item.title}</span>
                {item.comingSoon && <IsComingSoon />}
              </Link>
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.subItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    size="md"
                    aria-disabled={subItem.comingSoon}
                    isActive={isActive(subItem.url)}
                    asChild
                  >
                    <Link
                      to={subItem.url}
                      target={subItem.newTab ? '_blank' : undefined}
                      onClick={onLinkClick}
                    >
                      {subItem.icon && (
                        <Icon
                          icon={subItem.icon}
                          className="size-6 [&>svg]:text-sidebar-foreground"
                        />
                      )}
                      <span>{subItem.title}</span>
                      {subItem.comingSoon && <IsComingSoon />}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  )
}

const NavItemCollapsed = ({
  item,
  isActive,
  onLinkClick,
}: {
  item: NavMainItem
  isActive: (url: string, subItems?: NavMainItem['subItems']) => boolean
  onLinkClick: () => void
}) => {
  return (
    <SidebarMenuItem key={item.title}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            disabled={item.comingSoon}
            tooltip={item.title}
            isActive={isActive(item.url, item.subItems)}
          >
            {item.icon && (
              <Icon
                icon={item.icon}
                className="size-6 [&>svg]:text-sidebar-foreground"
              />
            )}
            <span>{item.title}</span>
            <ChevronRight />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-50 space-y-1"
          side="right"
          align="start"
        >
          {item.subItems?.map((subItem) => (
            <DropdownMenuItem key={subItem.title} asChild>
              <SidebarMenuSubButton
                key={subItem.title}
                asChild
                className="focus-visible:ring-0"
                aria-disabled={subItem.comingSoon}
                isActive={isActive(subItem.url)}
                size="md"
              >
                <Link
                  to={subItem.url}
                  target={subItem.newTab ? '_blank' : undefined}
                  onClick={onLinkClick}
                >
                  {subItem.icon && (
                    <Icon
                      icon={subItem.icon}
                      className="size-6 [&>svg]:text-sidebar-foreground"
                    />
                  )}
                  <span>{subItem.title}</span>
                  {subItem.comingSoon && <IsComingSoon />}
                </Link>
              </SidebarMenuSubButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

export function NavMain({ items }: NavMainProps) {
  const path = useLocation({
    select: (location) => location.pathname,
  })
  const { state, isMobile, setOpenMobile } = useSidebar()

  // Only close on mobile — desktop sidebar stays open after navigation
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const isItemActive = (url: string, subItems?: NavMainItem['subItems']) => {
    if (subItems?.length) {
      return subItems.some((sub) => path.startsWith(sub.url))
    }
    return path === url
  }

  const isSubmenuOpen = (subItems?: NavMainItem['subItems']) => {
    return subItems?.some((sub) => path.startsWith(sub.url)) ?? false
  }

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && (
            <SidebarGroupLabel className="text-primary/80 text-[10px] font-semibold uppercase tracking-[0.12em] px-2">
              {group.label}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {group.items.map((item) => {
                if (state === 'collapsed' && !isMobile) {
                  // If no subItems, just render the button as a link
                  if (!item.subItems) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          aria-disabled={item.comingSoon}
                          tooltip={item.title}
                          isActive={isItemActive(item.url)}
                          size="default"
                        >
                          <Link
                            to={item.url}
                            target={item.newTab ? '_blank' : undefined}
                            onClick={handleLinkClick}
                          >
                            {item.icon && (
                              <Icon
                                icon={item.icon}
                                className="size-6 [&>svg]:text-sidebar-foreground"
                              />
                            )}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  }
                  // Otherwise, render the dropdown as before
                  return (
                    <NavItemCollapsed
                      key={item.title}
                      item={item}
                      isActive={isItemActive}
                      onLinkClick={handleLinkClick}
                    />
                  )
                }
                // Expanded view
                return (
                  <NavItemExpanded
                    key={item.title}
                    item={item}
                    isActive={isItemActive}
                    isSubmenuOpen={isSubmenuOpen}
                    onLinkClick={handleLinkClick}
                  />
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  ShoppingCart,
  Headphones,
  Database,
  Zap,
  BarChart3,
  Sparkles,
  ChevronRight,
  Building2,
  Target,
  Ticket,
  List,
  Mail,
  Phone,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Code,
  Bookmark,
} from "lucide-react"

const navigationItems = [
  {
    title: "CRM",
    icon: Users,
    isExpandable: true,
    items: [
      { title: "Contacts", href: "/crm/contacts", icon: Users },
      { title: "Companies", href: "/crm/companies", icon: Building2 },
      { title: "Deals", href: "/crm/deals", icon: Target },
      { title: "Tickets", href: "/crm/tickets", icon: Ticket },
      { title: "Lists", href: "/crm/lists", icon: List },
      { title: "Inbox", href: "/crm/inbox", icon: Mail },
      { title: "Calls", href: "/crm/calls", icon: Phone },
      { title: "Tasks", href: "/crm/tasks", icon: CheckSquare },
      { title: "Playbooks", href: "/crm/playbooks", icon: BookOpen },
      { title: "Message Templates", href: "/crm/templates", icon: MessageSquare },
      { title: "Snippets", href: "/crm/snippets", icon: Code },
    ],
  },
  { title: "Marketing", icon: TrendingUp, href: "/marketing" },
  { title: "Content", icon: FileText, href: "/content" },
  { title: "Sales", icon: DollarSign, href: "/sales" },
  { title: "Commerce", icon: ShoppingCart, href: "/commerce" },
  { title: "Service", icon: Headphones, href: "/service" },
  { title: "Data Management", icon: Database, href: "/data" },
  { title: "Automation", icon: Zap, href: "/automation" },
  { title: "Reporting", icon: BarChart3, href: "/reporting" },
  { title: "Breeze", icon: Sparkles, href: "/breeze" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["CRM"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 flex-shrink-0"
      style={{
        backgroundColor: "#33475b",
      }}
    >
      <SidebarHeader className="p-4 border-b border-gray-600/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-white font-medium text-sm group-data-[collapsible=icon]:hidden">HubSpot</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        {/* Bookmarks */}
        <div className="px-3 py-2 border-b border-gray-600/30">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-gray-300 hover:text-white hover:bg-gray-600/50 px-3 py-2 rounded-md transition-colors"
                tooltip="Bookmarks"
              >
                <Link href="/bookmarks" className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm group-data-[collapsible=icon]:hidden">Bookmarks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-2">
          <SidebarMenu className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.isExpandable ? (
                  <Collapsible
                    open={expandedItems.includes(item.title)}
                    onOpenChange={() => toggleExpanded(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`text-gray-300 hover:text-white hover:bg-gray-600/50 w-full justify-between px-3 py-2 rounded-md transition-colors ${
                          pathname.startsWith("/crm") ? "bg-gray-600/70 text-white" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform group-data-[collapsible=icon]:hidden ${
                            expandedItems.includes(item.title) ? "rotate-90" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                      <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`text-gray-400 hover:text-white hover:bg-gray-600/50 px-3 py-1.5 rounded-md transition-colors text-sm ${
                                pathname === subItem.href ? "bg-gray-600/70 text-white" : ""
                              }`}
                            >
                              <Link href={subItem.href} className="flex items-center gap-3">
                                <subItem.icon className="w-4 h-4 flex-shrink-0" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="text-gray-300 hover:text-white hover:bg-gray-600/50 px-3 py-2 rounded-md transition-colors"
                  >
                    <Link href={item.href || "#"} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Bottom section with Breeze */}
        <div className="mt-auto p-3 border-t border-gray-600/30">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Breeze"
                className="text-gray-300 hover:text-white hover:bg-gray-600/50 px-3 py-2 rounded-md transition-colors"
              >
                <Link href="/breeze" className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm group-data-[collapsible=icon]:hidden">Breeze</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

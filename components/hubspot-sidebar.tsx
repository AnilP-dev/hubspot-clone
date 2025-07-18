"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  ChevronRight,
  ChevronLeft,
  Building2,
  Handshake,
  Ticket,
  List,
  Mail,
  Phone,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Code,
  Bookmark,
  Plus,
  Users2,
  BarChart,
  Settings,
} from "lucide-react"

const navigationItems = [
  {
    id: "bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
  },
  {
    id: "crm",
    title: "CRM",
    icon: Users,
    isExpandable: true,
    items: [
      { title: "Contacts", href: "/crm/contacts", icon: Users },
      { title: "Companies", href: "/crm/companies", icon: Building2 },
      { title: "Deals", href: "/crm/deals", icon: Handshake },
      { title: "Tickets", href: "/crm/tickets", icon: Ticket },
      { title: "Lists", href: "/crm/lists", icon: List },
      { title: "Inbox", href: "/crm/inbox", icon: Mail },
      { title: "Calls", href: "/crm/calls", icon: Phone },
      { title: "Tasks", href: "/crm/tasks", icon: CheckSquare },
      { title: "Playbooks", href: "/crm/playbooks", icon: BookOpen, hasNotification: true },
      { title: "Message Templates", href: "/crm/templates", icon: MessageSquare },
      { title: "Snippets", href: "/crm/snippets", icon: Code },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: TrendingUp,
    href: "/marketing",
  },
  {
    id: "content",
    title: "Content",
    icon: FileText,
    href: "/content",
  },
  {
    id: "sales",
    title: "Sales",
    icon: DollarSign,
    href: "/sales",
  },
  {
    id: "commerce",
    title: "Commerce",
    icon: ShoppingCart,
    href: "/commerce",
  },
  {
    id: "service",
    title: "Service",
    icon: Headphones,
    href: "/service",
  },
  {
    id: "data",
    title: "Data Management",
    icon: Database,
    href: "/data",
  },
  {
    id: "automation",
    title: "Automation",
    icon: Zap,
    href: "/automation",
  },
  {
    id: "reporting",
    title: "Reporting",
    icon: BarChart3,
    href: "/reporting",
  },
  {
    id: "contacts-2",
    title: "Contacts",
    icon: Users2,
    href: "/contacts-2",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart,
    href: "/analytics",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "add",
    title: "Add",
    icon: Plus,
    href: "/add",
  },
]

interface HubSpotSidebarProps {
  isExpanded: boolean
  onToggle: () => void
}

export function HubSpotSidebar({ isExpanded, onToggle }: HubSpotSidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["crm"])

  const toggleSection = (sectionId: string) => {
    if (!isExpanded) {
      onToggle()
      return
    }

    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleItemClick = (item: any) => {
    if (item.isExpandable) {
      toggleSection(item.id)
    }
  }

  return (
    <div className={`hubspot-sidebar ${isExpanded ? "expanded" : ""}`}>
      {/* Header */}
      <div className="hubspot-sidebar-header">
        <div className="hubspot-logo"></div>
        <span className="hubspot-brand-text">HubSpot</span>
      </div>

      {/* Content */}
      <div className="hubspot-sidebar-content">
        {/* Bookmarks Section */}
        <div className="hubspot-nav-section">
          <Link href="/bookmarks" className={`hubspot-nav-item ${pathname === "/bookmarks" ? "active" : ""}`}>
            <Bookmark className="hubspot-nav-icon" />
            <span className="hubspot-nav-text">Bookmarks</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="hubspot-nav-section">
          {navigationItems.slice(1).map((item) => (
            <div key={item.id}>
              {item.isExpandable ? (
                <>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`hubspot-nav-item expandable ${pathname.startsWith("/crm") ? "active" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <item.icon className="hubspot-nav-icon" />
                      <span className="hubspot-nav-text">{item.title}</span>
                    </div>
                    <ChevronRight
                      className={`hubspot-nav-chevron ${expandedSections.includes(item.id) ? "expanded" : ""}`}
                    />
                  </button>
                  <div
                    className={`hubspot-submenu ${expandedSections.includes(item.id) && isExpanded ? "expanded" : ""}`}
                  >
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`hubspot-submenu-item ${pathname === subItem.href ? "active" : ""}`}
                      >
                        <subItem.icon className="hubspot-submenu-icon" />
                        <span>{subItem.title}</span>
                        {subItem.hasNotification && <div className="hubspot-notification-dot"></div>}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href || "#"} className={`hubspot-nav-item ${pathname === item.href ? "active" : ""}`}>
                  <item.icon className="hubspot-nav-icon" />
                  <span className="hubspot-nav-text">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Collapse Button */}
      {isExpanded && (
        <button onClick={onToggle} className="hubspot-collapse-button" title="Collapse the navigation">
          <ChevronLeft />
        </button>
      )}
    </div>
  )
}

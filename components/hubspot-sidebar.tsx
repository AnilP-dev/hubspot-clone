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
    disabled: true,
  },
  {
    id: "crm",
    title: "CRM",
    icon: Users,
    isExpandable: true,
    disabled: false,
    items: [
      { title: "Contacts", href: "/crm/contacts", icon: Users },
      { title: "Companies", href: "/crm/companies", icon: Building2 },
      { title: "Deals", href: "/crm/deals", icon: Target },
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
    disabled: true,
  },
  {
    id: "content",
    title: "Content",
    icon: FileText,
    href: "/content",
    disabled: true,
  },
  {
    id: "sales",
    title: "Sales",
    icon: DollarSign,
    href: "/sales",
    disabled: true,
  },
  {
    id: "commerce",
    title: "Commerce",
    icon: ShoppingCart,
    href: "/commerce",
    disabled: true,
  },
  {
    id: "service",
    title: "Service",
    icon: Headphones,
    href: "/service",
    disabled: true,
  },
  {
    id: "data",
    title: "Data Management",
    icon: Database,
    href: "/data",
    disabled: true,
  },
  {
    id: "automation",
    title: "Automation",
    icon: Zap,
    href: "/automation",
    disabled: true,
  },
  {
    id: "reporting",
    title: "Reporting",
    icon: BarChart3,
    href: "/reporting",
    disabled: true,
  },
  {
    id: "contacts-2",
    title: "Contacts",
    icon: Users2,
    href: "/contacts-2",
    disabled: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart,
    href: "/analytics",
    disabled: true,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    href: "/settings",
    disabled: true,
  },
  {
    id: "add",
    title: "Add",
    icon: Plus,
    href: "/add",
    disabled: true,
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
    if (item.disabled) {
      return // Don't do anything if item is disabled
    }
    
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
          <div className={`hubspot-nav-item ${pathname === "/bookmarks" ? "active" : ""} ${navigationItems[0].disabled ? "disabled" : ""}`}>
            <Bookmark className="hubspot-nav-icon" />
            <span className="hubspot-nav-text">Bookmarks</span>
            {navigationItems[0].disabled && (
              <span className="hubspot-disabled-badge">Coming Soon</span>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="hubspot-nav-section">
          {navigationItems.slice(1).map((item) => (
            <div key={item.id}>
              {item.isExpandable ? (
                <>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`hubspot-nav-item expandable ${pathname.startsWith("/crm") ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
                    disabled={item.disabled}
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
                <div className={`hubspot-nav-item ${pathname === item.href ? "active" : ""} ${item.disabled ? "disabled" : ""}`}>
                  <item.icon className="hubspot-nav-icon" />
                  <span className="hubspot-nav-text">{item.title}</span>
                  {item.disabled && (
                    <span className="hubspot-disabled-badge">Coming Soon</span>
                  )}
                </div>
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

"use client"

import { useState, useEffect } from "react"
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
  Megaphone,
  Share2,
  Calendar,
  FileForm,
  MousePointer,
  Smartphone,
  UserCheck,
  Trophy,
  Route,
  Menu,
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
    isExpandable: true,
    disabled: false,
    items: [
      { title: "Campaigns", href: "/marketing/campaigns", icon: Megaphone },
      { title: "Email", href: "/marketing/email", icon: Mail },
      { title: "Social", href: "/marketing/social", icon: Share2 },
      { title: "Ads", href: "/marketing/ads", icon: Target },
      { title: "Events", href: "/marketing/events", icon: Calendar },
      { title: "Forms", href: "/marketing/forms", icon: Calendar },
      { title: "CTAs", href: "/marketing/ctas", icon: MousePointer },
      { title: "SMS", href: "/marketing/sms", icon: Smartphone, hasNotification: true },
      { title: "Buyer Intent", href: "/marketing/buyer-intent", icon: UserCheck },
      { title: "Lead Scoring", href: "/marketing/lead-scoring", icon: Trophy },
      { title: "Journeys", href: "/marketing/journeys", icon: Route, badge: "BETA" },
    ],
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

  // Helper function to determine which parent module should be active
  const getActiveModule = (pathname: string) => {
    if (pathname.startsWith("/crm")) return "crm"
    if (pathname.startsWith("/marketing")) return "marketing"
    if (pathname.startsWith("/content")) return "content"
    if (pathname.startsWith("/sales")) return "sales"
    if (pathname.startsWith("/commerce")) return "commerce"
    if (pathname.startsWith("/service")) return "service"
    if (pathname.startsWith("/data")) return "data"
    if (pathname.startsWith("/automation")) return "automation"
    if (pathname.startsWith("/reporting")) return "reporting"
    if (pathname.startsWith("/contacts-2")) return "contacts-2"
    if (pathname.startsWith("/analytics")) return "analytics"
    if (pathname.startsWith("/settings")) return "settings"
    if (pathname.startsWith("/add")) return "add"
    if (pathname.startsWith("/bookmarks")) return "bookmarks"
    return null
  }

  const activeModule = getActiveModule(pathname)
  
  // Initialize expanded sections with the active module
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    return activeModule ? [activeModule] : ["crm"]
  })

  // Update expanded sections when pathname changes
  useEffect(() => {
    if (activeModule && !expandedSections.includes(activeModule)) {
      setExpandedSections(prev => {
        // Remove other expanded sections and add the active one
        const otherSections = prev.filter(section => section !== activeModule)
        return [...otherSections, activeModule]
      })
    }
  }, [activeModule, expandedSections])

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
        <div className="hubspot-logo">
          <svg 
            viewBox="0 0 16 16" 
            height="32px" 
            data-test-id="icon-hubspot-logo" 
            role="img" 
            aria-label="HubSpot logo"
          >
            <title>HubSpot</title>
            <path 
              d="M11.6127 10.9174C10.4763 10.9174 9.55512 10.0374 9.55512 8.95201C9.55512 7.86645 10.4763 6.98646 11.6127 6.98646C12.749 6.98646 13.6702 7.86645 13.6702 8.95201C13.6702 10.0374 12.749 10.9174 11.6127 10.9174ZM12.2286 5.16801V3.41954C12.7064 3.20397 13.041 2.74229 13.041 2.20648V2.16612C13.041 1.42664 12.4077 0.821619 11.6336 0.821619H11.5915C10.8174 0.821619 10.1841 1.42664 10.1841 2.16612V2.20648C10.1841 2.74229 10.5187 3.20416 10.9965 3.41972V5.16801C10.2852 5.27306 9.63527 5.55332 9.09927 5.96578L4.07384 2.23138C4.107 2.10973 4.1303 1.9845 4.1305 1.85286C4.13129 1.0155 3.42174 0.335606 2.54479 0.334474C1.66822 0.333532 0.956311 1.01154 0.955323 1.84909C0.954337 2.68665 1.66388 3.36654 2.54084 3.36748C2.82651 3.36786 3.09106 3.29035 3.32283 3.16436L8.26614 6.83803C7.84582 7.44418 7.59944 8.17028 7.59944 8.95201C7.59944 9.77033 7.8701 10.5274 8.32734 11.1499L6.82415 12.5861C6.7053 12.5519 6.58211 12.5282 6.45141 12.5282C5.73101 12.5282 5.14684 13.086 5.14684 13.7742C5.14684 14.4626 5.73101 15.0205 6.45141 15.0205C7.17201 15.0205 7.75599 14.4626 7.75599 13.7742C7.75599 13.6498 7.73112 13.5319 7.69538 13.4184L9.18238 11.9978C9.85738 12.4899 10.698 12.7856 11.6127 12.7856C13.8292 12.7856 15.6257 11.0692 15.6257 8.95201C15.6257 7.03531 14.1517 5.45185 12.2286 5.16801Z" 
              fill="#FF7A59"
            />
          </svg>
        </div>
        <span className="hubspot-brand-text">HubSpot</span>
        {isExpanded && (
          <button 
            onClick={onToggle} 
            className="hubspot-hamburger-btn"
            title="Collapse sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="hubspot-sidebar-content">
        {/* Bookmarks Section */}
        <div className="hubspot-nav-section">
          <div className={`hubspot-nav-item ${activeModule === "bookmarks" ? "active" : ""} ${navigationItems[0].disabled ? "disabled" : ""}`}>
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
                    className={`hubspot-nav-item expandable ${activeModule === item.id ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <subItem.icon className="hubspot-submenu-icon" />
                          <span>{subItem.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {subItem.hasNotification && <div className="hubspot-notification-dot"></div>}
                          {subItem.badge && (
                            <span className="hubspot-beta-badge">
                              {subItem.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className={`hubspot-nav-item ${activeModule === item.id ? "active" : ""} ${item.disabled ? "disabled" : ""}`}>
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

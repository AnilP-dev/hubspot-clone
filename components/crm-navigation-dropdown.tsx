"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Building2, Users, Target, Mail, FileText, List, Phone, CheckSquare, BookOpen, MessageCircle, Code } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const crmOptions = [
  {
    id: "contacts",
    title: "Contacts",
    href: "/crm/contacts",
    icon: Users,
  },
  {
    id: "companies",
    title: "Companies",
    href: "/crm/companies",
    icon: Building2,
  },
  {
    id: "deals",
    title: "Deals",
    href: "/crm/deals",
    icon: Target,
  },
  {
    id: "tickets",
    title: "Tickets",
    href: "/crm/tickets",
    icon: FileText,
  },
  {
    id: "lists",
    title: "Lists",
    href: "/crm/lists",
    icon: List,
  },
  {
    id: "inbox",
    title: "Inbox",
    href: "/crm/inbox",
    icon: Mail,
  },
  {
    id: "calls",
    title: "Calls",
    href: "/crm/calls",
    icon: Phone,
  },
  {
    id: "tasks",
    title: "Tasks",
    href: "/crm/tasks",
    icon: CheckSquare,
  },
  {
    id: "playbooks",
    title: "Playbooks",
    href: "/crm/playbooks",
    icon: BookOpen,
  },
  {
    id: "message-templates",
    title: "Message Templates",
    href: "/crm/message-templates",
    icon: MessageCircle,
  },
  {
    id: "snippets",
    title: "Snippets",
    href: "/crm/snippets",
    icon: Code,
  },
]

interface CrmNavigationDropdownProps {
  currentTitle: string
  recordCount: number
}

export function CrmNavigationDropdown({ currentTitle, recordCount }: CrmNavigationDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()

  const filteredOptions = crmOptions.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentOption = crmOptions.find((option) => option.href === pathname) || crmOptions[1] // Default to contacts

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              {currentTitle}
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </h1>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-0">
        {/* Search Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Navigation Options */}
        <div className="py-1">
          {filteredOptions.map((option) => {
            const Icon = option.icon
            const isActive = pathname === option.href
            
            return (
              <DropdownMenuItem key={option.id} asChild>
                <Link
                  href={option.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{option.title}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
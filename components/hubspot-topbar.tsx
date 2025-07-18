"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Keyboard,
  Bell,
  MessageCircle,
  Settings,
  Plus,
  ChevronDown,
  Phone,
  Calendar,
  HelpCircle,
  Sparkles,
  Menu,
} from "lucide-react"

interface HubSpotTopBarProps {
  onSidebarToggle: () => void
}

export function HubSpotTopBar({ onSidebarToggle }: HubSpotTopBarProps) {
  return (
    <div className="h-14 bg-slate-800 border-b border-gray-600 flex items-center justify-between px-4 sticky top-0 z-40">
      {/* Left side - Sidebar trigger and Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="text-gray-300 hover:text-white hover:bg-slate-700 h-7 w-7 p-0"
        >
          <Menu className="w-4 h-4" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search HubSpot"
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 hubspot-body-text"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">⌘K</div>
        </div>
      </div>

      {/* Right side - Icons and buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <Keyboard className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <Plus className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 relative">
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <Phone className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <Calendar className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <HelpCircle className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
          <MessageCircle className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        <Button className="hubspot-upgrade-btn">Upgrade</Button>

        <Button className="hubspot-copilot-btn">
          <Sparkles className="w-4 h-4" />
          Copilot
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hubspot-user-dropdown">
              <div className="hubspot-user-avatar">T</div>
              <span>Turing</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

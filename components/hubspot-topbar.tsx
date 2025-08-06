"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Settings,
  Plus,
  ChevronDown,
  Phone,
  Store,
  HelpCircle,
  Sparkles,
  ArrowUp,
} from "lucide-react"

interface HubSpotTopBarProps {
  onSidebarToggle?: () => void
}

export function HubSpotTopBar({ onSidebarToggle }: HubSpotTopBarProps) {
  return (
    <div className="h-14 bg-[#33475b] border-b border-gray-600 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left side - Logo and Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search HubSpot"
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 h-9"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <div className="w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs text-gray-400">⌘</div>
            <div className="w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs text-gray-400">K</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0 rounded-full bg-slate-700">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Right side - Icons and buttons */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
        
        <Button className="hubspot-upgrade-btn">
          <ArrowUp className="w-3 h-3 mr-1" />
          Upgrade
        </Button>

        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
          <Phone className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
          <Store className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
          <HelpCircle className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
          <Bell className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        <Button className="hubspot-copilot-btn">
          <Sparkles className="w-3 h-3 mr-1" />
          Copilot
        </Button>

        <div className="h-6 w-px bg-gray-600 mx-2"></div>

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

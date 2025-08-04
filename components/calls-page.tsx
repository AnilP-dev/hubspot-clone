"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronDown,
  Search,
  Settings,
  Download,
  Edit,
  Filter,
  X,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CallsPage() {
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, label: "Recorded calls", value: "recorded", active: true },
    { id: 2, label: "All calls", value: "all", active: false },
  ])

  // Sample call data
  const callData = [
    {
      id: 1,
      title: "Call with Maria Johnson (Sample Contact)",
      date: "Jul 25, 2025 11:51 PM GMT+5:30",
      direction: "--",
      outcome: "--",
      assignedTo: "No owner",
      duration: "--",
      notes: "(Sample call) Brought Maria ...",
      contact: { name: "Maria Johnson (Sample Contact)", color: "bg-red-500" },
      company: { name: "HubSpot", color: "bg-orange-500" }
    },
    {
      id: 2,
      title: "Call with Brian Halligan (Sample Contact)",
      date: "Jul 25, 2025 11:51 PM GMT+5:30",
      direction: "--",
      outcome: "--",
      assignedTo: "No owner",
      duration: "--",
      notes: "(Sample call) Seems like they...",
      contact: { name: "Brian Halligan (Sample Contact)", color: "bg-red-500" },
      company: { name: "HubSpot", color: "bg-orange-500" }
    }
  ]

  const removeFilter = (filterId: number) => {
    setActiveFilters(filters => filters.filter(f => f.id !== filterId))
  }

  const addFilter = (label: string, value: string) => {
    const newFilter = {
      id: Date.now(),
      label,
      value,
      active: true
    }
    setActiveFilters([...activeFilters, newFilter])
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        .text-primary { color: #33475b; }
        .text-teal { color: #00BDA5; }
        .bg-teal { background-color: #00BDA5; }
        .border-teal { border-color: #00BDA5; }
        .text-orange { color: #FF7A00; }
        .bg-orange { background-color: #FF7A00; }
      `}</style>

      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-medium text-primary flex items-center gap-2">
              Calls
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </h1>
            <span className="text-sm text-gray-500">2 records</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-teal border-teal hover:bg-teal/5">
              Playlists
            </Button>
            <Button className="bg-orange-500 hover:bg-orange/90 text-white">
              Record
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter Tabs */}
          {activeFilters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Button
                variant={filter.active ? "default" : "ghost"}
                size="sm"
                className={`rounded-r-none border-r-0 ${
                  filter.active 
                    ? "bg-gray-100 text-primary border-gray-300" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </Button>
              {filter.active && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-l-none px-2 bg-gray-100 border-gray-300 hover:bg-gray-200"
                  onClick={() => removeFilter(filter.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
          
          {/* Add View Button */}
          <Button variant="ghost" size="sm" className="text-teal hover:bg-teal/5">
            + Add view (2/50)
          </Button>
          
          <Button variant="ghost" size="sm" className="text-teal hover:bg-teal/5">
            All views
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Filter Dropdowns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Transcript available
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Available</DropdownMenuItem>
                <DropdownMenuItem>Not available</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Activity assigned to
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Me</DropdownMenuItem>
                <DropdownMenuItem>Anyone</DropdownMenuItem>
                <DropdownMenuItem>Unassigned</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Activity date
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Call duration
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any duration</DropdownMenuItem>
                <DropdownMenuItem>Less than 1 minute</DropdownMenuItem>
                <DropdownMenuItem>1-5 minutes</DropdownMenuItem>
                <DropdownMenuItem>More than 5 minutes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-300">
                  More
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="text-teal border-teal hover:bg-teal/5">
              <Filter className="w-4 h-4 mr-1" />
              Advanced filters
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-500">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search call name or notes"
                  className="pl-10 pr-4 py-2 w-64 text-sm"
                />
              </div>
              <Button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 text-sm">
                Search call name or notes
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="p-2">
                <Download className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-500">Export</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="p-2">
                <Edit className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-500">Edit columns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table */}
      <div className="flex-1 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="mr-2" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL TITLE
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  ACTIVITY DATE (GMT+5:30)
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL DIRECTION
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL OUTCOME
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  ACTIVITY ASSIGNED TO
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL DURATION
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL NOTES
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL → CONTACTS
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  CALL → COMPANIES
                  <ChevronDown className="w-3 h-3 ml-1 inline" />
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {callData.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-teal hover:underline cursor-pointer font-medium">
                      {call.title}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {call.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {call.direction}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {call.outcome}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {call.assignedTo}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {call.duration}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {call.notes}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${call.contact.color} flex items-center justify-center text-white text-xs font-semibold`}>
                        {call.contact.name.charAt(0)}
                      </div>
                      <span className="text-sm text-teal hover:underline cursor-pointer">
                        {call.contact.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${call.company.color} flex items-center justify-center text-white text-xs font-semibold`}>
                        H
                      </div>
                      <span className="text-sm text-teal hover:underline cursor-pointer">
                        {call.company.name}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="sm" disabled className="text-gray-400">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <span className="text-sm text-gray-600">1</span>
          <Button variant="ghost" size="sm" disabled className="text-gray-400">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-teal">
                25 per page
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>25 per page</DropdownMenuItem>
              <DropdownMenuItem>50 per page</DropdownMenuItem>
              <DropdownMenuItem>100 per page</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
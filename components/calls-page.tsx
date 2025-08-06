"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  Link,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Plus,
  Phone,
  Mail,
  ExternalLink,
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

  const [selectedCalls, setSelectedCalls] = useState<number[]>([])
  const [showBulkEditModal, setShowBulkEditModal] = useState(false)
  const [bulkEditProperty, setBulkEditProperty] = useState("Call notes")
  const [bulkEditValue, setBulkEditValue] = useState("")
  
  // Call sidebar state
  const [selectedCallForEdit, setSelectedCallForEdit] = useState<number | null>(null)
  const [showCallSidebar, setShowCallSidebar] = useState(false)
  const [calls, setCalls] = useState([
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
  ])

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

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCalls(calls.map(call => call.id))
    } else {
      setSelectedCalls([])
    }
  }

  const handleSelectCall = (callId: number, checked: boolean) => {
    if (checked) {
      setSelectedCalls([...selectedCalls, callId])
    } else {
      setSelectedCalls(selectedCalls.filter(id => id !== callId))
    }
  }

  // Action handlers
  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCalls.length} call${selectedCalls.length > 1 ? 's' : ''}?`)) {
      setCalls(calls.filter(call => !selectedCalls.includes(call.id)))
      setSelectedCalls([])
    }
  }

  const handleEditSelected = () => {
    setShowBulkEditModal(true)
  }

  const handleBulkUpdate = () => {
    if (bulkEditProperty === "Call notes") {
      setCalls(calls.map(call => 
        selectedCalls.includes(call.id) 
          ? { ...call, notes: bulkEditValue }
          : call
      ))
    }
    setShowBulkEditModal(false)
    setBulkEditValue("")
    setSelectedCalls([])
  }

  const handleBulkEditCancel = () => {
    setShowBulkEditModal(false)
    setBulkEditValue("")
  }

  // Call sidebar handlers
  const handleCallTitleClick = (callId: number) => {
    setSelectedCallForEdit(callId)
    setShowCallSidebar(true)
  }

  const handleCloseSidebar = () => {
    setShowCallSidebar(false)
    setSelectedCallForEdit(null)
  }

  const getSelectedCall = () => {
    return calls.find(call => call.id === selectedCallForEdit)
  }

  const handleEditSingle = (callId: number) => {
    const call = calls.find(c => c.id === callId)
    if (call) {
      alert(`Edit functionality would open for: ${call.title}`)
    }
  }

  const handleDeleteSingle = (callId: number) => {
    const call = calls.find(c => c.id === callId)
    if (call && window.confirm(`Are you sure you want to delete "${call.title}"?`)) {
      setCalls(calls.filter(c => c.id !== callId))
      setSelectedCalls(selectedCalls.filter(id => id !== callId))
    }
  }

  const isAllSelected = calls.length > 0 && selectedCalls.length === calls.length
  const isPartiallySelected = selectedCalls.length > 0 && selectedCalls.length < calls.length

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
            <span className="text-sm text-gray-500">{calls.length} records</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Playlists
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8">
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
          <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
            + Add view (2/50)
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
            All views
          </Button>
        </div>
      </div>

      {/* Selection Action Bar */}
      {selectedCalls.length > 0 && (
        <div className="border-b border-orange-200 bg-orange-50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {selectedCalls.length} call{selectedCalls.length > 1 ? 's' : ''} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditSelected}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCalls([])}
              className="text-gray-500"
            >
              Clear selection
            </Button>
          </div>
        </div>
      )}

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

            <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
              <Filter className="w-4 h-4" />
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
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all calls"
                  />
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
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input 
                      type="checkbox"
                      checked={selectedCalls.includes(call.id)}
                      onChange={(e) => handleSelectCall(call.id, e.target.checked)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div 
                      className="text-sm text-teal hover:underline cursor-pointer font-medium"
                      onClick={() => handleCallTitleClick(call.id)}
                    >
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
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSingle(call.id)}
                        className="p-1 h-auto hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSingle(call.id)}
                        className="p-1 h-auto hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
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

      {/* Call Edit Sidebar */}
      {showCallSidebar && getSelectedCall() && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={handleCloseSidebar}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-gray-200 z-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-teal text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">{getSelectedCall()?.title}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 px-2 py-1 text-sm"
                >
                  Actions
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseSidebar}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Call Title */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {getSelectedCall()?.title}
                </h3>
              </div>

              {/* Call Direction */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Call Direction</h4>
                <div className="text-sm text-gray-600">--</div>
              </div>

              {/* Call Recording */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Call Recording
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎤</div>
                    <h5 className="font-medium text-gray-900 mb-2">No transcript available.</h5>
                    <p className="text-sm text-gray-600">
                      To get call transcripts, link your INTEGRATIONS_PLATFORM user account to your HubSpot account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Call notes</h4>
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">AI</Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">Generated Aug 4, 2025 ✓</div>
                <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700 leading-relaxed">
                  {getSelectedCall()?.notes}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <Button variant="ghost" size="sm" className="p-1 text-gray-500">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 text-gray-500">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-pink-600 border-pink-300 hover:bg-pink-50 ml-auto"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Ask a question
                  </Button>
                </div>
              </div>

              {/* About this Call */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  About this Call
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:bg-gray-100 ml-auto px-2 py-1 text-xs"
                  >
                    Actions
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Activity date</div>
                    <div className="text-sm text-gray-900">{getSelectedCall()?.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Activity assigned to</div>
                    <div className="text-sm text-gray-900">{getSelectedCall()?.assignedTo}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Call outcome</div>
                    <div className="text-sm text-gray-900">{getSelectedCall()?.outcome}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Call duration</div>
                    <div className="text-sm text-gray-900">{getSelectedCall()?.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Record source</div>
                    <div className="text-sm text-gray-900">HubSpot Processing</div>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Contacts (1)
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal hover:bg-teal/10 px-2 py-1 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${getSelectedCall()?.contact.color} flex items-center justify-center text-white text-sm font-semibold`}>
                    {getSelectedCall()?.contact.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-teal cursor-pointer hover:underline">
                      {getSelectedCall()?.contact.name}
                    </div>
                    <div className="text-xs text-gray-500">Salesperson at HubSpot</div>
                    <div className="text-xs text-teal">emailmaria@hubspot.com</div>
                    <div className="text-xs text-gray-500">Phone: --</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal hover:bg-teal/10 w-full mt-2 text-sm"
                >
                  View associated contacts
                </Button>
              </div>

              {/* Companies */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Companies (1)
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal hover:bg-teal/10 px-2 py-1 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${getSelectedCall()?.company.color} flex items-center justify-center text-white text-sm font-semibold`}>
                    H
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-teal cursor-pointer hover:underline">
                      {getSelectedCall()?.company.name}
                    </div>
                    <div className="text-xs text-teal">hubspot.com</div>
                    <div className="text-xs text-gray-500">Phone: --</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal hover:bg-teal/10 w-full mt-2 text-sm"
                >
                  View associated companies
                </Button>
              </div>

              {/* Deals */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Deals (0)
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal hover:bg-teal/10 px-2 py-1 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Track the revenue opportunities associated with this record.</p>
              </div>

              {/* Tickets */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Tickets (0)
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal hover:bg-teal/10 px-2 py-1 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Track the customer requests associated with this record.</p>
              </div>

              {/* Meetings */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Meetings (0)
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal hover:bg-teal/10 px-2 py-1 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-sm text-gray-600">See the Meetings associated with this record.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bulk Edit Modal */}
      <Dialog open={showBulkEditModal} onOpenChange={setShowBulkEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="bg-teal text-white p-4 -m-6 mb-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-teal-500 font-medium">
                Bulk edit {selectedCalls.length} record{selectedCalls.length > 1 ? 's' : ''}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkEditCancel}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Property to update
              </label>
              <Select value={bulkEditProperty} onValueChange={setBulkEditProperty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Call notes">Call notes</SelectItem>
                  <SelectItem value="Call outcome">Call outcome</SelectItem>
                  <SelectItem value="Call direction">Call direction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {bulkEditProperty}
              </label>
              
              {/* Rich Text Editor Toolbar */}
              <div className="border border-gray-300 rounded-t-md bg-gray-50 px-3 py-2 flex items-center gap-1">
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Bold className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Italic className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Underline className="w-3 h-3" />
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <AlignLeft className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <List className="w-3 h-3" />
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <Button variant="ghost" size="sm" className="text-teal px-2 h-6 text-xs">
                  More
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <DollarSign className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Link className="w-3 h-3" />
                </Button>
              </div>
              
              <Textarea
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                className="min-h-[200px] rounded-t-none border-t-0 resize-none focus:ring-0"
                placeholder=""
              />
              
              <div className="flex justify-end text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  0
                  <span className="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleBulkEditCancel}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

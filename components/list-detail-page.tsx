"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Edit,
  Plus,
  Search,
  Download,
  Settings,
  Filter,
  BarChart3,
  Activity,
  ChevronDown,
  Users,
  Building2,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"

interface ListDetailPageProps {
  listId: string
}

const getListTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "contact":
    case "contacts":
      return <Users className="w-4 h-4" />
    case "company":
    case "companies":
      return <Building2 className="w-4 h-4" />
    case "deal":
    case "deals":
      return <DollarSign className="w-4 h-4" />
    default:
      return <Users className="w-4 h-4" />
  }
}

export function ListDetailPage() {
  const router = useRouter()
  const params = useParams()
  const listId = params.id as string
  
  const { lists } = useAppSelector((state) => state.lists)
  const list = lists.find(l => l.id === listId)
  
  const [activeTab, setActiveTab] = useState("filters")
  const [isEditingName, setIsEditingName] = useState(false)
  const [listName, setListName] = useState(list?.name || "")
  const [tempName, setTempName] = useState(listName)

  if (!list) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">List not found</h2>
          <p className="text-gray-600 mb-4">The list you're looking for doesn't exist.</p>
          <Link href="/crm/lists">
            <Button>Back to Lists</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleNameEdit = () => {
    setTempName(listName)
    setIsEditingName(true)
  }

  const handleNameSave = () => {
    setListName(tempName)
    setIsEditingName(false)
  }

  const handleNameCancel = () => {
    setTempName(listName)
    setIsEditingName(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave()
    } else if (e.key === 'Escape') {
      handleNameCancel()
    }
  }

  const renderFiltersTab = () => (
    <div className="flex h-full">
      {/* Left Sidebar - Filters */}
      <div className="w-80 border-r border-gray-200 bg-gray-50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="mb-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Test contact
            </Button>
            <Button variant="ghost" size="sm" className="ml-2 text-gray-500">
              Edit filters
            </Button>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">This list doesn't have any filters</p>
            <Button className="bg-[#516F90] hover:bg-[#516F90]/90 text-white gap-2">
              <Plus className="w-4 h-4" />
              Add filter
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search in list"
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export list
              </Button>
              <Button variant="outline" size="sm">
                Edit columns
              </Button>
            </div>
          </div>
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-50">
                <circle cx="100" cy="80" r="40" fill="none" stroke="#ccc" strokeWidth="3"/>
                <path d="M70 110 Q100 140 130 110" fill="none" stroke="#ccc" strokeWidth="3"/>
                <circle cx="85" cy="70" r="3" fill="#ccc"/>
                <circle cx="115" cy="70" r="3" fill="#ccc"/>
                <path d="M60 120 L140 120 M80 140 L120 140" stroke="#ccc" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              This list is currently empty.
            </h3>
            <p className="text-gray-600">
              It was processed without filters and has either remained empty or its records have been removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPerformanceTab = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">List size</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Date range:</span>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="2025-06-29 to 2025-07-29" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Over time
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            FROM 6/29/2025 TO 7/29/2025 | DAILY
          </div>
          
          {/* Simple Chart Placeholder */}
          <div className="h-64 border border-gray-200 rounded flex items-end justify-center p-4">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-8 h-8 mx-auto mb-2" />
              <p>Chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts breakdown and engagement</h3>
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Segment contacts by:</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Source</Button>
              <Button variant="outline" size="sm">Save report</Button>
            </div>
          </div>
          
          <div className="text-center py-16 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>There is no data to show in this time frame. Try changing the date range.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
          <p className="text-sm text-gray-600">View all user activity notes on this list</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">View version history</Button>
          <Button variant="outline" size="sm">Export report</Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Event</span>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All event types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All event types</SelectItem>
              <SelectItem value="created">List created</SelectItem>
              <SelectItem value="modified">List modified</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Version</span>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All versions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All versions</SelectItem>
              <SelectItem value="v1">v1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Modified by</span>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Anyone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyone">Anyone</SelectItem>
              <SelectItem value="me">Me</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>EVENT</TableHead>
            <TableHead>VERSION</TableHead>
            <TableHead>MODIFIED BY</TableHead>
            <TableHead>DATE OF CHANGE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>List created</TableCell>
            <TableCell>v1</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-medium">{list.creator}</div>
                  <div className="text-xs text-gray-500">rituparn.g@turing.com</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{list.lastUpdated} 12:02 AM GMT+5:30</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>Prev</Button>
          <Button variant="ghost" size="sm" disabled>Next</Button>
        </div>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="10 per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="p-6">
      <div className="flex">
        {/* Left Navigation */}
        <div className="w-64 pr-6">
          <nav className="space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-[#00BDA5] bg-gray-100 rounded">
              Exclusions
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Auto-convert to static
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Notifications
            </button>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusions</h3>
            <p className="text-gray-600 mb-6">
              You can exclude entire contact lists or individual contact records from being added to this list
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Choose one or multiple lists of contacts to exclude</h4>
              <p className="text-sm text-gray-600 mb-3">You can exclude up to 10 lists.</p>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Choose a list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list1">Sample List 1</SelectItem>
                    <SelectItem value="list2">Sample List 2</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-500">0/10</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Choose one or multiple contacts to exclude</h4>
              <p className="text-sm text-gray-600 mb-3">You can exclude up to 25 contacts.</p>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Choose a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact1">John Doe</SelectItem>
                    <SelectItem value="contact2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-500">0/25</span>
              </div>
              
              <div className="mt-3 p-3 bg-gray-800 text-white text-sm rounded">
                Exclusions cannot be changed for static lists. To remove records from this list, visit the filters tab.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        .text-primary { color: #33475b; }
      `}</style>
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/crm/lists" className="text-[#00BDA5] hover:text-[#00BDA5]/80 text-sm">
                Back to lists
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Details
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Actions
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="text-xl font-medium text-primary border-[#00BDA5] focus:ring-[#00BDA5]"
                    autoFocus
                  />
                  <Button variant="ghost" size="sm" onClick={handleNameSave} className="p-1 h-auto">
                    <Edit className="w-4 h-4 text-green-600" />
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-medium text-primary">{listName}</h1>
                  <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={handleNameEdit}>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-4">
            <Badge className="bg-[#00BDA5] text-white text-xs px-2 py-1">
              {list.object.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1">
              {list.type.toUpperCase()}
            </Badge>
            <div className="text-sm text-gray-600">
              Size: <span className="font-medium">{list.size} {list.object.toLowerCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("filters")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "filters"
                  ? "border-[#00BDA5] text-[#00BDA5]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Filters
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "performance"
                  ? "border-[#00BDA5] text-[#00BDA5]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "activity"
                  ? "border-[#00BDA5] text-[#00BDA5]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-[#00BDA5] text-[#00BDA5]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === "filters" && renderFiltersTab()}
        {activeTab === "performance" && renderPerformanceTab()}
        {activeTab === "activity" && renderActivityTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  )
}
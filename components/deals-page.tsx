"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Plus, Filter, ChevronLeft, ChevronRight, List, Grid3X3 } from "lucide-react"

const filterTabs = [
  { id: "all", label: "All deals", count: 0 },
  { id: "my", label: "My deals", count: 0 },
]

export function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("board") // 'board' or 'table'
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)

  return (
    <div className="flex-1 bg-white w-full min-w-0">
      {/* Header */}
      <div className="p-6 border-b w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
            <ChevronDown className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">0 records</span>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  Actions
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit properties</DropdownMenuItem>
                <DropdownMenuItem>Manage duplicates</DropdownMenuItem>
                <DropdownMenuItem>Fix formatting issues</DropdownMenuItem>
                <DropdownMenuItem>Restore records</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
              Import
            </Button>

            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              Create deal
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <Button variant="outline" size="sm" className="ml-4 text-blue-600 border-blue-200 bg-transparent">
            <Plus className="w-4 h-4 mr-1" />
            Add view (2/5)
          </Button>

          <Button variant="ghost" size="sm" className="text-blue-600">
            All Views
          </Button>
        </div>

        {/* View Toggle and Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "board" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("board")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  All pipelines
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Sales Pipeline</DropdownMenuItem>
                <DropdownMenuItem>Marketing Pipeline</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  Deal owner
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All owners</DropdownMenuItem>
                <DropdownMenuItem>Assigned to me</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  Create date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All time</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  Last activity date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All time</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  Close date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All time</DropdownMenuItem>
                <DropdownMenuItem>This quarter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
              <Plus className="w-4 h-4" />
              More
            </Button>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
              <Filter className="w-4 h-4" />
              Advanced filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Edit columns
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center p-12 w-full">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Create a deal to start building your winning sales process
          </h2>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Set up your deals pipeline</p>
                <p className="text-sm text-gray-600">with stages for the real-life milestones in your process.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Track deals</p>
                <p className="text-sm text-gray-600">
                  to visualize the progress of your sales and make sure nothing gets lost.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Report on your sales</p>
                <p className="text-sm text-gray-600">
                  so you can keep track of how much money you are making over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button variant="ghost" size="sm" disabled>
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              {itemsPerPage} per page
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setItemsPerPage(25)}>25 per page</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setItemsPerPage(50)}>50 per page</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setItemsPerPage(100)}>100 per page</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

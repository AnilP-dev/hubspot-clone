"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  X,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Info,
  LayoutGrid,
  Copy,
  Save,
  Undo,
  List
} from "lucide-react"

interface TabData {
  id: string
  name: string
  isDefault?: boolean
  filters?: Record<string, any>
}

interface Column {
  key: string
  label: string
  sortable?: boolean
  info?: boolean
}

interface FilterableTabsTableProps {
  tabs: TabData[]
  columns: Column[]
  data: any[]
  onTabClose?: (tabId: string) => void
  onTabAdd?: () => void
  onTabReorder?: (fromIndex: number, toIndex: number) => void
  onDataFilter?: (filters: Record<string, any>) => any[]
  onCampaignClick?: (campaignId: string) => void
  searchPlaceholder?: string
  maxViews?: number
  currentViews?: number
}

export function FilterableTabsTable({
  tabs,
  columns,
  data,
  onTabClose,
  onTabAdd,
  onTabReorder,
  onDataFilter,
  onCampaignClick,
  searchPlaceholder = "Search campaigns",
  maxViews = 50,
  currentViews = 3
}: FilterableTabsTableProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [draggedTab, setDraggedTab] = useState<string | null>(null)

  // Filter data based on search term and active tab filters
  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm === "" || Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
    return matchesSearch
  })

  const handleTabClose = (tabId: string) => {
    if (onTabClose && !tabs.find(t => t.id === tabId)?.isDefault) {
      onTabClose(tabId)
      if (activeTab === tabId) {
        setActiveTab(tabs.find(t => t.id !== tabId)?.id || '')
      }
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map(item => item.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (rowId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId])
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId))
    }
  }

  const handleDragStart = (e: React.DragEvent, tabId: string) => {
    setDraggedTab(tabId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetTabId: string) => {
    e.preventDefault()
    if (draggedTab && onTabReorder) {
      const fromIndex = tabs.findIndex(t => t.id === draggedTab)
      const toIndex = tabs.findIndex(t => t.id === targetTabId)
      onTabReorder(fromIndex, toIndex)
    }
    setDraggedTab(null)
  }

  return (
    <div className="rounded-lg">
      {/* Tabs Header */}
      <div>
        <div className="flex items-center">
          {/* Tab Buttons */}
          <div className="flex grow">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`grow max-w-md relative flex items-center px-4 py-3 border-r border-b border-l border-t border-hubspot-view-tab-border-color cursor-pointer  ${
                  activeTab === tab.id
                    ? 'bg-white text-hubspot-primary border-b-0'
                    : 'bg-inactive-background text-hubspot-primary hover:bg-gray-100'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, tab.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, tab.id)}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-sm font-light text-sm">{tab.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTabClose(tab.id)
                    }}
                    className="ml-2 p-0.5 hover:bg-gray-200 rounded ml-auto"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
              </div>
            ))}
          </div>

          {/* Add View Button */}
          <div className="flex items-center px-4 py-3 text-hubspot-secondary">
            <button
              onClick={onTabAdd}
              className="flex items-center gap-1 text-sm hover:text-teal-700 font-bold"
            >
              <Plus className="h-4 w-4" />
              Add view ({currentViews}/{maxViews})
            </button>
          </div>

          {/* All Views Link */}
          <div className="px-4 py-3">
            <button className="text-sm text-hubspot-secondary hover:text-teal-700 font-bold">
              All views
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="pt-4 bg-white border border-hubspot-view-tab-border-color border-t-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 font-bold">
            <Select defaultValue="campaign-owner">
              <SelectTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-40 bg-white font-bold border-gray-300 text-hubspot-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-hubspot-primary">
                <SelectItem value="campaign-owner">Campaign owner</SelectItem>
                <SelectItem value="owner-1">Owner 1</SelectItem>
                <SelectItem value="owner-2">Owner 2</SelectItem>
              </SelectContent>
            </Select>

            <button className="flex items-center gap-2 text-hubspot-secondary hover:text-teal-700 text-sm font-bold">
              <Plus className="h-4 w-4" />
              More
            </button>
            <div className="border border-gray-300/70 h-5 mx-2"></div>
            <button className="flex items-center gap-2 text-hubspot-secondary hover:text-teal-700 text-sm font-bold">
              <Filter className="h-4 w-4" />
              Advanced filters
            </button>
          </div>

          <div className="flex items-center gap-2 mr-2 ">
            <button className="p-1.5 border border-gray-300 rounded-xs hover:bg-gray-50">
              <Copy className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded-xs bg-gray-100">
              <Undo className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded-xs bg-gray-100">
              <Save className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between bg-inactive-background border border-hubspot-view-tab-border-color py-2 px-4 pl-2 mr-0 ml-0">
          <div className="relative w-[20%] h-15 ">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-0 h-8 pl-2 text-lg bg-white border-gray-300 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:!ring-hubspot-secondary focus-visible:ring-offset-0"
            />
          </div>
               {/* Actions Bar */}
            <Button variant="outline" size="sm" className="h-8 rounded-xs text-gray-600 border-gray-300 text-xs font-light">
              Actions
              <ChevronDown className="h-2 w-2 ml-0" />
            </Button>
        </div>
        </div>


 

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12 border border-t-0 bg-inactive-background border-hubspot-view-tab-border-color p-0 text-center">
                <Checkbox
                  className="border border-hubspot-view-tab-border-color w-5 h-5 bg-white data-[state=checked]:border-hubspot-secondary data-[state=checked]:bg-white data-[state=checked]:text-hubspot-secondary"
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-semibold text-hubspot-table-header-color text-xs uppercase border border-t-0 bg-inactive-background border-hubspot-view-tab-border-color ">
                  <div className="flex items-center gap-1 cursor-pointer">
                    {column.label}
                    {column.info && <Info className="h-4 w-4 fill-gray-400 text-white" />}
                    {column.sortable && <ArrowUpDown className="h-3 w-3 ml-auto" />}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="text-hubspot-table-header-color font-light text-sm border border-t-0 bg-white border-hubspot-view-tab-border-color">
                <TableCell className="px-0  py-2 text-center border-hubspot-view-tab-border-color border  border-t-0">
                  <Checkbox
                  className="border border-hubspot-view-tab-border-color w-5 h-5 bg-white data-[state=checked]:border-hubspot-secondary data-[state=checked]:bg-white data-[state=checked]:text-hubspot-secondary"
                  checked={selectedRows.includes(row.id)}
                    onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                  />

                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key} className="px-0 pl-4 text-left py-2 text-hubspot-table-header-color text-sm border border-t-0 bg-white border-hubspot-view-tab-border-color">
                    {column.key === 'name' || column.key === 'campaignName' ? (
                      <div>
                        <span 
                          className="text-hubspot-secondary hover:underline cursor-pointer font-semibold"
                          onClick={() => onCampaignClick && onCampaignClick(row.id)}
                        >
                          {row[column.key]}
                        </span>
                      </div>
                    ) : column.key === 'comments' && row[column.key] === 0 ? (
                      <span className="text-teal-600">0</span>
                    ) : (
                      row[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data found
          </div>
        )}
      </div>
    </div>
  )
}
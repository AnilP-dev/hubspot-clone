"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const mockCompanies = [
  {
    id: "1",
    name: "HubSpot",
    owner: "No owner",
    createDate: "Today at 12:44 AM GMT+5:30",
    phoneNumber: "--",
    lastActivityDate: "Today at 12:44 AM GMT+5:30",
    avatar: "H",
  },
  {
    id: "2",
    name: "Acme Corp",
    owner: "John Doe",
    createDate: "Yesterday at 3:22 PM GMT+5:30",
    phoneNumber: "+1-555-0123",
    lastActivityDate: "Yesterday at 4:15 PM GMT+5:30",
    avatar: "A",
  },
]

const filterTabs = [
  { id: "all", label: "All companies", count: 2 },
  { id: "my", label: "My companies", count: 1 },
]

type SortField = "name" | "owner" | "createDate" | "phoneNumber" | "lastActivityDate"
type SortDirection = "asc" | "desc"

export function CompaniesPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)

  // Filter and search companies
  const filteredCompanies = useMemo(() => {
    let filtered = mockCompanies

    // Apply tab filter
    if (activeTab === "my") {
      filtered = filtered.filter((company) => company.owner !== "No owner")
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const modifier = sortDirection === "asc" ? 1 : -1
      return aValue.localeCompare(bValue) * modifier
    })

    return filtered
  }, [activeTab, searchQuery, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const paginatedCompanies = filteredCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompanies(paginatedCompanies.map((c) => c.id))
    } else {
      setSelectedCompanies([])
    }
  }

  const handleSelectCompany = (companyId: string, checked: boolean) => {
    if (checked) {
      setSelectedCompanies([...selectedCompanies, companyId])
    } else {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId))
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  return (
    <div className="flex-1 bg-white w-full min-w-0">
      {/* Header */}
      <div className="p-6 border-b w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
            <ChevronDown className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">
              {filteredCompanies.length} record{filteredCompanies.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
              <Shield className="w-4 h-4" />
              Data Quality
            </Button>

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
              Create company
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && tab.id === "all" && <X className="w-4 h-4" />}
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

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-blue-600">
                  Company owner
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
            placeholder="Search name, phone, or domain"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedCompanies.length > 0 &&
                    paginatedCompanies.every((company) => selectedCompanies.includes(company.id))
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>COMPANY NAME</span>
                  <button onClick={() => handleSort("name")}>{getSortIcon("name")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>COMPANY OWNER</span>
                  <button onClick={() => handleSort("owner")}>{getSortIcon("owner")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>CREATE DATE (GMT+5:30)</span>
                  <button onClick={() => handleSort("createDate")}>{getSortIcon("createDate")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>PHONE NUMBER</span>
                  <button onClick={() => handleSort("phoneNumber")}>{getSortIcon("phoneNumber")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>LAST ACTIVITY DATE (GMT+5:30)</span>
                  <button onClick={() => handleSort("lastActivityDate")}>{getSortIcon("lastActivityDate")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.map((company) => (
              <TableRow key={company.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={(checked) => handleSelectCompany(company.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {company.avatar}
                    </div>
                    <span className="text-blue-600 hover:underline cursor-pointer">{company.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{company.owner}</TableCell>
                <TableCell className="text-gray-900">{company.createDate}</TableCell>
                <TableCell className="text-gray-500">{company.phoneNumber}</TableCell>
                <TableCell className="text-gray-900">{company.lastActivityDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button variant="ghost" size="sm" className="bg-blue-50 text-blue-600">
            {currentPage}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
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

"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateContactModal } from "@/components/create-contact-modal"
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

const mockContacts = [
  {
    id: "1",
    name: "TestUser test",
    email: "t@hubspot.com",
    phone: "--",
    leadStatus: "New",
    favoriteContent: "Marketing",
    avatar: "T",
    owner: "John Doe",
    createDate: "2024-01-15",
    lastActivity: "2024-01-20",
  },
  {
    id: "2",
    name: "Brian Halligan (Sample Contact)",
    email: "bh@hubspot.com",
    phone: "+1-555-0123",
    leadStatus: "Qualified",
    favoriteContent: "Sales",
    avatar: "B",
    owner: "Jane Smith",
    createDate: "2024-01-10",
    lastActivity: "2024-01-18",
  },
  {
    id: "3",
    name: "Maria Johnson (Sample Contact)",
    email: "emailmaria@hubspot.com",
    phone: "+1-555-0456",
    leadStatus: "Customer",
    favoriteContent: "Support",
    avatar: "M",
    owner: "Bob Wilson",
    createDate: "2024-01-05",
    lastActivity: "2024-01-22",
  },
]

const filterTabs = [
  { id: "all", label: "All contacts", count: 3 },
  { id: "newsletter", label: "Newsletter subscribers", count: 1 },
  { id: "unsubscribed", label: "Unsubscribed", count: 0 },
  { id: "customers", label: "All customers", count: 1 },
]

type SortField = "name" | "email" | "phone" | "leadStatus" | "favoriteContent"
type SortDirection = "asc" | "desc"

export function ContactsPage() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [filters, setFilters] = useState({
    owner: "all",
    createDate: "all",
    lastActivity: "all",
    leadStatus: "all",
  })

  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    let filtered = mockContacts

    // Apply tab filter
    if (activeTab === "newsletter") {
      filtered = filtered.filter((contact) => contact.favoriteContent === "Marketing")
    } else if (activeTab === "customers") {
      filtered = filtered.filter((contact) => contact.leadStatus === "Customer")
    } else if (activeTab === "unsubscribed") {
      filtered = []
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.leadStatus !== "all") {
      filtered = filtered.filter((contact) => contact.leadStatus === filters.leadStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const modifier = sortDirection === "asc" ? 1 : -1
      return aValue.localeCompare(bValue) * modifier
    })

    return filtered
  }, [activeTab, searchQuery, filters, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(paginatedContacts.map((c) => c.id))
    } else {
      setSelectedContacts([])
    }
  }

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, contactId])
    } else {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
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

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Lead Status", "Favorite Content"],
      ...filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.leadStatus,
        contact.favoriteContent,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contacts.csv"
    a.click()
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
            <h1 className="hubspot-heading-2">Contacts</h1>
            <ChevronDown className="w-5 h-5 text-gray-500" />
            <span className="hubspot-small-text text-gray-500">{filteredContacts.length} records</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
            >
              <Shield className="w-4 h-4" />
              Data Quality
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent hubspot-body-text"
                >
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

            <Button variant="outline" size="sm" className="hubspot-body-text bg-transparent">
              Import
            </Button>

            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 hubspot-body-text font-medium"
              onClick={() => setShowCreateModal(true)}
            >
              Create contact
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 hubspot-body-text rounded-md transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && tab.id === "all" && <X className="w-4 h-4" />}
            </button>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="ml-4 text-blue-600 border-blue-200 bg-transparent hubspot-body-text"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add view (4/5)
          </Button>

          <Button variant="ghost" size="sm" className="text-blue-600 hubspot-body-text">
            All Views
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
                >
                  Contact owner
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, owner: "all" })}>All owners</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, owner: "me" })}>
                  Assigned to me
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
                >
                  Create date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, createDate: "all" })}>
                  All time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, createDate: "30days" })}>
                  Last 30 days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
                >
                  Last activity date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, lastActivity: "all" })}>
                  All time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, lastActivity: "30days" })}>
                  Last 30 days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
                >
                  Lead status
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, leadStatus: "all" })}>
                  All statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, leadStatus: "New" })}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, leadStatus: "Qualified" })}>
                  Qualified
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({ ...filters, leadStatus: "Customer" })}>
                  Customer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
            >
              <Plus className="w-4 h-4" />
              More
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent text-blue-600 hubspot-body-text"
            >
              <Filter className="w-4 h-4" />
              Advanced filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="hubspot-body-text bg-transparent">
              Export
            </Button>
            <Button variant="outline" size="sm" className="hubspot-body-text bg-transparent">
              Edit columns
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search name, phone, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 hubspot-body-text"
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
                    paginatedContacts.length > 0 &&
                    paginatedContacts.every((contact) => selectedContacts.includes(contact.id))
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="hubspot-small-text font-semibold text-gray-700 uppercase tracking-wide">NAME</span>
                  <button onClick={() => handleSort("name")}>{getSortIcon("name")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="hubspot-small-text font-semibold text-gray-700 uppercase tracking-wide">EMAIL</span>
                  <button onClick={() => handleSort("email")}>{getSortIcon("email")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="hubspot-small-text font-semibold text-gray-700 uppercase tracking-wide">
                    PHONE NUMBER
                  </span>
                  <button onClick={() => handleSort("phone")}>{getSortIcon("phone")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="hubspot-small-text font-semibold text-gray-700 uppercase tracking-wide">
                    LEAD STATUS
                  </span>
                  <button onClick={() => handleSort("leadStatus")}>{getSortIcon("leadStatus")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="hubspot-small-text font-semibold text-gray-700 uppercase tracking-wide">
                    FAVORITE CONTENT TOPIC
                  </span>
                  <button onClick={() => handleSort("favoriteContent")}>{getSortIcon("favoriteContent")}</button>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {contact.avatar}
                    </div>
                    <span className="hubspot-link cursor-pointer">{contact.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="hubspot-link cursor-pointer">{contact.email}</span>
                </TableCell>
                <TableCell className="hubspot-body-text text-gray-500">{contact.phone}</TableCell>
                <TableCell className="hubspot-body-text text-gray-500">{contact.leadStatus}</TableCell>
                <TableCell className="hubspot-body-text text-gray-500">{contact.favoriteContent}</TableCell>
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
            className="hubspot-body-text"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button variant="ghost" size="sm" className="bg-blue-50 text-blue-600 hubspot-body-text">
            {currentPage}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="hubspot-body-text"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hubspot-body-text">
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

      <CreateContactModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}

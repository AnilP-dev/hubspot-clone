"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronDown,
  Plus,
  Trash2,
  Grid3X3,
  List,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import {
  setSearchTerm,
  setFilterType,
  toggleTicketSelection,
  selectAllTickets,
  clearSelection,
  deleteSelectedTickets,
  applyFilters,
} from "@/lib/store/slices/ticketsSlice"
import { CreateTicketModal } from "./create-ticket-modal"
import { UpdateTicketModal } from "./update-ticket-modal"
import { CrmNavigationDropdown } from "./crm-navigation-dropdown"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { FilterType, Ticket } from "@/lib/types"

const priorityColors = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  High: "bg-orange-500",
  Urgent: "bg-red-500",
}

export function TicketsPage() {
  const dispatch = useAppDispatch()
  const { filteredTickets, selectedTickets, searchTerm, filterType, isLoading } = useAppSelector(
    (state) => state.tickets,
  )

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  useEffect(() => {
    dispatch(applyFilters())
  }, [dispatch])

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = filteredTickets.slice(startIndex, endIndex)

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value))
    setCurrentPage(1)
  }

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilterType(filter))
    setCurrentPage(1)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      dispatch(selectAllTickets())
    } else {
      dispatch(clearSelection())
    }
  }

  const handleTicketSelect = (ticketId: string) => {
    dispatch(toggleTicketSelection(ticketId))
  }

  const handleDeleteSelected = () => {
    if (selectedTickets.length === 0) return

    dispatch(deleteSelectedTickets())
    toast.success(`${selectedTickets.length} ticket(s) deleted successfully`)
  }

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setShowUpdateModal(true)
  }

  const handleExport = () => {
    try {
      const csvHeaders = [
        "Ticket Name",
        "Pipeline",
        "Ticket Status",
        "Create Date",
        "Priority",
        "Owner",
        "Source",
        "Description",
      ]

      const csvData = filteredTickets.map((ticket) => [
        `"${ticket.name}"`,
        `"${ticket.pipeline}"`,
        `"${ticket.status}"`,
        `"${ticket.createDate}"`,
        `"${ticket.priority}"`,
        `"${ticket.owner}"`,
        `"${ticket.source}"`,
        `"${ticket.description}"`,
      ])

      const csvContent = [csvHeaders.join(","), ...csvData.map((row) => row.join(","))].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "tickets.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success(`Exported ${filteredTickets.length} tickets`)
    } catch (error) {
      toast.error("Failed to export tickets")
    }
  }

  const isAllSelected =
    currentTickets.length > 0 && currentTickets.every((ticket) => selectedTickets.includes(ticket.id))
  const isSomeSelected = currentTickets.some((ticket) => selectedTickets.includes(ticket.id))

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CrmNavigationDropdown currentTitle="Tickets" recordCount={filteredTickets.length} />
            <p className="text-sm text-gray-500 mt-1">
              {filteredTickets.length} record{filteredTickets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent"
                >
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                {selectedTickets.length > 0 && (
                  <DropdownMenuItem onClick={handleDeleteSelected} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected ({selectedTickets.length})
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Import
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8">
              Create ticket
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={filterType} onValueChange={(value) => handleFilterChange(value as FilterType)} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-auto grid-cols-3 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                All tickets
                {filterType === "all" && <X className="ml-2 h-3 w-3" />}
              </TabsTrigger>
              <TabsTrigger value="my" className="data-[state=active]:bg-white">
                My open tickets
              </TabsTrigger>
              <TabsTrigger value="unassigned" className="data-[state=active]:bg-white">
                Unassigned tickets
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent"
              >
                <Plus className="mr-1 h-3 w-3" />
                Add view (3/5)
              </Button>
              <Button variant="link" className="text-teal-600 hover:text-teal-700">
                All Views
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">All pipelines</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 bg-teal-50 px-3 py-1 rounded">
            <span className="text-sm text-teal-700">(1) Ticket owner</span>
            <X className="h-3 w-3 text-teal-700 cursor-pointer" />
          </div>

          <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 bg-transparent">
            Create date <ChevronDown className="ml-1 h-3 w-3" />
          </Button>

          <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 bg-transparent">
            Last activity date <ChevronDown className="ml-1 h-3 w-3" />
          </Button>

          <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 bg-transparent">
            Priority <ChevronDown className="ml-1 h-3 w-3" />
          </Button>

          <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 bg-transparent">
            <Plus className="mr-1 h-3 w-3" />
            More
          </Button>

          <Button variant="link" className="text-teal-600 hover:text-teal-700">
            Clear all
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-teal-600 border-teal-600"
            >
              <Filter className="mr-1 h-3 w-3" />
              Advanced filters
              {showAdvancedFilters && <X className="ml-1 h-3 w-3" />}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-1 h-3 w-3" />
              Edit columns
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ID, name, or description"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  indeterminate={isSomeSelected && !isAllSelected}
                />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                TICKET NAME
                <MoreHorizontal className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                PIPELINE
                <MoreHorizontal className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                TICKET STATUS
                <MoreHorizontal className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                CREATE DATE (GMT+5:30)
                <MoreHorizontal className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                PRIORITY
                <MoreHorizontal className="inline ml-1 h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTickets.map((ticket) => (
              <TableRow key={ticket.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={() => handleTicketSelect(ticket.id)}
                  />
                </TableCell>
                <TableCell>
                  <button 
                    className="text-teal-600 hover:text-teal-700 hover:underline font-medium"
                    onClick={() => handleTicketClick(ticket)}
                  >
                    {ticket.name}
                  </button>
                </TableCell>
                <TableCell className="text-gray-900">{ticket.pipeline}</TableCell>
                <TableCell className="text-gray-900">{ticket.status}</TableCell>
                <TableCell className="text-gray-900">{ticket.createDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", priorityColors[ticket.priority])} />
                    <span className="text-gray-900">{ticket.priority}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tickets found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTickets.length > 0 && (
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Page</span>
                <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-600">
                  {currentPage}
                </Button>
                <span className="text-sm text-gray-600">of {totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <CreateTicketModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      {/* Update Ticket Modal */}
      <UpdateTicketModal 
        open={showUpdateModal} 
        onOpenChange={setShowUpdateModal} 
        ticket={selectedTicket}
      />
    </div>
  )
}

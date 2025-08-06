"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Grid3X3,
  List,
  Download,
  ChevronDown,
  ArrowUpDown,
  Trash2,
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { deleteDeal, deleteDeals } from "@/lib/store/slices/dealsSlice"
import { CreateDealModal } from "./create-deal-modal"
import { DealDetailModal } from "./deal-detail-modal"
import { CrmNavigationDropdown } from "./crm-navigation-dropdown"
import { toast } from "sonner"

export function DealsPage() {
  const dispatch = useAppDispatch()
  const { deals } = useAppSelector((state) => state.deals)
  const [selectedDeals, setSelectedDeals] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredDeals = deals.filter(
    (deal) =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.owner && deal.owner.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDeals(filteredDeals.map((deal) => deal.id))
    } else {
      setSelectedDeals([])
    }
  }

  const handleSelectDeal = (dealId: string, checked: boolean) => {
    if (checked) {
      setSelectedDeals([...selectedDeals, dealId])
    } else {
      setSelectedDeals(selectedDeals.filter((id) => id !== dealId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedDeals.length === 0) return

    dispatch(deleteDeals(selectedDeals))
    setSelectedDeals([])
    toast.success(`${selectedDeals.length} deal(s) deleted successfully`)
  }

  const handleDeleteDeal = (dealId: string) => {
    dispatch(deleteDeal(dealId))
    toast.success("Deal deleted successfully")
  }

  const handleDealClick = (deal: any) => {
    setSelectedDeal(deal)
    setShowDetailModal(true)
  }

  const handleExportDeals = () => {
    try {
      // Create CSV headers
      const headers = ["Deal Name", "Stage", "Amount", "Close Date", "Owner", "Create Date", "Priority", "Type"]

      // Create CSV rows
      const csvRows = [
        headers.join(","),
        ...filteredDeals.map((deal) =>
          [
            `"${deal.name || ""}"`,
            `"${deal.stage || ""}"`,
            `"${deal.amount || 0}"`,
            `"${deal.closeDate || ""}"`,
            `"${deal.owner || ""}"`,
            `"${deal.createDate || ""}"`,
            `"${deal.priority || ""}"`,
            `"${deal.type || ""}"`,
          ].join(","),
        ),
      ]

      // Create and download CSV file
      const csvContent = csvRows.join("\n")
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", "deals.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      toast.success(`Exported ${filteredDeals.length} deals successfully`)
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export deals")
    }
  }

  const formatCurrency = (amount: string | number) => {
    // If amount is already a formatted string with currency symbol, return as is
    if (typeof amount === "string" && amount.includes("$")) {
      return amount
    }
    
    // If it's a string without currency symbol, parse it as number
    const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount
    
    // If parsing failed, return the original string or a default
    if (isNaN(numericAmount)) {
      return typeof amount === "string" ? amount : "$0"
    }
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericAmount)
  }

  const getStageColor = (stage: string) => {
    const colors = {
      "Appointment Scheduled": "bg-blue-100 text-blue-800",
      "Qualified To Buy": "bg-green-100 text-green-800",
      "Presentation Scheduled": "bg-yellow-100 text-yellow-800",
      "Decision Maker Bought-In": "bg-purple-100 text-purple-800",
      "Contract Sent": "bg-orange-100 text-orange-800",
      "Closed Won": "bg-green-100 text-green-800",
      "Closed Lost": "bg-red-100 text-red-800",
    }
    return colors[stage as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CrmNavigationDropdown currentTitle="Deals" recordCount={deals.length} />
            <p className="text-sm text-gray-600 mt-1">
              {deals.length} record{deals.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Import
            </Button>
            <Button onClick={() => setShowCreateModal(true)} className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8">
              Create deal
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-white rounded-lg border border-gray-200">
            <Button
              variant="ghost"
              className="bg-white text-gray-900 border-r border-gray-200 rounded-r-none hover:bg-gray-50"
            >
              All deals
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 rounded-l-none">
              My deals
            </Button>
          </div>
          <Button variant="link" className="text-[#00BDA5] p-0">
            <Plus className="h-4 w-4 mr-1" />
            Add view (2/5)
          </Button>
          <Button variant="link" className="text-[#00BDA5] p-0 ml-auto">
            All Views
          </Button>
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>

            <Select defaultValue="deal-owner">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deal-owner">Deal owner</SelectItem>
                <SelectItem value="anil">Anil Kumar Pandiya</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="create-date">
              <SelectTrigger className="w-32 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create-date">Create date</SelectItem>
                <SelectItem value="last-week">Last week</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
              <Plus className="w-4 h-4" />
              More
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
              <Filter className="w-4 h-4" />
              Advanced filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportDeals}
              variant="outline"
              size="sm"
              className="text-gray-600 bg-transparent hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
              Edit columns
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search deal name, stage, or owner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedDeals.length === filteredDeals.length && filteredDeals.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  DEAL NAME
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  STAGE
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  AMOUNT
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  CLOSE DATE
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  OWNER
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeals.map((deal) => (
              <TableRow key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedDeals.includes(deal.id)}
                    onCheckedChange={(checked) => handleSelectDeal(deal.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <span
                    className="text-[#00BDA5] hover:underline cursor-pointer font-medium"
                    onClick={() => handleDealClick(deal)}
                  >
                    {deal.name}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900 font-medium">{formatCurrency(deal.amount)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{deal.closeDate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{deal.owner || "Unassigned"}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No deals found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Prev
            </Button>
            <Button variant="outline" size="sm" className="bg-[#00BDA5] text-white border-[#00BDA5]">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">25 per page</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Delete selected button */}
      {selectedDeals.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedDeals.length} selected</span>
            <Button
              onClick={handleDeleteSelected}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Create Deal Modal */}
      <CreateDealModal open={showCreateModal} onOpenChange={setShowCreateModal} />

      {/* Deal Detail Modal */}
      <DealDetailModal deal={selectedDeal} open={showDetailModal} onOpenChange={setShowDetailModal} />
    </div>
  )
}

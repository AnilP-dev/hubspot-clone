"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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
import { deleteCompany, deleteCompanies } from "@/lib/store/slices/companiesSlice"
import { toast } from "sonner"

export function CompaniesPage() {
  const dispatch = useAppDispatch()
  const { companies } = useAppSelector((state) => state.companies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.domain && company.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.owner && company.owner.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompanies(filteredCompanies.map((company) => company.id))
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

  const handleDeleteSelected = () => {
    if (selectedCompanies.length === 0) return

    dispatch(deleteCompanies(selectedCompanies))
    setSelectedCompanies([])
    toast.success(`${selectedCompanies.length} company(ies) deleted successfully`)
  }

  const handleDeleteCompany = (companyId: string) => {
    dispatch(deleteCompany(companyId))
    toast.success("Company deleted successfully")
  }

  const handleExportCompanies = () => {
    try {
      // Create CSV headers
      const headers = [
        "Company Name",
        "Domain",
        "Owner",
        "Phone",
        "Create Date",
        "Last Activity Date",
        "Industry",
        "City",
        "State",
      ]

      // Create CSV rows
      const csvRows = [
        headers.join(","),
        ...filteredCompanies.map((company) =>
          [
            `"${company.name || ""}"`,
            `"${company.domain || ""}"`,
            `"${company.owner || ""}"`,
            `"${company.phone || ""}"`,
            `"${company.createDate || ""}"`,
            `"${company.lastActivityDate || ""}"`,
            `"${company.industry || ""}"`,
            `"${company.city || ""}"`,
            `"${company.state || ""}"`,
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
        link.setAttribute("download", "companies.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      toast.success(`Exported ${filteredCompanies.length} companies successfully`)
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export companies")
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Companies
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </h1>
            <p className="text-sm text-gray-600">
              {companies.length} record{companies.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 bg-transparent">
              Actions
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 bg-transparent">
              Import
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Create company</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-white rounded-lg border border-gray-200">
            <Button
              variant="ghost"
              className="bg-white text-gray-900 border-r border-gray-200 rounded-r-none hover:bg-gray-50"
            >
              All companies
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 rounded-l-none">
              My companies
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

            <Select defaultValue="company-owner">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company-owner">Company owner</SelectItem>
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

            <Button variant="outline" className="text-[#00BDA5] border-[#00BDA5] hover:bg-[#00BDA5]/5 bg-transparent">
              <Plus className="h-4 w-4 mr-1" />
              More
            </Button>

            <Button variant="outline" className="text-gray-600 border-gray-300 bg-transparent">
              <Filter className="h-4 w-4 mr-1" />
              Advanced filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportCompanies}
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
            placeholder="Search name, domain, or owner"
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
                  checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  COMPANY NAME
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  DOMAIN
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
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  PHONE
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  CREATE DATE
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={(checked) => handleSelectCompany(company.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {company.name.charAt(0)}
                    </div>
                    <span className="text-[#00BDA5] hover:underline cursor-pointer font-medium">{company.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[#00BDA5] hover:underline cursor-pointer">{company.domain || "--"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{company.owner || "Unassigned"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{company.phone || "--"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{company.createDate || "--"}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No companies found</p>
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
      {selectedCompanies.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedCompanies.length} selected</span>
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
    </div>
  )
}

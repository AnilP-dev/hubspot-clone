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
import { deleteContact, deleteContacts } from "@/lib/store/slices/contactsSlice"
import { CreateContactModal } from "./create-contact-modal"
import { toast } from "sonner"

export function ContactsPage() {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector((state) => state.contacts)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.jobTitle && contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map((contact) => contact.id))
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

  const handleDeleteSelected = () => {
    if (selectedContacts.length === 0) return

    dispatch(deleteContacts(selectedContacts))
    setSelectedContacts([])
    toast.success(`${selectedContacts.length} contact(s) deleted successfully`)
  }

  const handleDeleteContact = (contactId: string) => {
    dispatch(deleteContact(contactId))
    toast.success("Contact deleted successfully")
  }

  const handleExportContacts = () => {
    try {
      // Create CSV headers
      const headers = [
        "Name",
        "Email",
        "Phone",
        "Job Title",
        "Lead Status",
        "Favorite Content",
        "Contact Owner",
        "Create Date",
        "Last Activity Date",
      ]

      // Create CSV rows
      const csvRows = [
        headers.join(","),
        ...filteredContacts.map((contact) =>
          [
            `"${contact.name || ""}"`,
            `"${contact.email || ""}"`,
            `"${contact.phone || ""}"`,
            `"${contact.jobTitle || ""}"`,
            `"${contact.leadStatus || ""}"`,
            `"${contact.favoriteContent || ""}"`,
            `"${contact.contactOwner || ""}"`,
            `"${contact.createDate || ""}"`,
            `"${contact.lastActivityDate || ""}"`,
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
        link.setAttribute("download", "contacts.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      toast.success(`Exported ${filteredContacts.length} contacts successfully`)
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export contacts")
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Contacts
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </h1>
            <p className="text-sm text-gray-600">
              {contacts.length} record{contacts.length !== 1 ? "s" : ""}
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
            <Button onClick={() => setShowCreateModal(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
              Create contact
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
              All contacts
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 rounded-l-none">
              My contacts
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

            <Select defaultValue="contact-owner">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contact-owner">Contact owner</SelectItem>
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

            <Select defaultValue="last-activity">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-activity">Last activity date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
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
              onClick={handleExportContacts}
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
            placeholder="Search name, phone, or email"
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
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  NAME
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  PHONE NUMBER
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  EMAIL
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  LEAD STATUS
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  FAVORITE CONTENT
                  <ArrowUpDown className="h-4 w-4" />
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={contact.avatar || "/placeholder-user.jpg"}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[#00BDA5] hover:underline cursor-pointer font-medium">{contact.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{contact.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-[#00BDA5] hover:underline cursor-pointer">{contact.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{contact.leadStatus}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{contact.favoriteContent}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No contacts found</p>
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
      {selectedContacts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedContacts.length} selected</span>
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

      {/* Create Contact Modal */}
      <CreateContactModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}

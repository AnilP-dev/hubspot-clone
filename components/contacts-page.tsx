"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateContactModal } from "./create-contact-modal"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { deleteContact, deleteContacts } from "@/lib/store/slices/contactsSlice"
import { toast } from "sonner"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar,
  Plus,
} from "lucide-react"

type SortField = "name" | "email" | "company" | "jobTitle" | "leadStatus" | "owner" | "createDate" | "lastActivity"
type SortDirection = "asc" | "desc"

export function ContactsPage() {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector((state) => state.contacts)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All contacts")
  const [sortField, setSortField] = useState<SortField>("createDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    let filtered = [...contacts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (activeFilter !== "All contacts") {
      filtered = filtered.filter((contact) => {
        switch (activeFilter) {
          case "My contacts":
            return contact.owner === "Sarah Johnson" // Current user
          case "Unassigned":
            return !contact.owner
          case "Recently created":
            const createDate = new Date(contact.createDate || "")
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return createDate > weekAgo
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField] || ""
      let bValue = b[sortField] || ""

      if (sortField === "createDate" || sortField === "lastActivity") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else {
        aValue = aValue.toString().toLowerCase()
        bValue = bValue.toString().toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [contacts, searchTerm, activeFilter, sortField, sortDirection])

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
    setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    toast.success("Contact deleted successfully")
  }

  const handleExportContacts = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Company", "Job Title", "Lead Status", "Owner", "Create Date"],
      ...filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone || "",
        contact.company || "",
        contact.jobTitle || "",
        contact.leadStatus || "",
        contact.owner || "",
        contact.createDate || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contacts.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success("Contacts exported successfully")
  }

  const getLeadStatusBadge = (status: string) => {
    const statusColors = {
      New: "bg-blue-100 text-blue-800",
      Qualified: "bg-green-100 text-green-800",
      Contacted: "bg-yellow-100 text-yellow-800",
      Unqualified: "bg-red-100 text-red-800",
    }
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
  }

  const filterOptions = [
    { label: "All contacts", count: contacts.length },
    { label: "My contacts", count: contacts.filter((c) => c.owner === "Sarah Johnson").length },
    { label: "Unassigned", count: contacts.filter((c) => !c.owner).length },
    {
      label: "Recently created",
      count: contacts.filter((c) => {
        const createDate = new Date(c.createDate || "")
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return createDate > weekAgo
      }).length,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hubspot-heading-1">Contacts</h1>
          <p className="hubspot-body-text mt-1">Manage and organize your contacts</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Create contact
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 pb-4 border-b">
        {filterOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setActiveFilter(option.label)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFilter === option.label
                ? "bg-orange-100 text-orange-700 border border-orange-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Lead Status</DropdownMenuItem>
              <DropdownMenuItem>Lifecycle Stage</DropdownMenuItem>
              <DropdownMenuItem>Owner</DropdownMenuItem>
              <DropdownMenuItem>Create Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          {selectedContacts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedContacts.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleExportContacts}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-medium">
                  Name {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")} className="h-auto p-0 font-medium">
                  Email {getSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("company")} className="h-auto p-0 font-medium">
                  Company {getSortIcon("company")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("jobTitle")} className="h-auto p-0 font-medium">
                  Job Title {getSortIcon("jobTitle")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("leadStatus")} className="h-auto p-0 font-medium">
                  Lead Status {getSortIcon("leadStatus")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("owner")} className="h-auto p-0 font-medium">
                  Owner {getSortIcon("owner")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("createDate")} className="h-auto p-0 font-medium">
                  Create Date {getSortIcon("createDate")}
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {contact.name.charAt(0)}
                    </div>
                    {contact.name}
                  </div>
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone || "-"}</TableCell>
                <TableCell>{contact.company || "-"}</TableCell>
                <TableCell>{contact.jobTitle || "-"}</TableCell>
                <TableCell>
                  {contact.leadStatus && (
                    <Badge className={getLeadStatusBadge(contact.leadStatus)}>{contact.leadStatus}</Badge>
                  )}
                </TableCell>
                <TableCell>{contact.owner || "Unassigned"}</TableCell>
                <TableCell>{contact.createDate || "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule meeting
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteContact(contact.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found matching your criteria.</p>
        </div>
      )}

      <CreateContactModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}

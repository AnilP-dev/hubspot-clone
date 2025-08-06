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
  Plus,
  Settings,
  Download,
  ChevronDown,
  ArrowUpDown,
  Folder,
  List,
  Grid3X3,
  Edit,
  Trash2,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { deleteList, deleteLists } from "@/lib/store/slices/listsSlice"
import { toast } from "sonner"

export function ListsPage() {
  const dispatch = useAppDispatch()
  const { lists } = useAppSelector((state) => state.lists)
  const [selectedLists, setSelectedLists] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLists(filteredLists.map((list) => list.id))
    } else {
      setSelectedLists([])
    }
  }

  const handleSelectList = (listId: string, checked: boolean) => {
    if (checked) {
      setSelectedLists([...selectedLists, listId])
    } else {
      setSelectedLists(selectedLists.filter((id) => id !== listId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedLists.length > 0) {
      dispatch(deleteLists(selectedLists))
      setSelectedLists([])
      toast.success(`${selectedLists.length} list(s) deleted successfully`)
    }
  }

  const handleExport = () => {
    toast.info("Export functionality coming soon")
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Lists</h1>
            <p className="text-xs text-gray-600">1 list</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-[#00BDA5] font-bold text-xs tracking-normal leading-4 rounded-sm hover:text-[#00BDA5]"
           
          >
            What's new?
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm"
          >
            <Settings className="w-4 h-4" />
            Admin settings
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm"
          >
            <Download className="w-4 h-4" />
            Import
          </Button>
          <Select>
            <SelectTrigger 
              className="h-8 gap-2 font-light text-orange-500 border border-orange-500 hover:text-orange-500  text-xs tracking-normal leading-4 rounded-sm"
            >
              <SelectValue placeholder="Quick create" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contact-list">Contact list</SelectItem>
              <SelectItem value="company-list">Company list</SelectItem>
              <SelectItem value="deal-list">Deal list</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/crm/lists/create">
            <Button className=" h-8 bg-orange-500 hover:bg-orange-700 text-white rounded-sm">
              Create list
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-6 py-3 pb-0 border-b border-gray-200">
        <div className="flex items-center">
          <Button
            size="sm"
            variant={"ghost"}
            className="hover:bg-color-none"
            style={{ borderBottomColor: 'rgb(51, 71, 91)', borderBottomWidth: 3, borderRadius:0 }}
          >
            Manage
          </Button>
        </div>
      </div>

    <div className="mt-2 p-4">
      <div className="border-[1px] ">

      {/* Sub-tabs */}
      <div className="flex items-center px-6 py-2  border-gray-200">
        <div className="flex items-center gap-6">
          <button
            className={`px-3 py-2 text-sm font-medium border-b-2 ${
              activeTab === "all"
                ? "border-transparent text-gray-600 hover:text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={activeTab === "all" ? { borderBottomColor: '#00BDA5', color: '#00BDA5' } : {}}
            onClick={() => setActiveTab("all")}
          >
            All lists
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium border-b-2 ${
              activeTab === "unused"
                ? "border-transparent text-gray-600 hover:text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={activeTab === "unused" ? { borderBottomColor: '#00BDA5', color: '#00BDA5' } : {}}
            onClick={() => setActiveTab("unused")}
          >
            Unused lists
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium border-b-2 ${
              activeTab === "deleted"
                ? "border-transparent text-gray-600 hover:text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={activeTab === "deleted" ? { borderBottomColor: '#00BDA5', color: '#00BDA5' } : {}}
            onClick={() => setActiveTab("deleted")}
          >
            Recently deleted
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
            <Plus className="w-4 h-4" />
            Add view (3/5)
          </Button>
          <Button variant="ghost" size="sm" className="hover:text-[#00BDA5]" style={{ color: '#00BDA5' }}>
            All views
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Folder className="w-4 h-4" />
            Folders
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All creators" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All creators</SelectItem>
              <SelectItem value="me">Created by me</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="static">Static</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All objects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All objects</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="deal">Deal</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Used in" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="unused">Unused</SelectItem>
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
          <Button variant="ghost" size="sm" className="gap-2">
            Actions
            <ChevronDown className="w-4 h-4" />
          </Button>
          <div className="flex border rounded">
            <Button variant="ghost" size="sm" className="border-r">
              <List className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search lists"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {selectedLists.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedLists.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[#00BDA5] hover:text-[#00BDA5]/80"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-red-600 hover:text-red-700"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[#00BDA5] hover:text-[#00BDA5]/80"
              >
                <FolderOpen className="w-4 h-4" />
                Move to folder
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {filteredLists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <img 
              src="https://static.hsappstatic.net/ui-images/static-2.810/optimized/empty-state-charts.svg" 
              alt="No lists found"
              className="w-32 h-32 mb-4 opacity-50"
            />
            <div className="text-center">
              <p className="text-gray-600 font-medium mb-2">
                There aren't any lists matching your filters.
              </p>
              <p className="text-gray-500 text-sm">
                Try changing your filters and searching again.
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 text-xs">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLists.length === filteredLists.length && filteredLists.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    NAME
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    LIST SIZE
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    TYPE
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    OBJECT
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    LAST UPDATED (GMT +5:30)
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    CREATOR
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    FOLD...
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    USED IN (COUNT)
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLists.map((list) => (
                <TableRow key={list.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedLists.includes(list.id)}
                      onCheckedChange={(checked) => handleSelectList(list.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`/crm/lists/${list.id}`}
                      className="font-medium text-left hover:text-[#00BDA5]" 
                      style={{ color: '#00BDA5' }}
                    >
                      {list.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-900">{list.size}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00BDA5' }}></div>
                      <span className="text-gray-900">{list.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">{list.object}</TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {list.lastUpdated}
                      <div className="text-xs text-gray-500">by {list.creator}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">{list.creator}</TableCell>
                  <TableCell className="text-gray-900">{list.folder || "--"}</TableCell>
                  <TableCell className="text-gray-900">{list.usedInCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      </div>
    </div>
    </div>


  )
}

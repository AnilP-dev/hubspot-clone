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
  ChevronDown,
  ArrowUpDown,
  Plus,
  Folder,
  FolderOpen,
  Trash2,
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { deletePlaybooks, incrementViews } from "@/lib/store/slices/playbooksSlice"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function PlaybooksPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { playbooks } = useAppSelector((state) => state.playbooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlaybooks, setSelectedPlaybooks] = useState<string[]>([])

  const filteredPlaybooks = playbooks.filter((playbook) =>
    playbook.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePlaybook = () => {
    router.push("/crm/playbooks/create")
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPlaybooks(filteredPlaybooks.map((playbook) => playbook.id))
    } else {
      setSelectedPlaybooks([])
    }
  }

  const handleDeleteSelected = () => {
    if (selectedPlaybooks.length > 0) {
      dispatch(deletePlaybooks(selectedPlaybooks))
      setSelectedPlaybooks([])
      toast.success(`${selectedPlaybooks.length} playbook(s) deleted successfully`)
    }
  }

  const handlePlaybookClick = (playbookId: string) => {
    dispatch(incrementViews(playbookId))
    // Navigate to the editor page with the playbook ID
    router.push(`/crm/playbooks/editor?id=${playbookId}`)
  }

  const handleSelectPlaybook = (playbookId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlaybooks([...selectedPlaybooks, playbookId])
    } else {
      setSelectedPlaybooks(selectedPlaybooks.filter((id) => id !== playbookId))
    }
  }

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        * {
          font-family: "Lexend Deca", Helvetica, Arial, sans-serif;
        }
        .text-primary { color: #33475b; }
        .text-teal { color: #00BDA5; }
        .bg-teal { background-color: #00BDA5; }
        .border-teal { border-color: #00BDA5; }
        .text-orange { color: #FF7A00; }
        .bg-orange { background-color: #FF7A00; }
      `}</style>

      {/* Header - Full Width */}
      <div className="w-full px-8 py-6 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium text-primary">Playbooks</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
              <Folder className="w-4 h-4 mr-2" />
              New folder
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-orange-500 text-white hover:bg-orange-600"
              onClick={handleCreatePlaybook}
            >
              Create playbook
            </Button>
          </div>
        </div>
      </div>

      {/* Centered Container for Content */}
      <div className="flex justify-center w-full bg-white flex-1">
        <div className="w-full max-w-6xl mx-auto bg-white">
          {/* Navigation Tabs */}
          <div className="px-8 py-3 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <button className="px-3 py-2 text-sm font-medium text-teal-500 border-b-2 border-teal-500">
                Playbooks
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Analyze
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search playbooks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Owner:" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="me">Me</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Bar - shown when playbooks are selected */}
          {selectedPlaybooks.length > 0 && (
            <div className="px-8 py-3 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {selectedPlaybooks.length} selected
                </span>
                <Button variant="ghost" size="sm" className="text-teal-500 hover:bg-teal-50 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Move to folder
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto border-l border-r border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12 px-4">
                    <Checkbox
                      checked={selectedPlaybooks.length === filteredPlaybooks.length && filteredPlaybooks.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      NAME
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      TOTAL VIEWS
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      LAST VIEWED
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      CREATED BY
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center px-4">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      MODIFIED AT
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlaybooks.map((playbook) => (
                  <TableRow key={playbook.id} className="hover:bg-gray-50">
                    <TableCell className="px-4">
                      <Checkbox
                        checked={selectedPlaybooks.includes(playbook.id)}
                        onCheckedChange={(checked) => handleSelectPlaybook(playbook.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="px-4">
                      <div className="flex flex-col">
                        <button 
                          className="font-medium text-left text-teal-500 hover:text-teal-600"
                          onClick={() => handlePlaybookClick(playbook.id)}
                        >
                          {playbook.name}
                        </button>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-600">{playbook.status}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-gray-900">{playbook.totalViews}</TableCell>
                    <TableCell className="text-center text-gray-600">
                      {playbook.lastViewed || "--"}
                    </TableCell>
                    <TableCell className="text-center text-gray-900">{playbook.createdBy}</TableCell>
                    <TableCell className="text-center text-gray-900 px-4">{playbook.modifiedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer/Pagination placeholder */}
          <div className="px-8 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing {filteredPlaybooks.length} of {playbooks.length} playbooks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
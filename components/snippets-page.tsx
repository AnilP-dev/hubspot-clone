"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  ArrowUpDown,
  Plus,
  FolderPlus,
  FolderOpen,
  Trash2,
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { addSnippet, updateSnippet, deleteSnippets, type Snippet } from "@/lib/store/slices/snippetsSlice"
import { toast } from "sonner"
import { NewSnippetModal } from "./new-snippet-modal"

export function SnippetsPage() {
  const dispatch = useAppDispatch()
  const { snippets } = useAppSelector((state) => state.snippets)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSnippets, setSelectedSnippets] = useState<string[]>([])
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewSnippet = () => {
    setEditingSnippet(null)
    setIsModalOpen(true)
  }

  const handleSaveSnippet = (snippetData: Omit<Snippet, 'id' | 'dateCreated' | 'dateModified'>) => {
    if (editingSnippet) {
      // Update existing snippet
      const updatedSnippet: Snippet = {
        ...editingSnippet,
        ...snippetData,
        dateModified: "a few seconds ago",
      }
      dispatch(updateSnippet(updatedSnippet))
      toast.success("Snippet updated successfully!")
      setEditingSnippet(null)
    } else {
      // Create new snippet
      const newSnippet: Snippet = {
        ...snippetData,
        id: `snippet_${Date.now()}`,
        dateCreated: "a few seconds ago",
        dateModified: "a few seconds ago",
      }
      dispatch(addSnippet(newSnippet))
      toast.success("Snippet created successfully!")
    }
    setIsModalOpen(false)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSnippets(filteredSnippets.map((snippet) => snippet.id))
    } else {
      setSelectedSnippets([])
    }
  }

  const handleSelectSnippet = (snippetId: string, checked: boolean) => {
    if (checked) {
      setSelectedSnippets([...selectedSnippets, snippetId])
    } else {
      setSelectedSnippets(selectedSnippets.filter((id) => id !== snippetId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedSnippets.length > 0) {
      dispatch(deleteSnippets(selectedSnippets))
      setSelectedSnippets([])
      toast.success(`${selectedSnippets.length} snippet(s) deleted successfully`)
    }
  }

  const handleSnippetClick = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setIsModalOpen(true)
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
          <div>
            <h1 className="text-2xl font-medium text-primary">Snippets</h1>
            <p className="text-sm text-gray-600 mt-1">1 of 5,000 created</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              <FolderPlus className="w-4 h-4" />
              New folder
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8"
              onClick={handleNewSnippet}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create snippet
            </Button>
          </div>
        </div>
      </div>

      {/* Centered Container for Content */}
      <div className="flex justify-center w-full bg-white flex-1">
        <div className="w-full max-w-6xl mx-auto bg-white">
          {/* Search and Filters */}
          <div className="px-8 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search snippets"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Owner: Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="me">Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Bar - shown when snippets are selected */}
          {selectedSnippets.length > 0 && (
            <div className="px-8 py-3 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {selectedSnippets.length} selected
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
                      checked={selectedSnippets.length === filteredSnippets.length && filteredSnippets.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-left px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      NAME
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      CREATED BY
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      DATE CREATED
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-900 text-center px-4">
                    <div className="flex items-center gap-1 cursor-pointer justify-center">
                      DATE MODIFIED
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSnippets.map((snippet) => (
                  <TableRow key={snippet.id} className="hover:bg-gray-50">
                    <TableCell className="px-4">
                      <Checkbox
                        checked={selectedSnippets.includes(snippet.id)}
                        onCheckedChange={(checked) => handleSelectSnippet(snippet.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="px-4">
                      <button 
                        className="font-medium text-left text-teal-500 hover:text-teal-600"
                        onClick={() => handleSnippetClick(snippet)}
                      >
                        {snippet.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-center text-gray-900">{snippet.createdBy}</TableCell>
                    <TableCell className="text-center text-gray-900">{snippet.dateCreated}</TableCell>
                    <TableCell className="text-center text-gray-900 px-4">{snippet.dateModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing {filteredSnippets.length} of {snippets.length} snippets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New Snippet Modal */}
      <NewSnippetModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingSnippet(null)
        }}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />
    </div>
  )
}
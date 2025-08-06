"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Underline,
  MoreHorizontal,
  X,
} from "lucide-react"
import { type Snippet } from "@/lib/store/slices/snippetsSlice"

interface NewSnippetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (snippet: Omit<Snippet, 'id' | 'dateCreated' | 'dateModified'>) => void
  editingSnippet?: Snippet | null
}

export function NewSnippetModal({ isOpen, onClose, onSave, editingSnippet }: NewSnippetModalProps) {
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [shortcut, setShortcut] = useState("")

  // Pre-populate fields when editing
  React.useEffect(() => {
    if (editingSnippet) {
      setName(editingSnippet.name)
      setText(editingSnippet.text)
      setShortcut(editingSnippet.shortcut)
    } else {
      // Reset form when creating new snippet
      setName("")
      setText("")
      setShortcut("")
    }
  }, [editingSnippet, isOpen])

  const handleSave = () => {
    if (!name.trim()) {
      return
    }

    onSave({
      name: name.trim(),
      text: text.trim(),
      shortcut: shortcut.trim(),
      createdBy: "Rituparn Gehlot",
    })

    // Reset form
    setName("")
    setText("")
    setShortcut("")
  }

  const handleCancel = () => {
    // Reset form
    setName("")
    setText("")
    setShortcut("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
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
        
        {/* Header */}
        <DialogHeader className="bg-teal-500 text-white px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-white">
            {editingSnippet ? "Edit snippet" : "New snippet"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10 p-1"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="text-sm text-gray-600 leading-relaxed">
            <p>
              Snippets allow you to create reusable blocks of text that you can access quickly through 
              keyboard shortcuts. Get started by entering a phrase or line of text that you find yourself 
              typing often, like a greeting or meeting agenda. {" "}
              <button className="text-teal-500 hover:underline">Learn more.</button>
            </p>
          </div>

          {/* Internal name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Internal name <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              placeholder="Give your snippet a name"
            />
          </div>

          {/* Snippet text */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Snippet text <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[120px] resize-none border border-gray-300 rounded"
              placeholder="Add the content of your snippet"
            />
            
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200">
              <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
                <Underline className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
                <span className="text-sm font-bold">S</span>
              </Button>
              
              <div className="w-px h-4 bg-gray-300 mx-2"></div>
              
              <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-4 bg-gray-300 mx-2"></div>
              
              <Button size="sm" className="bg-teal-500 text-white hover:bg-teal-600 px-3 text-xs">
                Personalize
              </Button>
            </div>
          </div>

          {/* Shortcut */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Shortcut <span className="text-red-500">*</span>
            </label>
            <div className="text-sm text-gray-600 mb-3 leading-relaxed">
              To use a snippet, type the # symbol followed by the snippet shortcut you enter above. 
              The snippet will then appear in the text editor.
            </div>
            <div className="relative">
              <Input
                value={shortcut}
                onChange={(e) => setShortcut(e.target.value.replace(/^#/, ''))}
                className="w-full pl-8"
                placeholder="Type a word to use as a shortcut"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                #
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button 
            onClick={handleSave}
            className="bg-teal-500 text-white hover:bg-teal-600"
            disabled={!name.trim()}
          >
            {editingSnippet ? "Update snippet" : "Save snippet"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

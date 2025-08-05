"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Users,
  FolderOpen,
  X,
} from "lucide-react"
import { type MessageTemplate } from "@/lib/store/slices/messageTemplatesSlice"

interface NewTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (template: Omit<MessageTemplate, 'id' | 'dateCreated' | 'dateModified'>) => void
  editingTemplate?: MessageTemplate | null
}

export function NewTemplateModal({ isOpen, onClose, onSave, editingTemplate }: NewTemplateModalProps) {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [sharedWithEveryone, setSharedWithEveryone] = useState(true)
  const [folder, setFolder] = useState("")

  // Pre-populate fields when editing
  React.useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name)
      setSubject(editingTemplate.subject)
      setContent(editingTemplate.content)
      setSharedWithEveryone(editingTemplate.sharedWithEveryone)
      setFolder(editingTemplate.folder || "")
    } else {
      // Reset form when creating new template
      setName("")
      setSubject("")
      setContent("")
      setSharedWithEveryone(true)
      setFolder("")
    }
  }, [editingTemplate, isOpen])

  const handleSave = () => {
    if (!name.trim()) {
      return
    }

    onSave({
      name: name.trim(),
      subject: subject.trim(),
      content: content.trim(),
      owner: "Rituparn Gehlot",
      sharedWithEveryone,
      folder,
    })

    // Reset form
    setName("")
    setSubject("")
    setContent("")
    setSharedWithEveryone(true)
    setFolder("")
  }

  const handleCancel = () => {
    // Reset form
    setName("")
    setSubject("")
    setContent("")
    setSharedWithEveryone(true)
    setFolder("")
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
            {editingTemplate ? "Edit template" : "New template"}
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
        <div className="p-6 space-y-4">
          {/* Name and Owner Row */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Enter template name"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Owner: Rituparn Gehlot</label>
            </div>
          </div>

          {/* Subject Row */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Subject:</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${sharedWithEveryone ? 'text-teal-500' : 'text-gray-600'}`}
                  onClick={() => setSharedWithEveryone(true)}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Shared with everyone
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${!sharedWithEveryone ? 'text-teal-500' : 'text-gray-600'}`}
                  onClick={() => setSharedWithEveryone(false)}
                >
                  <FolderOpen className="w-4 h-4 mr-1" />
                  Select a folder
                </Button>
              </div>
            </div>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full"
              placeholder="Enter subject line"
            />
          </div>

          {/* Content Editor */}
          <div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[200px] resize-none border border-gray-300 rounded"
              placeholder="Type your message here..."
            />
            
            {/* Formatting Toolbar */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1">
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
                  Insert
                </Button>
                <Button size="sm" className="bg-teal-500 text-white hover:bg-teal-600 px-3 text-xs">
                  Personalize
                </Button>
              </div>
              
              <Button size="sm" className="bg-teal-500 text-white hover:bg-teal-600 px-3 text-xs">
                Generate with AI
              </Button>
            </div>
          </div>

          {/* Signature Notice */}
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <span className="text-orange-500">⚠</span>
            <div>
              <span>Your signature will be included when you use this template. </span>
              <button className="text-teal-500 hover:underline">Edit signature</button>
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
            {editingTemplate ? "Update template" : "Save template"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
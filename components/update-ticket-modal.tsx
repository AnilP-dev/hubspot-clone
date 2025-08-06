"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { updateTicket } from "@/lib/store/slices/ticketsSlice"
import { toast } from "sonner"
import type { Ticket } from "@/lib/types"

interface UpdateTicketModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: Ticket | null
}

const pipelines = [
  "Support Pipeline",
  "Sales Pipeline",
  "Service Pipeline",
]

const statuses = [
  "New (Support Pipeline)",
  "Open (Support Pipeline)",
  "In Progress (Support Pipeline)",
  "Waiting on Contact (Support Pipeline)",
  "Waiting on Third Party (Support Pipeline)",
  "Closed (Support Pipeline)",
]

const sources = [
  "Email",
  "Phone",
  "Chat",
  "Web Form",
  "Social Media",
  "Other",
]

const priorities = ["Low", "Medium", "High", "Urgent"]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function UpdateTicketModal({ open, onOpenChange, ticket }: UpdateTicketModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pipeline: "Support Pipeline",
    status: "New (Support Pipeline)",
    source: "Email",
    owner: "Anil Kumar Pandiya",
    priority: "Low" as "Low" | "Medium" | "High" | "Urgent",
    associatedContact: "",
    associatedCompany: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when ticket changes
  useEffect(() => {
    if (ticket) {
      setFormData({
        name: ticket.name || "",
        description: ticket.description || "",
        pipeline: ticket.pipeline || "Support Pipeline",
        status: ticket.status || "New (Support Pipeline)",
        source: ticket.source || "Email",
        owner: ticket.owner || "Anil Kumar Pandiya",
        priority: ticket.priority || "Low",
        associatedContact: ticket.associatedContact || "",
        associatedCompany: ticket.associatedCompany || "",
      })
    }
  }, [ticket])

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Ticket name is required")
      return
    }

    if (!ticket) {
      toast.error("No ticket selected")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedTicket: Ticket = {
        ...ticket,
        name: formData.name,
        description: formData.description,
        pipeline: formData.pipeline,
        status: formData.status,
        source: formData.source,
        owner: formData.owner,
        priority: formData.priority,
        associatedContact: formData.associatedContact,
        associatedCompany: formData.associatedCompany,
        lastActivityDate: "Just now",
      }

      dispatch(updateTicket(updatedTicket))
      toast.success("Ticket updated successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update ticket")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!ticket) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="bg-[#00BDA5] text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Update Ticket</DialogTitle>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1 h-auto" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Edit form link */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-end">
            <Button variant="link" className="text-[#00BDA5] p-0 h-auto text-sm">
              Edit this form <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Ticket name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Ticket name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-2 border-[#00BDA5] focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter ticket name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter ticket description"
              rows={3}
            />
          </div>

          {/* Pipeline */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Pipeline</Label>
            <Select
              value={formData.pipeline}
              onValueChange={(value) => setFormData({ ...formData, pipeline: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map((pipeline) => (
                  <SelectItem key={pipeline} value={pipeline}>
                    {pipeline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value) => setFormData({ ...formData, source: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ticket owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ticket owner</Label>
            <Select
              value={formData.owner}
              onValueChange={(value) => setFormData({ ...formData, owner: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value as "Low" | "Medium" | "High" | "Urgent" })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Associated Contact */}
          <div className="space-y-2">
            <Label htmlFor="associatedContact" className="text-sm font-medium text-gray-700">
              Associated Contact
            </Label>
            <Input
              id="associatedContact"
              value={formData.associatedContact}
              onChange={(e) => setFormData({ ...formData, associatedContact: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter associated contact"
            />
          </div>

          {/* Associated Company */}
          <div className="space-y-2">
            <Label htmlFor="associatedCompany" className="text-sm font-medium text-gray-700">
              Associated Company
            </Label>
            <Input
              id="associatedCompany"
              value={formData.associatedCompany}
              onChange={(e) => setFormData({ ...formData, associatedCompany: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter associated company"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#00BDA5] hover:bg-[#00A693] text-white"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
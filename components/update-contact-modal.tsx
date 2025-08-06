"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { updateContact } from "@/lib/store/slices/contactsSlice"
import { toast } from "sonner"
import type { Contact } from "@/lib/store/slices/contactsSlice"

interface UpdateContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: Contact | null
}

const lifecycleStages = [
  "Subscriber",
  "Lead",
  "Marketing Qualified Lead",
  "Sales Qualified Lead",
  "Opportunity",
  "Customer",
  "Evangelist",
  "Other",
]

const leadStatuses = [
  "New",
  "Qualified",
  "Unqualified",
  "Recycled",
  "Working",
  "Converted",
]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function UpdateContactModal({ open, onOpenChange, contact }: UpdateContactModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactOwner: "Anil Kumar Pandiya",
    jobTitle: "",
    phone: "",
    lifecycleStage: "Subscriber",
    leadStatus: "New",
    favoriteContent: "Blog Posts",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        email: contact.email || "",
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        contactOwner: contact.contactOwner || "Anil Kumar Pandiya",
        jobTitle: contact.jobTitle || "",
        phone: contact.phone === "--" ? "" : contact.phone || "",
        lifecycleStage: contact.lifecycleStage || "Subscriber",
        leadStatus: contact.leadStatus || "New",
        favoriteContent: contact.favoriteContent || "Blog Posts",
      })
    }
  }, [contact])

  const handleSubmit = async () => {
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return
    }

    if (!contact) {
      toast.error("No contact selected")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.email

      const updatedContact: Contact = {
        ...contact,
        name: fullName,
        email: formData.email,
        phone: formData.phone || "--",
        leadStatus: formData.leadStatus,
        favoriteContent: formData.favoriteContent,
        firstName: formData.firstName,
        lastName: formData.lastName,
        jobTitle: formData.jobTitle,
        lifecycleStage: formData.lifecycleStage,
        contactOwner: formData.contactOwner,
        lastActivityDate: "Just now",
      }

      dispatch(updateContact(updatedContact))
      toast.success("Contact updated successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!contact) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="bg-[#00BDA5] text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Update Contact</DialogTitle>
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
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-2 border-[#00BDA5] focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter email address"
            />
          </div>

          {/* First name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First name
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter first name"
            />
          </div>

          {/* Last name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last name
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter last name"
            />
          </div>

          {/* Contact owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Contact owner</Label>
            <div className="text-xs text-gray-500 mb-2">Start by entering the Contact's name, email, or both.</div>
            <Select
              value={formData.contactOwner}
              onValueChange={(value) => setFormData({ ...formData, contactOwner: value })}
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

          {/* Job title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
              Job title
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter job title"
            />
          </div>

          {/* Phone number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter phone number"
            />
          </div>

          {/* Lead Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Lead Status</Label>
            <Select
              value={formData.leadStatus}
              onValueChange={(value) => setFormData({ ...formData, leadStatus: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {leadStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lifecycle stage */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Lifecycle stage</Label>
            <Select
              value={formData.lifecycleStage}
              onValueChange={(value) => setFormData({ ...formData, lifecycleStage: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lifecycleStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Favorite Content */}
          <div className="space-y-2">
            <Label htmlFor="favoriteContent" className="text-sm font-medium text-gray-700">
              Favorite Content
            </Label>
            <Input
              id="favoriteContent"
              value={formData.favoriteContent}
              onChange={(e) => setFormData({ ...formData, favoriteContent: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter favorite content"
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

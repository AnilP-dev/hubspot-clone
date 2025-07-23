"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { addContact } from "@/lib/store/slices/contactsSlice"
import { toast } from "sonner"

interface CreateContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function CreateContactModal({ open, onOpenChange }: CreateContactModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactOwner: "Anil Kumar Pandiya",
    jobTitle: "",
    phone: "",
    lifecycleStage: "Subscriber",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (createAnother = false) => {
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.email

      dispatch(
        addContact({
          name: fullName,
          email: formData.email,
          phone: formData.phone || "--",
          leadStatus: "New",
          favoriteContent: "Blog Posts",
          avatar: "/placeholder-user.jpg",
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          lifecycleStage: formData.lifecycleStage,
          contactOwner: formData.contactOwner,
        }),
      )

      toast.success("Contact created successfully!")

      if (!createAnother) {
        onOpenChange(false)
        resetForm()
      } else {
        resetForm()
      }
    } catch (error) {
      toast.error("Failed to create contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      contactOwner: "Anil Kumar Pandiya",
      jobTitle: "",
      phone: "",
      lifecycleStage: "Subscriber",
    })
  }

  const handleClose = () => {
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="bg-[#00BDA5] text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Create Contact</DialogTitle>
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-2">
          <Button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="bg-[#00BDA5] hover:bg-[#00A693] text-white"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            variant="outline"
            className="border-[#00BDA5] text-[#00BDA5] hover:bg-[#00BDA5]/5"
          >
            Create and add another
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

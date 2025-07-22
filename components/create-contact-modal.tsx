"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { addContact } from "@/lib/store/slices/contactsSlice"
import { toast } from "sonner"

interface CreateContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateContactModal({ isOpen, onClose }: CreateContactModalProps) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactOwner: "",
    jobTitle: "",
    phoneNumber: "",
    lifecycleStage: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      contactOwner: "",
      jobTitle: "",
      phoneNumber: "",
      lifecycleStage: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email) {
      toast.error("Email is required")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create the contact object
      const newContact = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.email,
        phone: formData.phoneNumber,
        jobTitle: formData.jobTitle,
        owner: formData.contactOwner || "Unassigned",
        lifecycleStage: formData.lifecycleStage || "Lead",
        leadStatus: "New",
        source: "Manual",
      }

      // Add to Redux store
      dispatch(addContact(newContact))

      toast.success("Contact created successfully!")
      resetForm()
      onClose()
    } catch (error) {
      toast.error("Failed to create contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateAndAddAnother = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email) {
      toast.error("Email is required")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create the contact object
      const newContact = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.email,
        phone: formData.phoneNumber,
        jobTitle: formData.jobTitle,
        owner: formData.contactOwner || "Unassigned",
        lifecycleStage: formData.lifecycleStage || "Lead",
        leadStatus: "New",
        source: "Manual",
      }

      // Add to Redux store
      dispatch(addContact(newContact))

      toast.success("Contact created successfully!")
      resetForm()
      // Keep modal open for adding another
    } catch (error) {
      toast.error("Failed to create contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Contact</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-600 p-1 h-auto">
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-600 p-1 h-auto" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-4 text-right">
            <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
              Edit this form
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder=""
                required
              />
            </div>

            {/* First name */}
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-300"
                placeholder=""
              />
            </div>

            {/* Last name */}
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-300"
                placeholder=""
              />
            </div>

            {/* Contact owner */}
            <div>
              <Label htmlFor="contactOwner" className="text-sm font-medium text-gray-500">
                Contact owner
              </Label>
              <div className="mt-1 text-sm text-gray-500 mb-2">
                Start by entering the Contact's name, email, or both.
              </div>
              <Input
                id="contactOwner"
                value={formData.contactOwner}
                onChange={(e) => handleInputChange("contactOwner", e.target.value)}
                className="bg-gray-50 border-gray-300"
                placeholder=""
              />
            </div>

            {/* Job title */}
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                Job title
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-300"
                placeholder=""
              />
            </div>

            {/* Phone number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-300"
                placeholder=""
              />
            </div>

            {/* Lifecycle stage */}
            <div>
              <Label htmlFor="lifecycleStage" className="text-sm font-medium text-gray-700">
                Lifecycle stage
              </Label>
              <Select
                value={formData.lifecycleStage}
                onValueChange={(value) => handleInputChange("lifecycleStage", value)}
              >
                <SelectTrigger className="mt-1 bg-gray-50 border-gray-300">
                  <SelectValue placeholder="Select lifecycle stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Subscriber">Subscriber</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Marketing Qualified Lead">Marketing Qualified Lead</SelectItem>
                  <SelectItem value="Sales Qualified Lead">Sales Qualified Lead</SelectItem>
                  <SelectItem value="Opportunity">Opportunity</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Evangelist">Evangelist</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-6 mt-6">
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
              <Button
                onClick={handleCreateAndAddAnother}
                disabled={isSubmitting}
                variant="outline"
                className="border-gray-300 bg-transparent"
              >
                Create and add another
              </Button>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="text-orange-600 border-orange-600 hover:bg-orange-50 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

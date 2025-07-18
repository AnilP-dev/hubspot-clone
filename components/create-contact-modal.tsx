"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface CreateContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateContactModal({ open, onOpenChange }: CreateContactModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactOwner: "",
    jobTitle: "",
    phoneNumber: "",
    lifecycleStage: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating contact:", formData)
    toast.success("Contact created successfully!")

    // Reset form
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      contactOwner: "",
      jobTitle: "",
      phoneNumber: "",
      lifecycleStage: "",
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  const handleCreateAndAddAnother = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating contact:", formData)
    toast.success("Contact created successfully!")

    // Reset form but keep modal open
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      contactOwner: "",
      jobTitle: "",
      phoneNumber: "",
      lifecycleStage: "",
    })

    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 bg-white">
        <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold">Create Contact</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-600 p-1">
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-teal-600 p-1"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 text-right">
            <Button variant="link" className="text-blue-600 text-sm p-0">
              Edit this form
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contactOwner" className="text-sm font-medium text-gray-500">
                Contact owner
              </Label>
              <div className="mt-1 text-sm text-gray-500">Start by entering the Contact's name, email, or both.</div>
            </div>

            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium">
                Job title
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lifecycleStage" className="text-sm font-medium">
                Lifecycle stage
              </Label>
              <Select
                value={formData.lifecycleStage}
                onValueChange={(value) => setFormData({ ...formData, lifecycleStage: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscriber">Subscriber</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCreateAndAddAnother} disabled={isSubmitting}>
                  Create and add another
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                className="text-orange-600 border-orange-600 hover:bg-orange-50 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

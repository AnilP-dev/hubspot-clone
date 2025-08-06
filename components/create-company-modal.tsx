"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { addCompany } from "@/lib/store/slices/companiesSlice"
import { toast } from "sonner"

interface CreateCompanyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Other",
]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function CreateCompanyModal({ open, onOpenChange }: CreateCompanyModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    owner: "Anil Kumar Pandiya",
    phone: "",
    industry: "Technology",
    city: "",
    state: "",
    country: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (createAnother = false) => {
    if (!formData.name.trim()) {
      toast.error("Company name is required")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch(
        addCompany({
          name: formData.name,
          domain: formData.domain || undefined,
          owner: formData.owner,
          phone: formData.phone || undefined,
          industry: formData.industry,
          city: formData.city || undefined,
          state: formData.state || undefined,
          country: formData.country || undefined,
        }),
      )

      toast.success("Company created successfully!")

      if (!createAnother) {
        onOpenChange(false)
        resetForm()
      } else {
        resetForm()
      }
    } catch (error) {
      toast.error("Failed to create company")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      domain: "",
      owner: "Anil Kumar Pandiya",
      phone: "",
      industry: "Technology",
      city: "",
      state: "",
      country: "",
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
          <DialogTitle className="text-xl font-medium">Create Company</DialogTitle>
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
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Company name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-2 border-[#00BDA5] focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter company name"
            />
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-sm font-medium text-gray-700">
              Company domain name
            </Label>
            <Input
              id="domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter domain name"
            />
          </div>

          {/* Company owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Company owner</Label>
            <div className="text-xs text-gray-500 mb-2">Start by entering the Company's name, domain, or both.</div>
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

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Industry</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => setFormData({ ...formData, industry: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
              State/Region
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter state/region"
            />
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
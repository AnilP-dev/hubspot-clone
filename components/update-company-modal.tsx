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
import { updateCompany } from "@/lib/store/slices/companiesSlice"
import { toast } from "sonner"
import type { Company } from "@/lib/store/slices/companiesSlice"

interface UpdateCompanyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  company: Company | null
}

const industries = [
  "Software",
  "Technology",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Real Estate",
  "Consulting",
  "Other",
]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function UpdateCompanyModal({ open, onOpenChange, company }: UpdateCompanyModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    owner: "Anil Kumar Pandiya",
    phone: "",
    industry: "Software",
    city: "",
    state: "",
    country: "United States",
    employees: "",
    annualRevenue: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when company changes
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        domain: company.domain || "",
        owner: company.owner || "Anil Kumar Pandiya",
        phone: company.phone || "",
        industry: company.industry || "Software",
        city: company.city || "",
        state: company.state || "",
        country: company.country || "United States",
        employees: company.employees?.toString() || "",
        annualRevenue: company.annualRevenue?.toString() || "",
        description: company.description || "",
      })
    }
  }, [company])

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Company name is required")
      return
    }

    if (!company) {
      toast.error("No company selected")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedCompany: Company = {
        ...company,
        name: formData.name,
        domain: formData.domain,
        owner: formData.owner,
        phone: formData.phone,
        industry: formData.industry,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        employees: formData.employees ? parseInt(formData.employees) : undefined,
        annualRevenue: formData.annualRevenue ? parseInt(formData.annualRevenue) : undefined,
        description: formData.description,
        lastActivityDate: "Just now",
      }

      dispatch(updateCompany(updatedCompany))
      toast.success("Company updated successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update company")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!company) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="bg-[#00BDA5] text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Update Company</DialogTitle>
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
          {/* Company name */}
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
              Domain
            </Label>
            <Input
              id="domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter domain"
            />
          </div>

          {/* Company owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Company owner</Label>
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

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
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
              State
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter state"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter country"
            />
          </div>

          {/* Employees */}
          <div className="space-y-2">
            <Label htmlFor="employees" className="text-sm font-medium text-gray-700">
              Number of employees
            </Label>
            <Input
              id="employees"
              type="number"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter number of employees"
            />
          </div>

          {/* Annual Revenue */}
          <div className="space-y-2">
            <Label htmlFor="annualRevenue" className="text-sm font-medium text-gray-700">
              Annual revenue
            </Label>
            <Input
              id="annualRevenue"
              type="number"
              value={formData.annualRevenue}
              onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter annual revenue"
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
              placeholder="Enter company description"
              rows={3}
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
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink, Calendar, Search, Info } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addDeal } from "@/lib/store/slices/dealsSlice"
import { toast } from "sonner"

interface CreateDealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const dealStages = [
  "Appointment Scheduled",
  "Qualified To Buy",
  "Presentation Scheduled",
  "Decision Maker Bought-In",
  "Contract Sent",
  "Closed Won",
  "Closed Lost",
]

const dealTypes = ["New Business", "Existing Business", "Renewal"]

const priorities = [
  { value: "Low", color: "bg-green-500" },
  { value: "Medium", color: "bg-orange-500" },
  { value: "High", color: "bg-red-500" },
]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function CreateDealModal({ open, onOpenChange }: CreateDealModalProps) {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector((state) => state.contacts)
  const { companies } = useAppSelector((state) => state.companies)

  const [formData, setFormData] = useState({
    name: "",
    pipeline: "Sales Pipeline",
    stage: "Appointment Scheduled",
    amount: "",
    closeDate: "07/31/2025",
    owner: "Anil Kumar Pandiya",
    dealType: "",
    priority: "Low" as "Low" | "Medium" | "High",
    associatedContacts: [] as string[],
    associatedCompanies: [] as string[],
    lineItems: [] as Array<{ name: string; quantity: number }>,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactSearch, setContactSearch] = useState("")
  const [companySearch, setCompanySearch] = useState("")
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.email.toLowerCase().includes(contactSearch.toLowerCase()),
  )

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(companySearch.toLowerCase()),
  )

  const handleSubmit = async (createAnother = false) => {
    if (!formData.name.trim()) {
      toast.error("Deal name is required")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch(
        addDeal({
          name: formData.name,
          amount: formData.amount || "$0",
          stage: formData.stage,
          pipeline: formData.pipeline,
          closeDate: formData.closeDate,
          owner: formData.owner,
          dealType: formData.dealType || "New Business",
          priority: formData.priority,
          lastActivityDate: "--",
          associatedContacts: formData.associatedContacts,
          associatedCompanies: formData.associatedCompanies,
          recordSource: "CRM UI",
        }),
      )

      toast.success("Deal created successfully!")

      if (!createAnother) {
        onOpenChange(false)
        resetForm()
      } else {
        resetForm()
      }
    } catch (error) {
      toast.error("Failed to create deal")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      pipeline: "Sales Pipeline",
      stage: "Appointment Scheduled",
      amount: "",
      closeDate: "07/31/2025",
      owner: "Anil Kumar Pandiya",
      dealType: "",
      priority: "Low",
      associatedContacts: [],
      associatedCompanies: [],
      lineItems: [],
    })
    setContactSearch("")
    setCompanySearch("")
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
          <DialogTitle className="text-xl font-medium">Create Deal</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1 h-auto" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
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
          {/* Deal name */}
          <div className="space-y-2">
            <Label htmlFor="dealName" className="text-sm font-medium text-gray-700">
              Deal name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dealName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter deal name"
            />
          </div>

          {/* Pipeline */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Pipeline <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.pipeline} onValueChange={(value) => setFormData({ ...formData, pipeline: value })}>
              <SelectTrigger className="border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales Pipeline">Sales Pipeline</SelectItem>
                <SelectItem value="Marketing Pipeline">Marketing Pipeline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deal stage */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Deal stage <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
              <SelectTrigger className="border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search"
                      className="pl-10 border-[#00BDA5] focus:border-[#00BDA5] focus:ring-[#00BDA5]"
                    />
                  </div>
                </div>
                {dealStages.map((stage) => (
                  <SelectItem key={stage} value={stage} className="py-2">
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount
            </Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="$0"
            />
          </div>

          {/* Close date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Close date</Label>
            <div className="relative">
              <Input
                value={formData.closeDate}
                onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5] pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Deal owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Deal owner</Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
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

          {/* Deal type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Deal type</Label>
            <Select value={formData.dealType} onValueChange={(value) => setFormData({ ...formData, dealType: value })}>
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue placeholder="Select deal type" />
              </SelectTrigger>
              <SelectContent>
                {dealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
              onValueChange={(value: "Low" | "Medium" | "High") => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                      {priority.value}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 my-6" />

          {/* Associate Deal with */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Associate Deal with</h3>

            {/* Contact */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Contact</Label>
              <div className="relative">
                <Input
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  onFocus={() => setShowContactDropdown(true)}
                  onBlur={() => setTimeout(() => setShowContactDropdown(false), 200)}
                  className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
                  placeholder="Search"
                />
                {showContactDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setContactSearch(contact.name)
                          setFormData({
                            ...formData,
                            associatedContacts: [...formData.associatedContacts, contact.id],
                          })
                          setShowContactDropdown(false)
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img src={contact.avatar || "/placeholder.svg"} alt="" className="w-6 h-6 rounded-full" />
                          <div>
                            <div className="text-sm font-medium">{contact.name}</div>
                            <div className="text-xs text-gray-500">{contact.email}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Info className="h-3 w-3" />
                Add timeline activity from this contact
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-gray-700">Company</Label>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <div className="relative">
                <Input
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  onFocus={() => setShowCompanyDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCompanyDropdown(false), 200)}
                  className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
                  placeholder="Search"
                />
                {showCompanyDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setCompanySearch(company.name)
                          setFormData({
                            ...formData,
                            associatedCompanies: [...formData.associatedCompanies, company.id],
                          })
                          setShowCompanyDropdown(false)
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img src={company.avatar || "/placeholder.svg"} alt="" className="w-6 h-6 rounded" />
                          <div>
                            <div className="text-sm font-medium">{company.name}</div>
                            <div className="text-xs text-gray-500">{company.domain}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Info className="h-3 w-3" />
                Add timeline activity from this company
              </div>
            </div>

            {/* Add line item */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700">Add line item</Label>
                <Label className="text-sm font-medium text-gray-700">Quantity</Label>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                    <SelectValue placeholder="Add a line item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-20 bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
                  placeholder="0"
                />
              </div>
            </div>
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

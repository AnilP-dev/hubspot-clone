"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ExternalLink } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { updateDeal } from "@/lib/store/slices/dealsSlice"
import { toast } from "sonner"
import type { Deal } from "@/lib/store/slices/dealsSlice"

interface UpdateDealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deal: Deal | null
}

const stages = [
  "Appointment Scheduled",
  "Qualified to Buy",
  "Presentation Scheduled",
  "Contract Sent",
  "Closed Won",
  "Closed Lost",
]

const pipelines = [
  "Sales Pipeline",
  "Marketing Pipeline",
  "Service Pipeline",
]

const dealTypes = [
  "New Business",
  "Existing Business",
  "Renewal",
  "Upgrade",
]

const priorities = ["Low", "Medium", "High"]

const owners = ["Anil Kumar Pandiya", "Sarah Wilson", "Mike Davis", "John Smith"]

export function UpdateDealModal({ open, onOpenChange, deal }: UpdateDealModalProps) {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    stage: "Appointment Scheduled",
    pipeline: "Sales Pipeline",
    closeDate: "",
    owner: "Anil Kumar Pandiya",
    dealType: "New Business",
    priority: "Low" as "Low" | "Medium" | "High",
    recordSource: "CRM UI",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when deal changes
  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name || "",
        amount: deal.amount || "",
        stage: deal.stage || "Appointment Scheduled",
        pipeline: deal.pipeline || "Sales Pipeline",
        closeDate: deal.closeDate || "",
        owner: deal.owner || "Anil Kumar Pandiya",
        dealType: deal.dealType || "New Business",
        priority: deal.priority || "Low",
        recordSource: deal.recordSource || "CRM UI",
      })
    }
  }, [deal])

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Deal name is required")
      return
    }

    if (!deal) {
      toast.error("No deal selected")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedDeal: Deal = {
        ...deal,
        name: formData.name,
        amount: formData.amount,
        stage: formData.stage,
        pipeline: formData.pipeline,
        closeDate: formData.closeDate,
        owner: formData.owner,
        dealType: formData.dealType,
        priority: formData.priority,
        recordSource: formData.recordSource,
        lastActivityDate: "Just now",
      }

      dispatch(updateDeal(updatedDeal))
      toast.success("Deal updated successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update deal")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!deal) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="bg-[#00BDA5] text-white px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Update Deal</DialogTitle>
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
          {/* Deal name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Deal name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-2 border-[#00BDA5] focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter deal name"
            />
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
              placeholder="Enter amount"
            />
          </div>

          {/* Stage */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Stage</Label>
            <Select
              value={formData.stage}
              onValueChange={(value) => setFormData({ ...formData, stage: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          {/* Close date */}
          <div className="space-y-2">
            <Label htmlFor="closeDate" className="text-sm font-medium text-gray-700">
              Close date
            </Label>
            <Input
              id="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
            />
          </div>

          {/* Deal owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Deal owner</Label>
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

          {/* Deal type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Deal type</Label>
            <Select
              value={formData.dealType}
              onValueChange={(value) => setFormData({ ...formData, dealType: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]">
                <SelectValue />
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
              onValueChange={(value) => setFormData({ ...formData, priority: value as "Low" | "Medium" | "High" })}
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

          {/* Record source */}
          <div className="space-y-2">
            <Label htmlFor="recordSource" className="text-sm font-medium text-gray-700">
              Record source
            </Label>
            <Input
              id="recordSource"
              value={formData.recordSource}
              onChange={(e) => setFormData({ ...formData, recordSource: e.target.value })}
              className="bg-gray-50 border-gray-300 focus:border-[#00BDA5] focus:ring-[#00BDA5]"
              placeholder="Enter record source"
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

"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { AppDispatch } from "@/lib/store"
import { addBudgetItemToCampaign, addActivity, type BudgetItem, type Activity } from "@/lib/store/slices/campaignsSlice"

interface BudgetItemFormProps {
  isOpen: boolean
  onClose: () => void
  campaignId?: string
}

interface BudgetItemFormData {
  name: string
  description: string
  unitPrice: string
  currency: string
}

export function BudgetItemForm({ isOpen, onClose, campaignId }: BudgetItemFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<BudgetItemFormData>({
    name: "",
    description: "",
    unitPrice: "",
    currency: "US Dollar (USD) $"
  })

  const handleInputChange = (field: keyof BudgetItemFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = (addAnother = false) => {
    if (!formData.name.trim()) {
      alert("Please enter a budget item name")
      return
    }

    if (!formData.unitPrice.trim()) {
      alert("Please enter a unit price")
      return
    }

    if (!campaignId) {
      alert("Campaign ID is required")
      return
    }

    // Create budget item and add to Redux store
    const budgetItem: BudgetItem = {
      id: `budget-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      unitPrice: parseFloat(formData.unitPrice),
      currency: formData.currency,
      campaignId: campaignId,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    }

    dispatch(addBudgetItemToCampaign({
      campaignId: campaignId,
      budgetItem: budgetItem
    }))

    // Log activity
    const activity: Activity = {
      id: `activity-${Date.now()}`,
      campaignId: campaignId,
      userId: "user-current",
      userName: "Rituparn Gehlot",
      action: "added",
      entityType: "budget_item",
      entityName: formData.name,
      entityId: budgetItem.id,
      description: `added the budget item ${formData.name} to this campaign`,
      timestamp: new Date().toISOString()
    }

    dispatch(addActivity({
      campaignId: campaignId,
      activity: activity
    }))

    if (addAnother) {
      // Reset form but keep currency
      setFormData(prev => ({
        ...prev,
        name: "",
        description: "",
        unitPrice: ""
      }))
    } else {
      onClose()
    }
  }

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        description: "",
        unitPrice: "",
        currency: "US Dollar (USD) $"
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="hubspot-gradient-header flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white">Create budget item</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/10 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Section Header */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Budget item information</h3>
            </div>

            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="Enter budget item name"
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="mt-1 min-h-[80px] resize-none"
                placeholder="Enter description (optional)"
              />
            </div>

            {/* Price Section */}
            <div className="flex justify-between mb-2">
              <h4 className="text-base font-medium text-gray-900">Price</h4>
              
              {/* Currency Display */}
              <div className="">
                <Label className="text-xs font-light text-hubspot-primary">
                  <b>Currency:</b> {formData.currency}
                </Label>
              </div>
            </div>
            <div>
              {/* Unit Price Field */}
              <div>
                <Label htmlFor="unitPrice" className="text-sm font-medium text-gray-700">
                  Unit price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={onClose}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSave(false)}
                className="text-gray-700 border-gray-300"
              >
                Save
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => handleSave(true)}
              >
                Save and add another
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addCampaign } from "@/lib/store/slices/campaignsSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Calendar, Info, ExternalLink } from "lucide-react"

interface CampaignCreationFormSidebarProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

export function CampaignCreationFormSidebar({ isOpen, onClose, onBack }: CampaignCreationFormSidebarProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignColor: "",
    campaignOwner: "",
    startDate: "",
    endDate: "",
    campaignAudience: "",
    campaignNotes: ""
  })

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateCampaign = () => {
    if (!formData.campaignName) return
    
    // Generate a campaign ID from the name (simplified)
    const campaignId = formData.campaignName.toLowerCase().replace(/\s+/g, '_')
    
    // Create campaign object
    const newCampaign = {
      id: campaignId,
      name: formData.campaignName,
      utm: `112548847-${campaignId}`,
      owner: formData.campaignOwner || "Rituparn Gehol",
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Active",
      color: formData.campaignColor || "orange",
      audience: formData.campaignAudience || "General",
      budget: 0,
      spend: 0,
      notes: formData.campaignNotes || "",
      assets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Save to Redux store
    dispatch(addCampaign(newCampaign))
    
    // Navigate to the campaign details page
    router.push(`/marketing/campaigns/${campaignId}`)
    
    // Close the sidebar
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="hubspot-gradient-header flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white">Create Campaign</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/10 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Edit form link */}
            <div className="flex justify-end mb-6">
              <Button 
                variant="link" 
                className="hubspot-link p-0 h-auto text-sm"
              >
                Edit this form
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Campaign name */}
              <div className="space-y-2">
                <Label htmlFor="campaignName" className="text-sm font-medium text-gray-700">
                  Campaign name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="campaignName"
                  value={formData.campaignName}
                  onChange={(e) => handleInputChange("campaignName", e.target.value)}
                  className="w-full"
                  placeholder=""
                />
              </div>

              {/* Campaign color */}
              <div className="space-y-2">
                <Label htmlFor="campaignColor" className="text-sm font-medium text-gray-700">
                  Campaign color
                </Label>
                <Select onValueChange={(value) => handleInputChange("campaignColor", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign owner */}
              <div className="space-y-2">
                <Label htmlFor="campaignOwner" className="text-sm font-medium text-gray-700">
                  Campaign owner
                </Label>
                <Select onValueChange={(value) => handleInputChange("campaignOwner", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rituparn">Rituparn Gehol</SelectItem>
                    <SelectItem value="anil">Anil Kumar</SelectItem>
                    <SelectItem value="no-owner">No owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign start date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Campaign start date
                </Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="w-full pr-10"
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Campaign end date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  Campaign end date
                </Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="w-full pr-10"
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Campaign audience */}
              <div className="space-y-2">
                <Label htmlFor="campaignAudience" className="text-sm font-medium text-gray-700">
                  Campaign audience
                </Label>
                <Input
                  id="campaignAudience"
                  value={formData.campaignAudience}
                  onChange={(e) => handleInputChange("campaignAudience", e.target.value)}
                  className="w-full"
                  placeholder=""
                />
              </div>

              {/* Campaign notes */}
              <div className="space-y-2">
                <Label htmlFor="campaignNotes" className="text-sm font-medium text-gray-700">
                  Campaign notes
                </Label>
                <Textarea
                  id="campaignNotes"
                  value={formData.campaignNotes}
                  onChange={(e) => handleInputChange("campaignNotes", e.target.value)}
                  className="w-full min-h-[80px]"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 border-t border-gray-200">
            <div className="hubspot-alert rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="hubspot-alert-icon w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="hubspot-alert-text text-sm font-medium mb-1">
                    Did you know you can now create custom marketing properties?
                  </h4>
                  <p className="hubspot-alert-text text-sm leading-relaxed">
                    Organize your marketing assets, start by creating your first custom marketing property.{" "}
                    <Button 
                      variant="link" 
                      className="hubspot-link p-0 h-auto text-sm font-medium underline"
                    >
                      Go to properties
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between gap-3">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="text-gray-600 border-gray-300"
            >
              Back
            </Button>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={onClose}
                className="text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={!formData.campaignName}
                onClick={handleCreateCampaign}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
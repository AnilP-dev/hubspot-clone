"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { addAssetsToCampaign, addActivity, type Activity } from "@/lib/store/slices/campaignsSlice"
import { setEmails } from "@/lib/store/slices/emailsSlice"
import { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Search, ChevronDown, ChevronRight } from "lucide-react"

interface AddAssetsModalProps {
  isOpen: boolean
  onClose: () => void
  campaignName: string
  campaignId?: string
}

export function AddAssetsModal({ isOpen, onClose, campaignName, campaignId }: AddAssetsModalProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const emails = useSelector((state: RootState) => state.emails.emails)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState({
    marketing: true,
    socialPosts: false,
    content: false,
    crm: false,
    automation: false,
    sales: false,
    library: false
  })

  // Reset search term and refresh data when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("")
      // Force refresh of emails from localStorage to get latest data from other tabs
      const storedEmails = localStorage.getItem('emails')
      if (storedEmails) {
        try {
          const parsedEmails = JSON.parse(storedEmails)
          // Dispatch to update current Redux store with latest emails
          dispatch(setEmails(parsedEmails))
        } catch (error) {
          console.error('Error parsing emails from localStorage:', error)
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev]
    }))
  }

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const handleSaveAssets = () => {
    if (!campaignId || selectedAssets.length === 0) return

    // Convert selected asset IDs to asset objects
    const assetsToAdd = filteredEmails
      .filter(email => selectedAssets.includes(email.id))
      .map(email => ({
        id: email.id,
        name: email.name,
        type: email.type === 'marketing' ? 'Regular' : email.type,
        status: email.status.charAt(0).toUpperCase() + email.status.slice(1),
        updatedAt: email.lastUpdatedAt
      }))

    // Dispatch to Redux store
    dispatch(addAssetsToCampaign({
      campaignId,
      assets: assetsToAdd
    }))

    // Log activity for each added asset
    assetsToAdd.forEach(asset => {
      const activity: Activity = {
        id: `activity-${Date.now()}-${asset.id}`,
        campaignId: campaignId,
        userId: "user-current",
        userName: "Rituparn Gehlot",
        action: "added",
        entityType: "marketing_email",
        entityName: asset.name,
        entityId: asset.id,
        description: `added the marketing email ${asset.name} to this campaign`,
        timestamp: new Date().toISOString()
      }

      dispatch(addActivity({
        campaignId: campaignId,
        activity: activity
      }))
    })

    // Reset selected assets and close modal
    setSelectedAssets([])
    onClose()
  }

  const handleCreateEmail = () => {
    // Open email list page in new tab
    window.open('/marketing/email', '_blank')
  }

  const marketingAssets = [
    { id: "external-source", name: "From external source", badge: "NEW" },
    { id: "hubspot-account", name: "From this HubSpot account" },
    { id: "ad-campaigns", name: "Ad campaigns" },
    { id: "ctas", name: "CTAs" },
    { id: "ctas-legacy", name: "CTAs (Legacy)" },
    { id: "forms", name: "Forms" },
    { id: "marketing-emails", name: "Marketing Emails", selected: true },
    { id: "sms", name: "SMS", locked: true }
  ]

  const contentAssets = [
    { id: "content-item", name: "Content" }
  ]

  const crmAssets = [
    { id: "crm-item", name: "CRM" }
  ]

  const automationAssets = [
    { id: "automation-item", name: "Automation" }
  ]

  const salesAssets = [
    { id: "sales-item", name: "Sales" }
  ]

  const libraryAssets = [
    { id: "external-website", name: "External website pages" },
    { id: "marketing-events", name: "Marketing events" },
    { id: "tracking-urls", name: "Tracking URLs" }
  ]

  // Filter emails based on search term
  const filteredEmails = emails.filter(email => 
    email.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Debug logging
  console.log('AddAssetsModal - Total emails:', emails.length)
  console.log('AddAssetsModal - Emails data:', emails)
  console.log('AddAssetsModal - Filtered emails:', filteredEmails.length)
  console.log('AddAssetsModal - Search term:', searchTerm)

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-[80vw] h-[90vh] flex flex-col">
          {/* Header */}
          <div className="hubspot-gradient-header flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-white">
              Add assets to {campaignName}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-white/10 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar - Asset Categories */}
            <div className="w-80 border-r border-gray-200 overflow-y-auto">
              <div className="p-4">
                {/* Marketing Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("marketing")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.marketing ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Marketing
                  </button>
                  
                  {expandedCategories.marketing && (
                    <div className="ml-6 space-y-1">
                      {/* Social posts subsection */}
                      <button
                        onClick={() => toggleCategory("socialPosts")}
                        className="flex items-center gap-2 w-full text-left text-sm text-gray-700 py-1"
                      >
                        {expandedCategories.socialPosts ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                        Social posts
                      </button>
                      
                      {/* Marketing assets */}
                      {marketingAssets.map((asset) => (
                        <div
                          key={asset.id}
                          className={`flex items-center gap-2 py-1 px-2 text-sm rounded cursor-pointer ${
                            asset.id === "marketing-emails"
                              ? "bg-blue-50 text-hubspot-secondary font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex-1">{asset.name}</span>
                          {asset.badge && (
                            <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">
                              {asset.badge}
                            </span>
                          )}
                          {asset.locked && (
                            <span className="text-gray-400">🔒</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("content")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.content ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Content
                  </button>
                </div>

                {/* CRM Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("crm")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.crm ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    CRM
                  </button>
                </div>

                {/* Automation Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("automation")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.automation ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Automation
                  </button>
                </div>

                {/* Sales Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("sales")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.sales ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Sales
                  </button>
                </div>

                {/* Library Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory("library")}
                    className="flex items-center gap-2 w-full text-left font-medium text-gray-900 mb-2"
                  >
                    {expandedCategories.library ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Library
                  </button>
                  
                  {expandedCategories.library && (
                    <div className="ml-6 space-y-1">
                      {libraryAssets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex items-center gap-2 py-1 px-2 text-sm text-gray-700 rounded cursor-pointer hover:bg-gray-50"
                        >
                          <span className="flex-1">{asset.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Marketing Emails */}
            <div className="flex-1 flex flex-col">
              {/* Content Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Emails ({filteredEmails.length})</h3>
                  <Button 
                    onClick={handleCreateEmail}
                    className="text-white text-sm hover:opacity-90"
                    style={{ backgroundColor: 'rgb(66, 91, 118)' }}
                  >
                    Create email
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search emails"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-600">
                    <div className="col-span-1"></div>
                    <div className="col-span-4">NAME</div>
                    <div className="col-span-2">TYPE</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-3">UPDATED AT</div>
                  </div>

                  {/* Email Rows */}
                  {filteredEmails.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      {searchTerm ? 'No emails match your search' : 'No emails available'}
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <div key={email.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100">
                        <div className="col-span-1">
                          <input
                            type="checkbox"
                            checked={selectedAssets.includes(email.id)}
                            onChange={() => toggleAssetSelection(email.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <span className="text-gray-900 font-medium">{email.name}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">{email.type === 'marketing' ? 'Regular' : email.type}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              email.status === 'draft' ? 'bg-gray-400' :
                              email.status === 'sent' ? 'bg-green-400' :
                              email.status === 'scheduled' ? 'bg-yellow-400' :
                              'bg-gray-400'
                            }`}></div>
                            <span className="text-gray-600 capitalize">{email.status}</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <span className="text-gray-600">{email.lastUpdatedAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <button className="px-2 py-1 text-hubspot-secondary hover:bg-blue-50 rounded">First</button>
                    <button className="px-2 py-1 text-hubspot-secondary hover:bg-blue-50 rounded">Prev</button>
                    <span className="px-3 py-1 bg-hubspot-secondary text-white rounded">1</span>
                    <button className="px-2 py-1 text-hubspot-secondary hover:bg-blue-50 rounded">Next</button>
                    <button className="px-2 py-1 text-hubspot-secondary hover:bg-blue-50 rounded">Last</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Adding {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''}
              </div>
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
                  disabled={selectedAssets.length === 0}
                  onClick={handleSaveAssets}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
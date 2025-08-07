"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { AddAssetsModal } from "@/components/add-assets-modal"
import { 
  ChevronDown, 
  ChevronRight, 
  Plus,
  BarChart3,
  Target,
  FileText,
  CheckSquare,
  DollarSign,
  Activity,
  Settings
} from "lucide-react"

interface CampaignDetailsPageProps {
  campaignId: string
}

export function CampaignDetailsPage({ campaignId }: CampaignDetailsPageProps) {
  const router = useRouter()
  const campaign = useSelector((state: RootState) => 
    state.campaigns.campaigns.find(c => c.id === campaignId)
  )
  
  const [activeTab, setActiveTab] = useState("assets")
  const [activeSidebarTab, setActiveSidebarTab] = useState("details")
  const [isAddAssetsModalOpen, setIsAddAssetsModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    campaigns: true,
    blogPosts: false,
    calls: false,
    callsToAction: false,
    ctas: false,
    documents: false,
    files: false,
    forms: false,
    landingPages: false,
    marketingEmails: true,
    marketingEvents: false,
    media: false,
    meetings: false,
    playbooks: false,
    salesEmails: false,
    sequences: false,
    sitePages: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  const tabs = [
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "attribution", label: "Attribution", icon: Target },
    { id: "assets", label: "Assets", icon: FileText, active: true },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "activity", label: "Activity", icon: Activity }
  ]

  // If campaign doesn't exist, show error state
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Campaign not found</h2>
          <p className="text-gray-600">The campaign you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const assetSections = [
    { id: "campaigns", label: "Ad campaigns", expanded: true },
    { id: "blogPosts", label: "Blog posts" },
    { id: "calls", label: "Calls" },
    { id: "callsToAction", label: "Calls-to-Action" },
    { id: "ctas", label: "CTAs" },
    { id: "documents", label: "Documents" },
    { id: "files", label: "Files" },
    { id: "forms", label: "Forms" },
    { id: "landingPages", label: "Landing pages" },
    { id: "marketingEmails", label: "Marketing emails" },
    { id: "marketingEvents", label: "Marketing events" },
    { id: "media", label: "Media" },
    { id: "meetings", label: "Meetings" },
    { id: "playbooks", label: "Playbooks" },
    { id: "salesEmails", label: "Sales emails" },
    { id: "sequences", label: "Sequences" },
    { id: "sitePages", label: "Site pages" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-120 px-2 bg-white border-r border-gray-200 min-h-screen">
          {/* Campaign Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span 
                className="hubspot-link cursor-pointer hover:underline"
                onClick={() => router.push('/marketing/campaigns')}
              >
                Campaigns
              </span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">{campaign.name}</h1>
            <div className="text-sm text-gray-500 mt-1">{campaign.status}</div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm"
                onClick={() => setIsAddAssetsModalOpen(true)}
                className="h-8 gap-2 text-white bg-orange-500 hover:bg-orange-400 hover:text-white border border-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm"
              >
                Add assets
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent"
              >
                Clone
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveSidebarTab("details")}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                  activeSidebarTab === "details"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveSidebarTab("assets")}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                  activeSidebarTab === "assets"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Assets
              </button>
            </div>
          </div>

          {/* Details Section */}
          {activeSidebarTab === "details" && (
            <div className="p-4">
              <div className="space-y-6">
                {/* Campaign Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Campaign information</h3>
                  
                  {/* Campaign name */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign name</label>
                    <div className="text-sm text-gray-900">{campaign.name}</div>
                  </div>

                  {/* Campaign UTM */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign UTM</label>
                    <div className="text-sm text-gray-900">{campaign.utm}</div>
                  </div>

                  {/* Campaign owner */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign owner</label>
                    <div className="text-sm text-gray-900">{campaign.owner}</div>
                  </div>

                  {/* Campaign start date */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign start date</label>
                    <div className="text-sm text-blue-600">📅 {new Date(campaign.startDate).toLocaleDateString('en-US')}</div>
                  </div>

                  {/* Campaign end date */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign end date</label>
                    <div className="text-sm text-blue-600">📅 {new Date(campaign.endDate).toLocaleDateString('en-US')}</div>
                  </div>

                  {/* Campaign status */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign status</label>
                    <div className="text-sm text-gray-900">{campaign.status}</div>
                  </div>

                  {/* Campaign color */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign color</label>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${campaign.color === 'orange' ? 'bg-orange-500' : campaign.color === 'blue' ? 'bg-blue-500' : campaign.color === 'green' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    </div>
                  </div>

                  {/* Campaign audience */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign audience</label>
                    <div className="text-sm text-gray-900">{campaign.audience}</div>
                  </div>

                  {/* Campaign budget total */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign budget total</label>
                    <div className="text-sm text-gray-900">${campaign.budget.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      If you need to update your budget, go to <span className="hubspot-link">Budget</span>
                    </div>
                  </div>

                  {/* Campaign spend total */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign spend total</label>
                    <div className="text-sm text-gray-900">{campaign.spend}</div>
                  </div>

                  {/* Campaign notes */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign notes</label>
                    <div className="text-sm text-gray-900">
                      {campaign.notes || "No notes available"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assets Section */}
          {activeSidebarTab === "assets" && (
            <div className="p-2">
              <div className="space-y-1">
                {assetSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        {expandedSections[section.id as keyof typeof expandedSections] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span>{section.label}</span>
                      </div>
                    </button>
                    
                    {expandedSections[section.id as keyof typeof expandedSections] && (
                      <div className="ml-6 py-2">
                        {/* Filter assets for this section type */}
                        {(() => {
                          let sectionAssets = [];
                          switch (section.id) {
                            case 'campaigns':
                              sectionAssets = campaign.assets.filter(asset => asset.type === 'Ad Campaign');
                              break;
                            case 'marketingEmails':
                              sectionAssets = campaign.assets.filter(asset => asset.type === 'Regular');
                              break;
                            case 'forms':
                              sectionAssets = campaign.assets.filter(asset => asset.type === 'Form');
                              break;
                            case 'landingPages':
                              sectionAssets = campaign.assets.filter(asset => asset.type === 'Landing Page');
                              break;
                            default:
                              sectionAssets = campaign.assets.filter(asset => 
                                asset.type.toLowerCase().includes(section.label.toLowerCase().split(' ')[0])
                              );
                          }
                          
                          if (sectionAssets.length === 0) {
                            return (
                              <div className="text-sm text-gray-500">
                                There are no {section.label.toLowerCase()} associated with this campaign.
                              </div>
                            );
                          }
                          
                          return (
                            <div className="space-y-2">
                              {sectionAssets.map((asset) => (
                                <div key={asset.id} className="flex items-center gap-2 p-2 text-sm bg-gray-50 rounded">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">{asset.name}</div>
                                    <div className="text-xs text-gray-500">{asset.status} • {asset.updatedAt}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex items-center px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <div className="ml-auto">
                <Button variant="outline" size="sm" className="text-gray-600">
                  Actions
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Assets Content */}
          {activeTab === "assets" && (
            <div className="p-6">
              {campaign.assets.length === 0 ? (
                // Empty state - show illustration
                <div className="p-16">
                  <div className="max-w-5xl mx-auto px-8">
                    <div className="flex items-center justify-between gap-8">
                      {/* Left Side - Content */}
                      <div className="flex-1 max-w-lg">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 leading-tight">
                          Start adding assets to your campaign
                        </h2>
                        
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">
                          Add marketing assets to your campaign and manage them directly from this tab.
                        </p>
                        
                        <p className="text-gray-600 mb-8 text-base leading-relaxed">
                          You can track how well they're performing and the value they're adding to your campaign overall.
                        </p>

                        {/* Add Assets Button */}
                        <Button 
                          onClick={() => setIsAddAssetsModalOpen(true)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-6 py-2 text-sm font-medium rounded"
                        >
                          Add assets
                        </Button>
                      </div>

                      {/* Right Side - Illustration */}
                      <div className="flex-1 flex justify-center items-center">
                        <div className="w-80 h-64 flex items-center justify-center">
                          <img 
                            src="https://static.hsappstatic.net/ui-images/static-2.828/optimized/canvas/campaigns.svg" 
                            alt="Campaigns illustration"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Assets exist - show assets sections
                <div>
                  {/* Marketing Emails Section */}
                  {campaign.assets.filter(asset => asset.type === 'Regular').length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📧</span>
                          <h3 className="text-lg font-semibold text-gray-900">Marketing Emails</h3>
                        </div>
                        <Button 
                          variant="link" 
                          className="hubspot-link text-sm"
                        >
                          View all marketing emails →
                        </Button>
                      </div>
                      
                      {/* Assets Table */}
                      <div className="bg-white rounded-lg border border-gray-200">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                          <div className="col-span-1">PREVIEW</div>
                          <div className="col-span-4">TITLE</div>
                          <div className="col-span-2">STATUS</div>
                          <div className="col-span-2">COMMENTS</div>
                        </div>
                        
                        {/* Table Rows */}
                        {campaign.assets
                          .filter(asset => asset.type === 'Regular')
                          .map((asset) => (
                            <div key={asset.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                              {/* Preview */}
                              <div className="col-span-1">
                                <div className="w-16 h-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Email</span>
                                </div>
                              </div>
                              
                              {/* Title */}
                              <div className="col-span-4">
                                <div className="hubspot-link font-medium hover:underline cursor-pointer">
                                  {asset.name}
                                </div>
                              </div>
                              
                              {/* Status */}
                              <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  <span className="text-gray-600">{asset.status}</span>
                                </div>
                              </div>
                              
                              {/* Comments */}
                              <div className="col-span-2">
                                <span className="text-gray-600">0</span>
                              </div>
                              
                              {/* Actions - remaining columns */}
                              <div className="col-span-3">
                                {/* Additional content can go here */}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Other Asset Types */}
                  {campaign.assets.filter(asset => asset.type !== 'Regular').length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Assets</h3>
                      <div className="bg-white rounded-lg border border-gray-200">
                        {campaign.assets
                          .filter(asset => asset.type !== 'Regular')
                          .map((asset) => (
                            <div key={asset.id} className="p-4 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center gap-3">
                                <div className="font-medium">{asset.name}</div>
                                <div className="text-sm text-gray-500">({asset.type})</div>
                                <div className="text-sm text-gray-500">•</div>
                                <div className="text-sm text-gray-500">{asset.status}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Add Assets Modal */}
      <AddAssetsModal
        isOpen={isAddAssetsModalOpen}
        onClose={() => setIsAddAssetsModalOpen(false)}
        campaignName={campaign.name}
        campaignId={campaignId}
      />
    </div>
  )
}
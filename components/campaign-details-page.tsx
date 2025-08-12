"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddAssetsModal } from "@/components/add-assets-modal"
import { FilterableTabsTable } from "@/components/filterable-tabs-table"
import { TaskForm } from "@/components/task-form"
import { BudgetItemForm } from "@/components/budget-item-form"
import { SpendItemForm } from "@/components/spend-item-form"
import { CampaignActivityFeed } from "@/components/campaign-activity-feed"
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
  Settings,
  X
} from "lucide-react"

interface CampaignDetailsPageProps {
  campaignId: string
}

export function CampaignDetailsPage({ campaignId }: CampaignDetailsPageProps) {
  const router = useRouter()
  const campaign = useSelector((state: RootState) => 
    state.campaigns.campaigns.find(c => c.id === campaignId)
  )
  const tasks = useSelector((state: RootState) => 
    state.tasks.tasks.filter(t => t.associatedCampaign === campaignId)
  )
  
  const [activeTab, setActiveTab] = useState("assets")
  const [activeSidebarTab, setActiveSidebarTab] = useState("details")
  const [isAddAssetsModalOpen, setIsAddAssetsModalOpen] = useState(false)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null)
  const [isCreateBudgetItemOpen, setIsCreateBudgetItemOpen] = useState(false)
  const [isCreateSpendItemOpen, setIsCreateSpendItemOpen] = useState(false)
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

  const handleTaskTitleClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setSelectedTask(task)
      setIsEditTaskOpen(true)
    }
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
    <div className="min-h-screen bg-gray-50 z-[1001]">
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
                    <div className="text-sm text-hubspot-secondary">📅 {new Date(campaign.startDate).toLocaleDateString('en-US')}</div>
                  </div>

                  {/* Campaign end date */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Campaign end date</label>
                    <div className="text-sm text-hubspot-secondary">📅 {new Date(campaign.endDate).toLocaleDateString('en-US')}</div>
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
              {/* <div className="ml-auto">
                <Button variant="outline" size="sm" className="text-gray-600">
                  Actions
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div> */}
            </div>
          </div>

          {/* Performance Content */}
          {activeTab === "performance" && (
            <div className="p-6">
              {/* Date Range and ROI Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Date range:</span>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-hubspot-secondary hover:bg-blue-50 rounded">
                      Custom date range
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-sm">
                      <span>📅 08/12/2022</span>
                      <span>to</span>
                      <span>📅 08/11/2025</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-gray-600">
                    Export
                  </Button>
                </div>

                {/* ROI Section */}
                <div className="mb-6 bg-white px-8 py-4 shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">ROI</h2>
                    <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span className="px-2 py-1 font-medium rounded-sm text-hubspot-primary bg-gray-100">FROM 8/12/2022 TO 8/11/2025</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Revenue data updates every 2 days ℹ️
                  </p>

                  {/* ROI Metrics */}
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">ROI</span>
                        <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">0%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">CAMPAIGN SPEND TOTAL</span>
                        <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">$0.00</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">REVENUE</span>
                        <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                      </div>
                      <div className="text-3xl font-bold text-hubspot-secondary">$0.00</div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    Want more revenue and deals data?{' '}
                    <button className="text-hubspot-secondary hover:underline">
                      Upgrade to Marketing Hub Enterprise 🔗
                    </button>
                  </div>
                </div>
              </div>

              {/* Revenue Section */}
              <div className="mb-8 bg-white px-8 py-4 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Revenue</h3>
                  <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="font-medium">FROM 8/12/2022 TO 8/11/2025</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>
                  <span>Revenue data updates every 2 days ℹ️</span>
                </div>

                <div className="rounded-lg p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                      🔍
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No revenue data to show for this time</h4>
                    <p className="text-gray-600 mb-4">Please change your filters and try again, or consider upgrading.</p>
                    <p className="text-sm text-gray-600">
                      Want more revenue and deals data?{' '}
                      <button className="text-hubspot-secondary hover:underline">
                        Upgrade to Marketing Hub Enterprise 🔗
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Attribution Section */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Influenced Contacts */}
                <div className="py-4 px-8 bg-white shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Influenced contacts</h3>
                  <div className="text-xs text-gray-600 mb-4">
                    FROM 8/12/2022 TO 8/11/2025 &nbsp;&nbsp;
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>

                  </div>
                  
                  
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">INFLUENCED CONTACTS</span>
                        <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                      </div>
                      <div className="text-4xl font-bold text-hubspot-secondary">0</div>
                    </div>
                  </div>
                </div>

                {/* Website Traffic */}
                <div className="py-4 px-8 bg-white shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Website traffic</h3>
                  <div className="text-xs text-gray-600 mb-2">
                    FROM 8/12/2022 TO 8/11/2025 &nbsp;&nbsp;
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>

                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    Contact attribution: <button className="text-hubspot-secondary hover:underline">First touch</button> ⌄
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-700">SESSIONS</span>
                          <div className="w-3 h-3 text-gray-400 cursor-help">ℹ️</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">0</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-700">NEW CONTACTS (FIRST TOUCH)</span>
                          <div className="w-3 h-3 text-gray-400 cursor-help">ℹ️</div>
                        </div>
                        <div className="text-2xl font-bold text-hubspot-secondary">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Lifecycle Sections */}
              <div className="grid grid-cols-2 gap-6">
                {/* Contact Lifecycle Count */}
                <div className="py-4 px-8 bg-white shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact lifecycle count</h3>
                    <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    FROM 8/12/2022 TO 8/11/2025 &nbsp;&nbsp;
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>

                  </div>
                  
                  <div className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                        🔍
                      </div>
                      <p className="text-sm text-gray-600">No data to show for this time.</p>
                    </div>
                  </div>
                </div>

                {/* Contact Lifecycle Cost */}
                <div className="py-4 px-8 bg-white shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact lifecycle cost</h3>
                    <div className="w-4 h-4 text-gray-400 cursor-help">ℹ️</div>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    FROM 8/12/2022 TO 8/11/2025 &nbsp;&nbsp;
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>

                  </div>
                  
                  <div className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                        🔍
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        No lifecycle cost data to show because there's no campaign spend data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attribution Content */}
          {activeTab === "attribution" && (
            <div className="p-6">
              {/* Header with date range and filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-hubspot-secondary hover:bg-blue-50 rounded">
                      Contact create
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded border">
                      Deal create 🔒
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded border">
                      Revenue 🔒
                    </button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-gray-600">
                  Export
                </Button>
              </div>

              {/* Date range and attribution model */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span>📅</span>
                  <span className="text-hubspot-primary font-medium">MM/DD/YYYY</span>
                  <span className="text-hubspot-primary">to</span>
                  <span>📅</span>
                  <span className="text-hubspot-primary font-medium">MM/DD/YYYY</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-hubspot-primary">Attribution model:</span>
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                    <span className="text-hubspot-primary font-medium">Linear</span>
                    <span className="text-gray-400">×</span>
                  </div>
                </div>
              </div>

              {/* Learn more link */}
              <div className="mb-8">
                <button className="text-hubspot-secondary hover:underline text-sm font-medium">
                  Learn more about contact create attribution →
                </button>
              </div>

              {/* Attribution Asset Cards */}
              {(() => {
                const attributionAssets = [
                  {
                    id: "asset-type",
                    title: "Asset type by contacts created"
                  },
                  {
                    id: "asset-by-contacts", 
                    title: "Asset by contacts created"
                  },
                  {
                    id: "interaction-source",
                    title: "Interaction source by contacts created"
                  },
                  {
                    id: "interaction-type",
                    title: "Interaction type by contacts created"
                  }
                ];

                return attributionAssets.map((asset, index) => (
                  <div key={asset.id} className={"mb-8 px-8 py-4 shadow-md bg-white"}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-hubspot-primary">{asset.title}</h3>
                      <button className="text-hubspot-secondary hover:underline text-sm">
                        Actions ▼
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                      <span className="text-hubspot-primary font-medium p-1 bg-inactive-background">FROM 1/1/2000 TO 8/11/2025</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">FILTERS (1)</span>
                    </div>

                    <div className="p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                          <img 
                            src="https://static.hsappstatic.net/ui-images/static-2.835/optimized/canvas/empty-state-charts.svg" 
                            alt="No data available"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-hubspot-primary text-base mb-2">There is no data to show in this time frame. Try changing the date range.</p>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}

          {/* Tasks Content */}
          {activeTab === "tasks" && (
            <div className="p-8">
              <FilterableTabsTable
                tabs={[
                  {
                    id: "all",
                    name: `All (${tasks.length})`,
                    isDefault: true
                  },
                  {
                    id: "due-today", 
                    name: "Due today",
                    isDefault: false
                  },
                  {
                    id: "overdue",
                    name: "Overdue", 
                    isDefault: false
                  },
                  {
                    id: "all-completed",
                    name: "All completed",
                    isDefault: false
                  }
                ]}
                columns={[
                  {
                    key: "title",
                    label: "TITLE",
                    sortable: true,
                    render: (row) => (
                      <div>
                        <div 
                          className="font-semibold text-hubspot-secondary hover:underline cursor-pointer"
                          onClick={() => handleTaskTitleClick(row.id)}
                        >
                          {row.title}
                        </div>
                        <div className="text-xs text-gray-500">{row.notes}</div>
                      </div>
                    )
                  },
                  {
                    key: "type",
                    label: "TASK TYPE",
                    sortable: true
                  },
                  {
                    key: "status",
                    label: "STATUS",
                    sortable: true,
                    render: (row) => (
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          row.status === 'Not started' ? 'bg-gray-400' :
                          row.status === 'In progress' ? 'bg-blue-400' :
                          row.status === 'Completed' ? 'bg-green-400' :
                          row.status === 'Waiting on contact' ? 'bg-yellow-400' :
                          row.status === 'Deferred' ? 'bg-orange-400' :
                          'bg-gray-400'
                        }`}></div>
                        <span className="text-sm">{row.status}</span>
                      </div>
                    )
                  },
                  {
                    key: "priority",
                    label: "PRIORITY",
                    sortable: true,
                    render: (row) => (
                      <span className={`text-sm px-2 py-1 rounded-sm ${
                        row.priority === 'High' ? 'bg-red-100 text-red-800' :
                        row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        row.priority === 'Low' ? 'bg-blue-100 text-blue-800' :
                        'text-gray-500'
                      }`}>
                        {row.priority}
                      </span>
                    )
                  },
                  {
                    key: "campaign", 
                    label: "CAMPAIGN",
                    sortable: true,
                    render: (row) => campaign?.name || ""
                  },
                  {
                    key: "assignedTo",
                    label: "ASSIGNED TO", 
                    sortable: true
                  },
                  {
                    key: "dueDate",
                    label: "DUE DATE (GMT +5:30)",
                    sortable: true,
                    render: (row) => (
                      <div>
                        <div className="text-sm">{row.dueDate}</div>
                        <div className="text-xs text-gray-500">{row.dueTime}</div>
                      </div>
                    )
                  },
                  {
                    key: "createdDate",
                    label: "CREATED",
                    sortable: true,
                    render: (row) => (
                      <div className="text-sm text-gray-600">
                        {new Date(row.createdDate).toLocaleDateString()}
                      </div>
                    )
                  },
                  {
                    key: "modifiedDate",
                    label: "LAST MODIFIED",
                    sortable: true,
                    render: (row) => (
                      <div className="text-sm text-gray-600">
                        {new Date(row.modifiedDate).toLocaleDateString()}
                      </div>
                    )
                  }
                ]}
                data={tasks.map(task => ({
                  id: task.id,
                  title: task.title,
                  type: task.type,
                  status: task.status,
                  priority: task.priority,
                  campaign: campaign?.name || "",
                  assignedTo: task.assignedTo,
                  dueDate: task.dueDate,
                  dueTime: task.dueTime,
                  createdDate: task.createdDate,
                  modifiedDate: task.modifiedDate,
                  notes: task.notes
                }))}
                searchPlaceholder="Search tasks"
                maxViews={50}
                currentViews={4}
                menuItems={[
                  {
                    name: "Assigned to",
                    values: ["Anyone", "Me", "Unassigned"]
                  },
                  {
                    name: "Status",
                    values: ["All statuses", "Not started", "In progress", "Completed", "Waiting on contact", "Deferred"]
                  },
                  {
                    name: "Priority",
                    values: ["All priorities", "High", "Medium", "Low", "None"]
                  },
                  {
                    name: "Task type",
                    values: ["All types", "Call", "Email", "Meeting", "To-do"]
                  }
                ]}
                rightHeaderActions={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-gray-600 h-8 text-xs">
                      Edit columns
                    </Button>
                    <Button 
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="bg-hubspot-tertiary-color hover:bg-hubspot-tertiary-color/70 rounded-sm border border-hubspot-view-tab-border-colo text-hubspot-primary h-8 text-xs"
                    >
                      Create task
                    </Button>
                  </div>
                }
              />
              
              {/* Custom empty state for tasks */}
              {/* <div className="bg-white p-8 text-center border border-hubspot-view-tab-border-color border-t-0">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 opacity-50">
                    <img 
                      src="https://static.hsappstatic.net/ui-images/static-2.835/optimized/canvas/empty-state-charts.svg" 
                      alt="No tasks found"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-hubspot-primary mb-2">No tasks match those filters</h3>
                <p className="text-hubspot-primary mb-4">Can't find the task you're looking for? Try again using different filters.</p>
              </div> */}
            </div>
          )}

          {/* Budget Content */}
          {activeTab === "budget" && (
            <div className="p-6">
              {/* Information Banner */}
              <div className="bg-hubspot-secondary/15 border border-hubspot-secondary rounded p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-hubspot-primary mb-2">Get ad budget and ad spend data automatically synced</h4>
                    <p className="text-hubspot-primary text-sm">
                      When you associate ad campaigns with a campaign, ad budget and ad spend will automatically sync.{' '}
                      <button className="text-hubspot-secondary hover:underline font-medium">
                        Learn more 🔗
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Text */}
              <div className="mb-2">
                <p className="text-hubspot-primary text-sm leading-relaxed">
                  Manage your campaign budget and spend to help you make informed decisions and understand its effectiveness. Please note all amounts will be converted and displayed in your account's default currency. Or in a campaign's currency, if set.{' '}
                  <button className="text-hubspot-secondary hover:underline font-medium">
                    Learn more 🔗
                  </button>
                </p>
              </div>

              {/* Export Button */}
              <div className="flex justify-end mb-2">
                <Button className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light">
                  Export
                </Button>
              </div>

              {/* Campaign Budget Section */}
              <div className="mb-8 px-8 py-8 shadow-sm bg-white">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-hubspot-primary">Campaign budget</h2>
                  {campaign?.budgetItems && campaign.budgetItems.length > 0 && (
                    <Button 
                      className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light"
                      onClick={() => setIsCreateBudgetItemOpen(true)}
                    >
                      Create spend item
                    </Button>
                  )}
                </div>

                
                {/* Budget Items Table */}
                {campaign?.budgetItems && campaign.budgetItems.length > 0 ? (
                  <>
                  <div className="mb-4">
                      <span className="font-light text-xs ">
                          Ad budget data is automatically synced from ad campaigns associated with the campaign. The sync can take up to 24 hours. 
                      </span>
                    </div>
                  <div className="bg-white border border-gray-200 rounded">
                    {/* Table Header */}
                    
                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
                      <div className="col-span-1">
                        <span className="text-gray-400">⋮⋮</span>
                      </div>
                      <div className="col-span-7">NAME</div>
                      <div className="col-span-2">DESCRIPTION</div>
                      <div className="col-span-2">UNIT PRICE</div>
                    </div>

                    {/* Budget Items */}
                    {campaign.budgetItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <div className="col-span-1 flex items-center">
                          <span className="text-gray-400 cursor-move">⋮⋮</span>
                        </div>
                        <div className="col-span-7 flex items-center">
                          <span className="text-gray-900 font-light">{item.name}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="text-gray-600">{item.description || '—'}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="text-gray-900 font-light">
                            ${item.unitPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Budget Total Row */}
                    <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Budget total</span>
                        <span className="text-xl font-bold text-gray-900">
                          ${campaign.budgetItems.reduce((total, item) => total + item.unitPrice, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  </>
                ) : (
                  /* Empty State */
                    <div className="flex items-start gap-8">
                      {/* Left side - Icon */}
                      <div className="flex-1"></div>
                      <div className="flex-shrink-0">
                        <div className="w-64 h-24">
                          <img 
                            src="https://static.hsappstatic.net/ui-images/static-2.835/optimized/canvas/multiple-currency-revenue.svg"
                            alt="Campaign budget illustration"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="max-w-2xl">
                        <h3 className="text-xl font-semibold text-hubspot-primary mb-4">Add budget items to calculate the total budget of your campaign</h3>
                        <p className="text-hubspot-primary text-sm leading-relaxed mb-6">
                        Use budget items to calculate the total budget of your campaign. When you associate ad campaigns with your campaign, ad budget data is automatically synced from ad campaigns associated with the campaign. The sync can take up to 24 hours. 
                          <button className="text-hubspot-secondary hover:underline font-medium">
                            Learn more 🔗
                          </button>
                        </p>
                        
                        <Button 
                          className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light"
                          onClick={() => setIsCreateBudgetItemOpen(true)}
                        >
                          Create budget item
                        </Button>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                )}
              </div>

              {/* Campaign Spend Section */}
              <div className="px-8 py-8 shadow-sm bg-white">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-hubspot-primary">Campaign spend</h2>
                  {campaign?.spendItems && campaign.spendItems.length > 0 && (
                    <Button 
                      className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light"
                      onClick={() => setIsCreateSpendItemOpen(true)}
                    >
                      Create spend item
                    </Button>
                  )}
                </div>

                {campaign?.spendItems && campaign.spendItems.length > 0 ? (
                  <>
                    <div className="mb-4">
                      <span className="font-light text-xs">
                        Ad spend data is automatically synced from ad campaigns associated with the campaign. The sync can take up to 24 hours. 
                      </span>
                    </div>
                    
                    {/* Spend Items Table */}
                    <div className="bg-white border border-gray-200 rounded">
                      {/* Table Header */}
                      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
                        <div className="col-span-1">
                          <span className="text-gray-400">⋮⋮</span>
                        </div>
                        <div className="col-span-7">NAME</div>
                        <div className="col-span-2">DESCRIPTION</div>
                        <div className="col-span-2">UNIT PRICE</div>
                      </div>

                      {/* Spend Items */}
                      {campaign.spendItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                          <div className="col-span-1 flex items-center">
                            <span className="text-gray-400 cursor-move">⋮⋮</span>
                          </div>
                          <div className="col-span-7 flex items-center">
                            <span className="text-gray-900 font-light">{item.name}</span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <span className="text-gray-600">{item.description || '—'}</span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <span className="text-gray-900 font-light">
                              ${item.unitPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Spend Total Row */}
                      <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Spend total</span>
                          <span className="text-xl font-bold text-gray-900">
                            ${campaign.spendItems.reduce((total, item) => total + item.unitPrice, 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-8">
                    {/* Left side - Icon */}
                    <div className="flex-1"></div>
                    <div className="flex-shrink-0">
                      <div className="w-64 h-24">
                        <img 
                          src="https://static.hsappstatic.net/ui-images/static-2.835/optimized/canvas/multiple-currency-revenue.svg"
                          alt="Campaign spend illustration"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="max-w-2xl">
                      <h3 className="text-xl font-semibold text-hubspot-primary mb-4">Add spend items to your campaign</h3>
                      <p className="text-hubspot-primary text-sm leading-relaxed mb-6">
                        Use spend items to track all your costs at a glance and compare them against your campaign budget. When you associate ad campaigns with your campaign, ad spend data is automatically synced from ad campaigns associated with the campaign. The sync can take up to 24 hours.{' '}
                        <button className="text-hubspot-secondary hover:underline font-medium">
                          Learn more 🔗
                        </button>
                      </p>
                      
                      <Button 
                        className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light"
                        onClick={() => setIsCreateSpendItemOpen(true)}
                      >
                        Create spend item
                      </Button>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                )}
              </div>
            </div>
          )}

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
                      <div className=" border border-hubspot-view-tab-border-color rounded-sm">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-hubspot-tertiary-color text-sm font-medium text-hubspot-primary">
                          <div className="col-span-1">PREVIEW</div>
                          <div className="col-span-4">TITLE</div>
                          <div className="col-span-2">STATUS</div>
                          <div className="col-span-2">COMMENTS</div>
                        </div>
                        
                        {/* Table Rows */}
                        {campaign.assets
                          .filter(asset => asset.type === 'Regular')
                          .map((asset) => (
                            <div key={asset.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-white last:border-b-0 hover:bg-inactive-background">
                              {/* Preview */}
                              <div className="col-span-1">
                                <div className="w-16 h-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Email</span>
                                </div>
                              </div>
                              
                              {/* Title */}
                              <div className="col-span-4">
                                <div 
                                  className="hubspot-link font-medium hover:underline cursor-pointer"
                                  onClick={() => window.open(`/marketing/email/${asset.id}`, '_blank')}
                                >
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

          {/* Activity Content */}
          {activeTab === "activity" && (
            <CampaignActivityFeed
              activities={campaign?.activities || []}
              campaignId={campaignId}
            />
          )}
        </div>

        {/* Task Form - handles both create and edit modes */}
        <TaskForm
          isOpen={isCreateTaskOpen || isEditTaskOpen}
          onClose={() => {
            setIsCreateTaskOpen(false)
            setIsEditTaskOpen(false)
            setSelectedTask(null)
          }}
          campaignId={campaignId}
          campaignName={campaign?.name}
          task={selectedTask}
        />

        {/* Budget Item Form */}
        <BudgetItemForm
          isOpen={isCreateBudgetItemOpen}
          onClose={() => setIsCreateBudgetItemOpen(false)}
          campaignId={campaignId}
        />

        {/* Spend Item Form */}
        <SpendItemForm
          isOpen={isCreateSpendItemOpen}
          onClose={() => setIsCreateSpendItemOpen(false)}
          campaignId={campaignId}
        />
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
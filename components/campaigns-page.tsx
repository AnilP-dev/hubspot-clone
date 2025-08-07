"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ChevronDown, BarChart3 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FilterableTabsTable } from "@/components/filterable-tabs-table"
import { CampaignSelectionSidebar } from "@/components/campaign-selection-sidebar"
import { CampaignCreationFormSidebar } from "@/components/campaign-creation-form-sidebar"

interface TabData {
  id: string
  name: string
  isDefault?: boolean
  filters?: Record<string, any>
}

interface Column {
  key: string
  label: string
  sortable?: boolean
  info?: boolean
}

export function CampaignsPage() {
  const campaigns = useSelector((state: RootState) => state.campaigns.campaigns)
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isFormSidebarOpen, setIsFormSidebarOpen] = useState(false)
  
  // Tab configuration
  const [tabs, setTabs] = useState<TabData[]>([
    { id: 'all', name: 'All campaigns', isDefault: true },
    { id: 'starting', name: 'Starting this quarter' },
    { id: 'recent', name: 'Recently created' }
  ])

  // Column configuration
  const columns: Column[] = [
    { key: 'name', label: 'Campaign Name', sortable: true, info: true },
    { key: 'owner', label: 'Campaign Owner', sortable: true, info: true },
    { key: 'comments', label: 'Comments', sortable: true, info: true },
    { key: 'createdAt', label: 'Created On (GMT+5:30)', sortable: true, info: true }
  ]

  // Transform campaigns data for the table
  const tableData = campaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    owner: campaign.owner,
    comments: campaign.assets.length,
    createdAt: new Date(campaign.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }))

  const handleNextToForm = () => {
    setIsSidebarOpen(false)
    setIsFormSidebarOpen(true)
  }

  const handleBackToSelection = () => {
    setIsFormSidebarOpen(false)
    setIsSidebarOpen(true)
  }

  const handleCloseSidebars = () => {
    setIsSidebarOpen(false)
    setIsFormSidebarOpen(false)
  }

  const handleTabClose = (tabId: string) => {
    setTabs(tabs.filter(tab => tab.id !== tabId))
  }

  const handleTabAdd = () => {
    const newTabId = `tab-${Date.now()}`
    const newTab: TabData = {
      id: newTabId,
      name: `New View ${tabs.length}`,
      isDefault: false
    }
    setTabs([...tabs, newTab])
  }

  const handleTabReorder = (fromIndex: number, toIndex: number) => {
    const newTabs = [...tabs]
    const [movedTab] = newTabs.splice(fromIndex, 1)
    newTabs.splice(toIndex, 0, movedTab)
    setTabs(newTabs)
  }

  const handleCampaignClick = (campaignId: string) => {
    router.push(`/marketing/campaigns/${campaignId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
            <p className="text-sm text-gray-600 mt-1">
              {campaigns.length} record{campaigns.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analyze
            </Button>
            <Button onClick={() => setIsSidebarOpen(true)} className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8">
              Create campaign
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="manage" className="w-full mb-4">
          <TabsList className="h-12 bg-transparent border-b border-gray-200 rounded-none p-0 w-full justify-start">
            <TabsTrigger 
              value="manage" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-[rgb(51,71,91)] px-6 py-3 mr-8 font-medium"
              style={{ borderBottomWidth: '5px' }}
            >
              Manage
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-[rgb(51,71,91)] px-6 py-3 mr-8 font-medium"
              style={{ borderBottomWidth: '5px' }}
              disabled
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-[rgb(51,71,91)] px-6 py-3 mr-8 font-medium"
              style={{ borderBottomWidth: '5px' }}
              disabled
            >
              Tasks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-4">
            {/* Filterable Tabs Table */}
            <FilterableTabsTable
              tabs={tabs}
              columns={columns}
              data={tableData}
              onTabClose={handleTabClose}
              onTabAdd={handleTabAdd}
              onTabReorder={handleTabReorder}
              onCampaignClick={handleCampaignClick}
              searchPlaceholder="Search campaigns"
              maxViews={50}
              currentViews={tabs.length}
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Calendar view coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Tasks view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Campaign Selection Sidebar */}
      <CampaignSelectionSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebars}
        onNext={handleNextToForm}
      />

      {/* Campaign Creation Form Sidebar */}
      <CampaignCreationFormSidebar
        isOpen={isFormSidebarOpen}
        onClose={handleCloseSidebars}
        onBack={handleBackToSelection}
      />
    </div>
  )
}
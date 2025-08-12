"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "@/lib/store"
import { removeEmails } from "@/lib/store/slices/emailsSlice"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FilterableTabsTable } from "@/components/filterable-tabs-table"
import { SelectionSidebar, type SelectionOption } from "@/components/selection-sidebar"

interface TabData {
  id: string
  name: string
  isDefault?: boolean
  filters?: Record<string, any>
  icon? : React.ReactNode
}

interface Column {
  key: string
  label: string
  sortable?: boolean
  info?: boolean
  render?: (row: any) => React.ReactNode
}

function CircularIcon({color, shade} : {color: string, shade : number}) {
  return (
    <span className={`inline-block mr-2 h-2.5 w-2.5 rounded-full bg-${color}-${shade}`} >
      </span>

  )
}

export function EmailsPage() {
  const emails = useSelector((state: RootState) => state.emails.emails)
  const campaigns = useSelector((state: RootState) => state.campaigns.campaigns)
  const dispatch = useDispatch()
  const router = useRouter()
  
  // Tab configuration - matching the image
  const [tabs, setTabs] = useState<TabData[]>([
    { id: 'all-emails', name: 'All emails', isDefault: true},
    { id: 'drafts', name: 'Drafts', icon : <CircularIcon color={'gray'} shade={600}/>  },
    { id: 'scheduled', name: 'Scheduled', icon : <CircularIcon color={'yellow'} shade={500}/>  },
    { id: 'sent', name: 'Sent',icon : <CircularIcon color={'green'}  shade={500} />  },
    { id: 'archived', name: 'Archived',icon : <CircularIcon color={'gray'}  shade={300} />  }
  ])

  // Column configuration - matching the image table headers
  const columns: Column[] = [
    { key: 'name', label: 'EMAIL NAME', sortable: true, info: true },
    { key: 'delivered', label: 'DELIVERED', sortable: true, info: true },
    { key: 'openRate', label: 'OPEN RATE', sortable: true, info: true },
    { key: 'clickRate', label: 'CLICK RATE', sortable: true, info: true },
    { key: 'lastUpdatedAt', label: 'LAST UPDATED AT (GMT+5:30)', sortable: true, info: true },
    { key: 'lastUpdatedBy', label: 'LAST UPDATED BY', sortable: true, info: true }
  ]

  // Transform emails data for the table with filtering based on active tab
  const getFilteredEmails = () => {
    const currentTab = tabs.find(tab => tab.id === tabs[0]?.id) // For now, just return all emails
    // You can add more complex filtering logic here based on the active tab
    return emails
  }

  const tableData = getFilteredEmails().map(email => ({
    id: email.id,
    name: email.name,
    delivered: email.delivered,
    openRate: email.openRate,
    clickRate: email.clickRate,
    lastUpdatedAt: email.lastUpdatedAt,
    lastUpdatedBy: email.lastUpdatedBy
  }))

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

  const handleEmailClick = (emailId: string) => {
    router.push(`/marketing/email/${emailId}`)
  }

  const handleDeleteEmails = (selectedIds: string[]) => {
    if (selectedIds.length > 0) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${selectedIds.length} email${selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.`
      )
      if (confirmed) {
        dispatch(removeEmails(selectedIds))
      }
    }
  }

  const campaignNames = campaigns.length > 0
    ? Array.from(new Set(campaigns.map(c => c.name)))
    : []

  const [isCreateEmailOpen, setIsCreateEmailOpen] = useState(false)
  const emailOptions: SelectionOption[] = [
    {
      id: "regular",
      title: "Regular",
      description: "Send to a list of contacts. These emails can be sent immediately or scheduled.",
      icon: (
        <div className="w-20 h-20 rounded-lg flex items-center justify-center ">
          <img 
            src="https://static.hsappstatic.net/ui-images/static-2.832/optimized/canvas/successfully-connected-email.svg" 
            alt="regular"
            className="w-full h-full"
          />
        </div>
      ),
      badge: null
    },
    {
      id: "automated",
      title: "Automated",
      description: "Send through an automation. These emails can be added to workflows.",
      icon: (
        <div className="w-20 h-20 rounded-lg flex items-center justify-center ">
          <img 
            src="https://static.hsappstatic.net/ui-images/static-2.832/optimized/canvas/workflows.svg" 
            alt="Automated"
            className="w-full h-full"
          />
        </div>
      ),
      badge: null
    },
    {
      id: "blog/rss",
      title: "Blog/RSS",
      description: "Send automatic emails to share new blog posts or RSS updates.",
      icon: (
        <div className="w-20 h-20 rounded-lg flex items-center justify-center ">
          <img 
            src="https://static.hsappstatic.net/ui-images/static-2.832/optimized/canvas/forms.svg" 
            alt="Blog/RSS"
            className="w-full h-full"
          />
        </div>
      ),
      badge: null
    }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Marketing Email</h1>
            <p className="text-sm text-gray-600 mt-1">
              {emails.length} marketing email{emails.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 gap-2 text-orange-500 border border-orange-500 hover:text-orange-500 font-light text-xs tracking-normal leading-4 rounded-sm bg-transparent">
              Email tools
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-700 text-white rounded-sm h-8" onClick={() => setIsCreateEmailOpen(true)}>
              Create email
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
              value="analyze" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-[rgb(51,71,91)] px-6 py-3 mr-8 font-medium"
              style={{ borderBottomWidth: '5px' }}
              disabled
            >
              Analyze
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-[rgb(51,71,91)] px-6 py-3 mr-8 font-medium"
              style={{ borderBottomWidth: '5px' }}
              disabled
            >
              Health
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-4">
            {/* Email-specific FilterableTabsTable with custom filters */}
            <div className="rounded-lg">
              {/* Custom Email Filters Bar - to match the image exactly */}

              {/* FilterableTabsTable without the default filter section */}
              <FilterableTabsTable
                tabs={tabs}
                columns={columns}
                data={tableData}
                onTabClose={handleTabClose}
                onTabAdd={handleTabAdd}
                onTabReorder={handleTabReorder}
                onLinkClick={handleEmailClick}
                onDelete={handleDeleteEmails}
                linkColumnKeys={['name']}
                searchPlaceholder="Search email name or subject line"
                maxViews={50}
                currentViews={tabs.length}
                menuItems={[
                  {
                    name: "Campaigns",
                    values: ["All campaigns", ...campaignNames],
                    defaultValue: "All campaigns"
                  },
                  {
                    name: "Email type",
                    values: ["Automated", "Automated A/B", "Blog", "Follow-up","RSS","Regular","Regular A/B","Time zone"],
                    defaultValue: "All types"
                  }
                ]}
                rightHeaderActions={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-xs text-gray-600 border-gray-300 text-xs font-light rounded-sm">
                      {/* e.g., lucide-react Download icon */}
                      {/* <Download className="h-4 w-4 mr-1" /> */}
                        Export emails
                      <ChevronDown className="h-2 w-2 ml-0" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 rounded-xs text-gray-600 border-gray-300 text-xs font-light rounded-sm">
                      {/* e.g., lucide-react Download icon */}
                      {/* <Download className="h-4 w-4 mr-1" /> */}
                        Edit columns
                      <ChevronDown className="h-2 w-2 ml-0" />
                    </Button>
                  </div>
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="analyze" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Analyze view coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Health view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SelectionSidebar
        isOpen={isCreateEmailOpen}
        onClose={() => setIsCreateEmailOpen(false)}
        onNext={() => { setIsCreateEmailOpen(false); router.push('/marketing/email/templates'); }}
        title="Create email"
        options={emailOptions}
      />
    </div>
  )
}